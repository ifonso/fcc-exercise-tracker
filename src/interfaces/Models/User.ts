import mongoose from "mongoose";

export type UserData = {
  _id: mongoose.Types.ObjectId;
  username: string;
  exercises: ExerciseData[];
}

export type UserLog = {
  _id: mongoose.Types.ObjectId;
  username: string;
  count: number;
  log: ExerciseData[];
}

export type ExerciseData = {
  description: string;
  duration: number;
  date: string;
}