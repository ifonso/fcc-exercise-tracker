import mongoose from "mongoose";
import Utils from "../utils";

import { User } from "../database/Users/models";

import { IExercise } from "../database/Users/interfaces";
import { IExerciseResponse, ILogResponse, IUserResponse } from "../interfaces/IResponses";

class DatabaseManager {
  async createUser(username: string): Promise<IUserResponse> {
    try {
      const createdUser = await User.create({ username });      
      return {
        username: createdUser.username,
        _id: createdUser._id.toString()
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(): Promise<IUserResponse[]> {
    try {
      const usersFromDB = await User.find();
      return usersFromDB.map((user): IUserResponse => {
        return {
          _id: user._id.toString(),
          username: user.username
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async saveUserExercise(id: string, description: string, duration: number, date?: string): Promise<IExerciseResponse> {
    const now = new Date();

    // TODO: Put this validation on controllers
    if (!mongoose.isValidObjectId(id)) 
    throw new Error("Invalid user ID.");
    

    try {
      const user = await User.findById(id);
      const updatedUser = await user!.addExercise({
        description,
        duration,
        date: date ?? now.toDateString()
      });

      return {
        username: updatedUser.username,
        description: updatedUser.exercises[updatedUser.exercises.length-1].description,
        duration: updatedUser.exercises[updatedUser.exercises.length-1].duration,
        date: updatedUser.exercises[updatedUser.exercises.length-1].date,
        _id: updatedUser._id.toString()
      }

    } catch (error) {
      throw error;
    }
  }

  async getUserLogs(id: string, from?: Date, to?: Date, limit?: number): Promise<ILogResponse> {
    let count: number = 0;

    // TODO: Put this validation on controllers
    if (!mongoose.isValidObjectId(id)) 
    throw new Error("Invalid user ID.");
    
    try {
      const user = await User.findById(id)
      let log: IExercise[] = user!.exercises;

      if (from && to && limit) {
        log = log.filter(exercise => {
          if (count >= limit) return false;

          if (Utils.dateIsBetween(new Date(exercise.date), from, to)) {
            count++;
            return true;
          }
        })
      }

      return {
        username: user!.username,
        count: user!.exercises.length,
        _id: user!._id.toString(),
        log
      }      

    } catch (error) {
      throw error;
    }
  }
}

export default new DatabaseManager();