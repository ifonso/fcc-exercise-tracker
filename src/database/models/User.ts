import { IExercise } from "./Exercise";

export interface IUser {
    _id?: string;
    username: string;
    exercises: IExercise[];
}
