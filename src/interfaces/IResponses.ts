import { IExercise } from "../database/Users/interfaces";

export interface IUserResponse {
  username: string;
  _id: string;
}

export interface IExerciseResponse {
  username: string;
  description: string;
  duration: number;
  date: string;
  _id: string;
}

export interface ILogResponse {
  username: string;
  count: number;
  _id: string;
  log: IExercise[]
}