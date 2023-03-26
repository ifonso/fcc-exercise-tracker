import { Document, HydratedDocument, Model } from "mongoose";

export interface IExercise {
  description: string;
  duration: number;
  date: string;
}

export interface IUser {
  username: string;
  exercises: IExercise[];
}

export interface IUserMethods {
  addExercise(exercise: IExercise): Promise<HydratedDocument<IUser, IUserMethods>>;
}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
  createUser(username: string): Promise<HydratedDocument<IUser, IUserMethods>>;
};

// Mongoose document baseado em IUser
export interface UserDocument extends IUser, Document {}