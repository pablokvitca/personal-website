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
          this.platforms = Project.mapTechnologies(data.platforms);
          this.technologies = Project.mapTechnologies(data.technologies);
    }

    private static mapTechnologies(technologies: any[]) {
      return _.map(technologies, (technology) => {
        return {
          technology: technology.fields.name,
          version: technology.fields.version,
          description: technology.fields.description,
          icon: Project.mapIcon(technology.fields.icon.fields)
        };
      });
    }

    private static mapIcon(fields): IconSpec {
      let icon = fields.icon;
      if (fields.source === 'fontawesome') {
        const words = _.split(fields.icon, ' ');
        icon = (words.length === 1) ? words[0] : words;
      }
      return {
        source: fields.source,
        icon,
        alt: fields.alt,
        customClasses: fields.customClasses
      };
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
