import { ActorModel } from "./actor.model";

export interface ProjectionModel{
    projectionId: number;
    name: string;
    description: string;
    genre: string;
    duration: string;
    director: string;
    actors: ActorModel[];
    releaseDate: Date;
    projectionDate: Date;
    price: number;
    rating: number;
    projectionCapacity: number;
    soldTickets: number;
    imageUrl?: string;


}