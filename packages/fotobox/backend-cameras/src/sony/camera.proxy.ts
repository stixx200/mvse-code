import * as _ from 'lodash';
import axios from 'axios';

interface IService {
  type: string;
  url: string;
}

let _id = 0;

function id(): number {
  return ++_id;
}

export class CameraProxy {
  constructor(private services: IService[]) {}

  async call<T>(
    endpoint: string,
    method: string,
    params: any[] = [],
    version = '1.1.0'
  ): Promise<T> {
    const service = this.getService(endpoint);
    const { data } = await axios.post<{ error: unknown; result: T }>(
      service.url,
      {
        method,
        params,
        id: id(),
        version,
      }
    );
    if (data.error) {
      throw new Error(
        `Error occured while requesting '${
          service.url
        } - method: ${method} - params: ${JSON.stringify(params)}': ${
          data.error
        }`
      );
    }
    return data.result;
  }

  private getService(type: string): IService {
    const service = _.find(this.services, { type });
    if (!service) {
      throw new Error(
        `service '${service}' not found. Available are: '${this.services.join(
          ', '
        )}'`
      );
    }
    return service;
  }
}
