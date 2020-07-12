import { Injectable } from '@angular/core';
import {ContentfulClientApi, createClient, EntryCollection} from 'contentful';
import {environment} from '../../environments/environment';

const CONFIG = {
  space: environment.CONTENTFUL_SPACE_ID,
  accessToken: environment.CONTENTFUL_ACCESS_TOKEN,
  contentEnvironment: environment.CONTENTFUL_CONTENT_ENV,
  contentTypeIds: {
    project: 'project',
    icon: 'icon',
    technologies: 'technologyReference'
  }
};

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private cdaClient: ContentfulClientApi;

  constructor() {
    this._createClient();
  }

  private _createClient() {
    this.cdaClient = createClient({
      space: CONFIG.space,
      accessToken: CONFIG.accessToken,
      environment: CONFIG.contentEnvironment
    });
  }

  getProjects(query?: object): Promise<any> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.project,
      include: 5
    }, query))
      .then((res: EntryCollection<any>) => {
        return res.items;
      });
  }
}
