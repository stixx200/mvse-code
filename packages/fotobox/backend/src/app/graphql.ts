
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum FilePickerMode {
    FILE = "FILE",
    DIRECTORY = "DIRECTORY"
}

export class ApplicationSettings {
    selectedCameraDriver: string;
    photoDir: string;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract cameraDrivers(): Nullable<string[]> | Promise<Nullable<string[]>>;

    abstract selectedCameraDriver(): string | Promise<string>;

    abstract photoDirectory(): string | Promise<string>;

    abstract usePrinter(): boolean | Promise<boolean>;

    abstract shutterTimeout(): number | Promise<number>;

    abstract collage(): Nullable<Collage> | Promise<Nullable<Collage>>;

    abstract filePickerResult(mode: FilePickerMode, defaultPath?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;

    abstract templates(directory: string): Template[] | Promise<Template[]>;

    abstract state(): AppState | Promise<AppState>;
}

export class Template {
    __typename?: 'Template';
    title: string;
    name: string;
}

export class Collage {
    __typename?: 'Collage';
    templateId: string;
    photos: Nullable<string>[];
    photoCount: number;
    done: boolean;
    url: string;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract initCollage(templateId: string): Collage | Promise<Collage>;

    abstract resetCollage(): Collage | Promise<Collage>;

    abstract addPhotoToCollage(photo: string): Collage | Promise<Collage>;

    abstract startApplication(settings: ApplicationSettings): AppState | Promise<AppState>;

    abstract triggerCamera(): Photo | Promise<Photo>;

    abstract triggerPrinter(): boolean | Promise<boolean>;

    abstract setSelectedCameraDriver(): string | Promise<string>;

    abstract setPhotoDirectory(): string | Promise<string>;

    abstract setShutterTimeout(): number | Promise<number>;

    abstract setUsePrinter(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    __typename?: 'ISubscription';

    abstract newPhoto(): Photo | Promise<Photo>;

    abstract liveView(): Photo | Promise<Photo>;

    abstract state(): AppState | Promise<AppState>;
}

export class Photo {
    __typename?: 'Photo';
    uri: string;
}

export class AppState {
    __typename?: 'AppState';
    appStarted: boolean;
    message?: Nullable<string>;
}

type Nullable<T> = T | null;
