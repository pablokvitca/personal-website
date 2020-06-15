import { IconSpec } from '../icon/icon.component';
import _ from "lodash";

export type ExternalLink = {
    url: string,
    title: string,
    available: boolean,
    icon?: any //TODO: type, display
};

export type ImageRef = {
    type?: string,
    ref: string,
    alt?: string
};

export type TechnologyRef = {
    technology: string,
    version: string,
    icon: IconSpec
};

export type ProjecType = {
    name: "Personal" | "Academic" | "Research" | "Group" | "Freelance" | "Professional",
    customClasses?: string
};

export type ProjectStatus = {
    name: "Active" | "Paused" | "Ended",
    customClasses?: string
};

export type ProjectReleaseStatus = {
    name: "Launched" | "Released" | "Published" | "Public" | "In Development" | "Coming Soon";
    customClasses?: string
}

export class Project {

    title: string;
    description: string;
    source: ExternalLink;
    deployment: ExternalLink;
    startDate: string;
    status: ProjectStatus;
    release: ProjectReleaseStatus;
    images: ImageRef[];
    types: ProjecType[];
    platforms: TechnologyRef[];
    technologies: TechnologyRef[];

    constructor(
        title: string,
        description: string,
        source: ExternalLink, //TODO: display
        deployment: ExternalLink, //TODO: display
        startDate: string, //TODO: display
        status: ProjectStatus, //TODO: display separate from types
        release: ProjectReleaseStatus, //TODO: display separate from types
        images: ImageRef[] = [], //TODO: display many???
        types: ProjecType[] = [],
        platforms: TechnologyRef[] = [],
        technologies: TechnologyRef[] = []) {
        this.title = title;
        this.description = description;
        this.source = source;
        this.deployment = deployment;
        this.startDate = startDate;
        this.status = status;
        this.release = release;
        this.images = images;
        this.types = types;
        this.platforms = platforms;
        this.technologies = technologies;
    }

    public tags(): any[] {
        return _.concat(this.types, [this.status, this.release])
    }
}