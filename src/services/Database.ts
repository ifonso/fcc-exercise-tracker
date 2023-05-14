import mongoose from "mongoose";

import DatabaseManager from "../interfaces/Managers/DataManager";
import RangeTime from "../interfaces/Models/RangeTime";
import { UserData, UserLog, ExerciseData } from "../interfaces/Models/User";

import Utils from "../utils/Utils";
import { MongooseUserModel } from "../database/Users/models";

class Database implements DatabaseManager {

  async createUser(username: string): Promise<UserData> {
    const user = await MongooseUserModel.create({ username });

    return {
      _id: user._id,
      username: user.username,
      exercises: user.exercises
    }
  }

  async getUsers(): Promise<UserData[]> {
    const users = await MongooseUserModel.find();

    return users.map( user => {
      return {
        _id: user._id,
        username: user.username,
        exercises: user.exercises
      }
    })
  }

  async saveExerciseInUser(id: string, exercise: ExerciseData): Promise<UserData> {
    if (!mongoose.isValidObjectId(id))
    throw new Error("Invalid user ID.");

    const user = await MongooseUserModel.findById(id);

    if (user === null)
    throw new Error("User not found.");

    const userWithNewExercise = await user.addExercise({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date
    });

    return {
      _id: userWithNewExercise._id,
      username: userWithNewExercise.username,
      exercises: userWithNewExercise.exercises
    };
  }

  async getUserLog(id: string, params?: RangeTime, limit?: number): Promise<UserLog> {
    if (!mongoose.isValidObjectId(id))
    throw new Error("Invalid user ID.");

    const user = await MongooseUserModel.findById(id);

    if (user === null)
    throw new Error("User not found.");

    return {
      _id: user._id,
      username: user.username,
      count: user.exercises.length,
      log: typeof params === "undefined" && typeof limit === "undefined"
      ? user.exercises
      : this.filterExercises(user.exercises as ExerciseData[], params, limit)
    }
  }

  // Utility functions
  private filterExercises(data: ExerciseData[], params?: RangeTime, limit?: number): ExerciseData[] {
    let counter = 0;

    return data.filter( exercise => {
      if (typeof limit !== "undefined" && counter >= limit)
      return false;

      if (typeof params !== "undefined" && !Utils.dateIsBetween(new Date(exercise.date), params.from, params.to))
      return false;

      counter++;
      return true;
    })
  }
}

export default new Database();