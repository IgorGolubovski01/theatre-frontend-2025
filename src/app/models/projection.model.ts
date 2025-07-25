import { ActorModel } from "./actor.model";
import { GenreModel } from "./genre.model";

export interface ProjectionModel{
    projectionId: number;
    name: string;
    description: string;
    genre: GenreModel;
    duration: string;
    director: string;
    actors: ActorModel[];
    releaseDate: Date;
    projectionDate: Date;
    price: number;
    rating: number;
    projectionCapacity: number;
    soldTickets: number;
    longDescription: string;


}