import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AppState = {
  __typename?: 'AppState';
  appStarted: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type ApplicationSettings = {
  photoDir: Scalars['String']['input'];
  selectedCameraDriver: Scalars['String']['input'];
};

export type Collage = {
  __typename?: 'Collage';
  done: Scalars['Boolean']['output'];
  photoCount: Scalars['Int']['output'];
  photos: Array<Maybe<Scalars['String']['output']>>;
  templateId: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export enum FilePickerMode {
  Directory = 'DIRECTORY',
  File = 'FILE'
}

export type Mutation = {
  __typename?: 'Mutation';
  addPhotoToCollage: Collage;
  initCollage: Collage;
  resetCollage: Collage;
  setPhotoDirectory: Scalars['String']['output'];
  setSelectedCameraDriver: Scalars['String']['output'];
  setShutterTimeout: Scalars['Int']['output'];
  setUsePrinter: Scalars['Boolean']['output'];
  startApplication: AppState;
  triggerCamera: Photo;
  triggerPrinter: Scalars['Boolean']['output'];
};


export type MutationAddPhotoToCollageArgs = {
  photo: Scalars['String']['input'];
};


export type MutationInitCollageArgs = {
  templateId: Scalars['String']['input'];
};


export type MutationStartApplicationArgs = {
  settings: ApplicationSettings;
};

export type Photo = {
  __typename?: 'Photo';
  uri: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  cameraDrivers?: Maybe<Array<Scalars['String']['output']>>;
  collage?: Maybe<Collage>;
  filePickerResult?: Maybe<Scalars['String']['output']>;
  photoDirectory: Scalars['String']['output'];
  selectedCameraDriver: Scalars['String']['output'];
  shutterTimeout: Scalars['Int']['output'];
  state: AppState;
  templates: Array<Template>;
  usePrinter: Scalars['Boolean']['output'];
};


export type QueryFilePickerResultArgs = {
  defaultPath?: InputMaybe<Scalars['String']['input']>;
  mode: FilePickerMode;
};


export type QueryTemplatesArgs = {
  directory: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  liveView: Photo;
  newPhoto: Photo;
  state: AppState;
};

export type Template = {
  __typename?: 'Template';
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type GetCameraDriversQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCameraDriversQuery = { __typename?: 'Query', cameraDrivers?: Array<string> | null };

export type GetSelectedCameraDriverQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSelectedCameraDriverQuery = { __typename?: 'Query', selectedCameraDriver: string };

export type GetPhotoDirectoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPhotoDirectoryQuery = { __typename?: 'Query', photoDirectory: string };

export type GetUsePrinterQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsePrinterQuery = { __typename?: 'Query', usePrinter: boolean };

export type GetShutterTimeoutQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShutterTimeoutQuery = { __typename?: 'Query', shutterTimeout: number };

export type GetFilePickerResultQueryVariables = Exact<{
  Mode: FilePickerMode;
  defaultPath?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFilePickerResultQuery = { __typename?: 'Query', filePickerResult?: string | null };

export type GetTemplatesFromDirectoryQueryVariables = Exact<{
  Directory: Scalars['String']['input'];
}>;


export type GetTemplatesFromDirectoryQuery = { __typename?: 'Query', templates: Array<{ __typename?: 'Template', title: string, name: string }> };

export type GetCollageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCollageQuery = { __typename?: 'Query', collage?: { __typename?: 'Collage', templateId: string, done: boolean, photos: Array<string | null>, url: string } | null };

export type GetStateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStateQuery = { __typename?: 'Query', state: { __typename?: 'AppState', message?: string | null, appStarted: boolean } };

export type ResetCollageMutationVariables = Exact<{ [key: string]: never; }>;


export type ResetCollageMutation = { __typename?: 'Mutation', resetCollage: { __typename?: 'Collage', templateId: string, photoCount: number, done: boolean, photos: Array<string | null>, url: string } };

export type AddPhotoToCollageMutationVariables = Exact<{
  Photo: Scalars['String']['input'];
}>;


export type AddPhotoToCollageMutation = { __typename?: 'Mutation', addPhotoToCollage: { __typename?: 'Collage', templateId: string, photoCount: number, done: boolean, photos: Array<string | null>, url: string } };

export type InitCollageMutationVariables = Exact<{
  TemplateId: Scalars['String']['input'];
}>;


export type InitCollageMutation = { __typename?: 'Mutation', initCollage: { __typename?: 'Collage', templateId: string, photoCount: number, done: boolean, photos: Array<string | null>, url: string } };

export type TriggerCameraMutationVariables = Exact<{ [key: string]: never; }>;


export type TriggerCameraMutation = { __typename?: 'Mutation', triggerCamera: { __typename?: 'Photo', uri: string } };

export type TriggerPrinterMutationVariables = Exact<{ [key: string]: never; }>;


export type TriggerPrinterMutation = { __typename?: 'Mutation', triggerPrinter: boolean };

export type StartApplicationMutationVariables = Exact<{
  Settings: ApplicationSettings;
}>;


export type StartApplicationMutation = { __typename?: 'Mutation', startApplication: { __typename?: 'AppState', appStarted: boolean, message?: string | null } };

export type StatusSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type StatusSubscription = { __typename?: 'Subscription', state: { __typename?: 'AppState', message?: string | null, appStarted: boolean } };

export type LiveViewSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type LiveViewSubscription = { __typename?: 'Subscription', liveView: { __typename?: 'Photo', uri: string } };

export type NewPhotoSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewPhotoSubscription = { __typename?: 'Subscription', newPhoto: { __typename?: 'Photo', uri: string } };

export const GetCameraDriversDocument = gql`
    query getCameraDrivers {
  cameraDrivers
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCameraDriversGQL extends Apollo.Query<GetCameraDriversQuery, GetCameraDriversQueryVariables> {
    override document = GetCameraDriversDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetSelectedCameraDriverDocument = gql`
    query GetSelectedCameraDriver {
  selectedCameraDriver
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSelectedCameraDriverGQL extends Apollo.Query<GetSelectedCameraDriverQuery, GetSelectedCameraDriverQueryVariables> {
    override document = GetSelectedCameraDriverDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetPhotoDirectoryDocument = gql`
    query GetPhotoDirectory {
  photoDirectory
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPhotoDirectoryGQL extends Apollo.Query<GetPhotoDirectoryQuery, GetPhotoDirectoryQueryVariables> {
    override document = GetPhotoDirectoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetUsePrinterDocument = gql`
    query GetUsePrinter {
  usePrinter
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUsePrinterGQL extends Apollo.Query<GetUsePrinterQuery, GetUsePrinterQueryVariables> {
    override document = GetUsePrinterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetShutterTimeoutDocument = gql`
    query GetShutterTimeout {
  shutterTimeout
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetShutterTimeoutGQL extends Apollo.Query<GetShutterTimeoutQuery, GetShutterTimeoutQueryVariables> {
    override document = GetShutterTimeoutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetFilePickerResultDocument = gql`
    query GetFilePickerResult($Mode: FilePickerMode!, $defaultPath: String) {
  filePickerResult(mode: $Mode, defaultPath: $defaultPath)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetFilePickerResultGQL extends Apollo.Query<GetFilePickerResultQuery, GetFilePickerResultQueryVariables> {
    override document = GetFilePickerResultDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetTemplatesFromDirectoryDocument = gql`
    query GetTemplatesFromDirectory($Directory: String!) {
  templates(directory: $Directory) {
    title
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTemplatesFromDirectoryGQL extends Apollo.Query<GetTemplatesFromDirectoryQuery, GetTemplatesFromDirectoryQueryVariables> {
    override document = GetTemplatesFromDirectoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCollageDocument = gql`
    query GetCollage {
  collage {
    templateId
    done
    photos
    url
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCollageGQL extends Apollo.Query<GetCollageQuery, GetCollageQueryVariables> {
    override document = GetCollageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetStateDocument = gql`
    query GetState {
  state {
    message
    appStarted
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStateGQL extends Apollo.Query<GetStateQuery, GetStateQueryVariables> {
    override document = GetStateDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ResetCollageDocument = gql`
    mutation ResetCollage {
  resetCollage {
    templateId
    photoCount
    done
    photos
    url
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ResetCollageGQL extends Apollo.Mutation<ResetCollageMutation, ResetCollageMutationVariables> {
    override document = ResetCollageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddPhotoToCollageDocument = gql`
    mutation AddPhotoToCollage($Photo: String!) {
  addPhotoToCollage(photo: $Photo) {
    templateId
    photoCount
    done
    photos
    url
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddPhotoToCollageGQL extends Apollo.Mutation<AddPhotoToCollageMutation, AddPhotoToCollageMutationVariables> {
    override document = AddPhotoToCollageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const InitCollageDocument = gql`
    mutation InitCollage($TemplateId: String!) {
  initCollage(templateId: $TemplateId) {
    templateId
    photoCount
    done
    photos
    url
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class InitCollageGQL extends Apollo.Mutation<InitCollageMutation, InitCollageMutationVariables> {
    override document = InitCollageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TriggerCameraDocument = gql`
    mutation TriggerCamera {
  triggerCamera {
    uri
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TriggerCameraGQL extends Apollo.Mutation<TriggerCameraMutation, TriggerCameraMutationVariables> {
    override document = TriggerCameraDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TriggerPrinterDocument = gql`
    mutation TriggerPrinter {
  triggerPrinter
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TriggerPrinterGQL extends Apollo.Mutation<TriggerPrinterMutation, TriggerPrinterMutationVariables> {
    override document = TriggerPrinterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const StartApplicationDocument = gql`
    mutation StartApplication($Settings: ApplicationSettings!) {
  startApplication(settings: $Settings) {
    appStarted
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StartApplicationGQL extends Apollo.Mutation<StartApplicationMutation, StartApplicationMutationVariables> {
    override document = StartApplicationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const StatusDocument = gql`
    subscription Status {
  state {
    message
    appStarted
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StatusGQL extends Apollo.Subscription<StatusSubscription, StatusSubscriptionVariables> {
    override document = StatusDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LiveViewDocument = gql`
    subscription LiveView {
  liveView {
    uri
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LiveViewGQL extends Apollo.Subscription<LiveViewSubscription, LiveViewSubscriptionVariables> {
    override document = LiveViewDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const NewPhotoDocument = gql`
    subscription NewPhoto {
  newPhoto {
    uri
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NewPhotoGQL extends Apollo.Subscription<NewPhotoSubscription, NewPhotoSubscriptionVariables> {
    override document = NewPhotoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }