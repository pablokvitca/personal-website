import { Injectable } from '@angular/core';
import {ContentfulClientApi, createClient, Entry, EntryCollection,} from 'contentful';
import {Project} from '../components/project-view/Project';

const CONFIG = { // TODO: actual identifiers!!! + .env
  space: '6pjgrdux22jl',
  accessToken: 'sLlwHtvfJp4wEb6AdG_OAxw24QWS3OI4lBVa2kPXLkg',
  contentEnvironment: 'master',
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

  getProjects(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.project,
      include: 5
    }, query))
      .catch((err) => {
        // TODO: handle error
      })
      .then((res: EntryCollection<any>) => {
        return res.items;
      });
  }
}
