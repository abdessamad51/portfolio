export interface Project {
    id: number;
    title: string;
    description: string;
    coverImage: string;
    images : {src : string,caption:string,thumb : string}[];
    technologies: string[];

}
