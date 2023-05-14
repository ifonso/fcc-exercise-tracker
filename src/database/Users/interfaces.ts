import { Document, HydratedDocument, Model } from "mongoose";

import Exercise from "./Types/Exercise";
import User from "./Types/User";

export interface UserMethods {
  addExercise(exercise: Exercise): Promise<HydratedDocument<User, UserMethods>>;
}

export interface UserModel extends Model<User, {}, UserMethods> {
  createUser(username: string): Promise<HydratedDocument<User, UserMethods>>;
};

// Mongoose document baseado em User
export interface UserDocument extends User, Document {}