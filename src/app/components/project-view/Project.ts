import { IconSpec } from '../icon/icon.component';
import {Entry} from 'contentful';
import * as _ from 'lodash';

export class Project {

    title: string;
    description: string;
    sourceRef: string;
    deploymentRef: string;
    startDate: string;
    status: ProjectStatus;
    release: ProjectReleaseStatus;
    images: ImageRef[];
    types: ProjectType[];
    platforms: TechnologyRef[];
    technologies: TechnologyRef[];

    constructor(data: {
        title: string,
        description: string,
        sourceRef: string,
        deploymentRef: string,
        startDate: string, // TODO: display
        status: ProjectStatus, // TODO: display, separate from types
        release: ProjectReleaseStatus, // TODO: display, separate from types
        images: Entry<any>[], // TODO: display many???
        types: ProjectType[],
        platforms: Entry<any>[],
        technologies: Entry<any>[]}) {
          this.title = data.title;
          this.description = data.description;
          this.sourceRef = data.sourceRef;
          this.deploymentRef = data.deploymentRef;
          this.startDate = data.startDate;
          this.status = data.status;
          this.release = data.release;
          this.types = data.types;
          this.images = _.map(data.images, (image) => {
            return {
              type: image.fields.file.contentType,
              ref: 'https:' + image.fields.file.url,
              alt: image.fields.description
            };
          });
          this.platforms = _.map(data.platforms, (platform) => {
            return {
              technology: platform.fields.name,
              version: platform.fields.version,
              description: platform.fields.description,
              icon: {
                source: platform.fields.icon.fields.source,
                icon: platform.fields.icon.fields.icon,
                alt: platform.fields.icon.fields.alt,
                customClasses: platform.fields.icon.fields.customClasses
              }
            };
          });
          this.technologies = _.map(data.technologies, (technology) => {
            return {
              technology: technology.fields.name,
              version: technology.fields.version,
              description: technology.fields.description,
              icon: {
                source: technology.fields.icon.fields.source,
                icon: technology.fields.icon.fields.icon,
                alt: technology.fields.icon.fields.alt,
                customClasses: technology.fields.icon.fields.customClasses
              }
            };
          });
    }
}

export interface ImageRef {
  type?: string;
  ref: string;
  alt?: string;
  customClasses?: any;
}

export interface TechnologyRef {
  technology: string;
  version: string;
  description?: string;
  icon: IconSpec;
}

export interface ProjectType {
  name: 'Personal' | 'Academic' | 'Research' | 'Group' | 'Freelance' | 'Professional';
  customClasses?: any;
}

export interface ProjectStatus {
  name: 'Active' | 'Paused' | 'Ended';
  customClasses?: any;
}

export interface ProjectReleaseStatus {
  name: 'Launched' | 'Released' | 'Published' | 'Public' | 'In Development' | 'Coming Soon';
  customClasses?: any;
}
