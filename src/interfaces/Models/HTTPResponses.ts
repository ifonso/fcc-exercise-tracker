import { ExerciseData } from "./User";

export interface HTTPUserResponse {
  username: string;
  _id: string;
}

export interface HTTPExerciseResponse {
  username: string;
  description: string;
  duration: number;
  date: string;
  _id: string;
}

export interface HTTPLogResponse {
  username: string;
  count: number;
  _id: string;
  log: ExerciseData[]
}