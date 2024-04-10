import * as http from 'http';
import { ClientRequest, IncomingMessage } from 'http';
import * as _ from 'lodash';
import { Observable, Observer, Subject } from 'rxjs';
import { LiveStreamParser } from './liveStream.parser';
import axios from 'axios';
import { parseString as xml2jsParseString } from 'xml2js';
import { promisify } from 'util';
import { flaschenpost } from 'flaschenpost';
import { CameraProxy } from './camera.proxy';

const logger = flaschenpost.getLogger();

const parseString = promisify(xml2jsParseString);

export class SonyCameraCommunication {
  public name: string;
  public manufacturer: string;

  private cameraProxy: CameraProxy;
  public pictureUrl$ = new Subject<string>();
  private liveviewRequest: ClientRequest;
  private statusObservation = false;

  constructor(private descriptionUrl: string) {}

  async init() {
    const response = await axios.get(this.descriptionUrl);
    const description = (await parseString(response.data)) as any;

    const device = description.root.device[0];
    const serviceList =
      device['av:X_ScalarWebAPI_DeviceInfo'][0][
        'av:X_ScalarWebAPI_ServiceList'
      ][0]['av:X_ScalarWebAPI_Service'];

    this.name = device.friendlyName[0];
    this.manufacturer = device.manufacturer;
    const services = _.map(serviceList, (data) => ({
      type: data['av:X_ScalarWebAPI_ServiceType'][0],
      url: `${data['av:X_ScalarWebAPI_ActionList_URL'][0]}/${data['av:X_ScalarWebAPI_ServiceType'][0]}`,
    }));
    this.cameraProxy = new CameraProxy(services);

    await this.initializeCamera();
  }

  async deinit() {
    this.statusObservation = false;
    try {
      this.stopLiveViewObserving();
      await this.cameraProxy.call('camera', 'stopRecMode');
    } catch (error) {
      logger.error(`Can't stopRecMode on camera: ${error}`);
    }
  }

  async takePicture() {
    const [results] = await this.cameraProxy.call<[string[]]>(
      'camera',
      'actTakePicture',
      [],
      '1.0'
    );
    this.pictureUrl$.next(results[0]);
  }

  observeLiveView(): Observable<Buffer> {
    logger.info('Observe liveview');
    return new Observable((observer: Observer<Buffer>) => {
      const liveStreamParser = new LiveStreamParser(observer);
      this.cameraProxy
        .call('camera', 'startLiveviewWithSize', ['L'])
        .then(([liveViewUrl]) => {
          const liveviewRequest = http.get(
            liveViewUrl,
            (res: IncomingMessage) => {
              res.on('data', (chunk: Buffer) => {
                liveStreamParser.onNewChunk(chunk);
              });
              res.on('end', () => {
                observer.complete();
              });
              res.on('error', (error) => {
                observer.error(error);
              });
            }
          );
        });
      return () => {};
    });
  }

  stopLiveViewObserving() {
    if (this.liveviewRequest) {
      this.liveviewRequest.destroy();
    }
  }

  private async initializeCamera() {
    // start rec mode
    await this.cameraProxy.call('camera', 'startRecMode');

    this.startCameraStatusObservation();

    // set shoot mode to still pictures (no movies)
    setTimeout(async () => {
      try {
        const shootmode = await this.cameraProxy.call(
          'camera',
          'getShootMode',
          [],
          '1.0'
        );
        if (shootmode[0] !== 'still') {
          await this.cameraProxy.call(
            'camera',
            'setShootMode',
            ['still'],
            '1.0'
          );
        }
      } catch (error) {
        logger.error("failed to set shootmode to 'still': " + error.stack);
      }
    }, 1000);
  }

  private async startCameraStatusObservation() {
    const initialResult = await this.cameraProxy.call<string[]>(
      'camera',
      'getEvent',
      [false],
      '1.3'
    );
    this.newStatusReceived(initialResult);

    this.statusObservation = true;
    do {
      try {
        const result = await this.cameraProxy.call<string[]>(
          'camera',
          'getEvent',
          [true],
          '1.3'
        );
        this.newStatusReceived(result);
        await new Promise((r) => setTimeout(r, 200));
      } catch (error) {
        if (error.message.match(/Timed out/)) {
          continue;
        }
        logger.error(
          `An error occured while getEvent request to camera: ${JSON.stringify(
            error
          )}`
        );
        this.statusObservation = false;
      }
    } while (this.statusObservation);
  }

  private newStatusReceived(input: any[]) {
    const newStatus = _.flatten(_.compact(input));
    logger.debug(`Received new status: ${JSON.stringify(newStatus)}`);

    _.forEach(newStatus, (status) => {
      this.parseStatus(status.type, status);
    });
  }

  private parseStatus(type: string, status: { takePictureUrl: string[] }) {
    switch (type) {
      case 'takePicture':
        const takePictureUrl = status.takePictureUrl[0];
        logger.info(`Got new picture url: ${takePictureUrl}`);
        this.pictureUrl$.next(takePictureUrl);
        break;
      default:
        break;
    }
  }
}
