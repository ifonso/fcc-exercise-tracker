import mongoose from "mongoose";
import Utils from "../utils";

import { User } from "../database/Users/models";

import { IExercise } from "../database/Users/interfaces";
import { IExerciseResponse, ILogResponse, IUserResponse } from "../interfaces/IResponses";

class DatabaseManager {
  createUser(username: string): Promise<IUserResponse> {
    return new Promise((resolve, reject) => {
      User.create({username})
      .then( user => {
        resolve({
          username: user.username,
          _id: user._id.toString()
        });
      })
      .catch( error => reject(error))
    })
  }

  getAllUsers(): Promise<IUserResponse[]> {
    return new Promise((resolve, reject) => {
      User.find()
      .then( data => {
        let users = Array<IUserResponse>();

        for (let user of data) {
          users.push({
            _id: user._id.toString(),
            username: user.username
          })
        }

        resolve(users);
      })
      .catch( error => reject(error))
    })
  }

  saveUserExercise(id: string, description: string, duration: number, date?: string): Promise<IExerciseResponse> {
    let now = new Date();
    let exercise: IExercise = {
      description,
      duration,
      date: date ?? now.toDateString()
    }

    return new Promise((resolve, reject) => {
      if (!mongoose.isValidObjectId(id)) {
        return reject(new Error("Invalid user ID."));
      }

      User.findById(id)
      .then( user => {
        return user?.addExercise({
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date
        })
      })
      .then( user => {
        if (!user) return reject(new Error("User does not exist."));

        resolve({
          username: user.username,
          description: user.exercises[user.exercises.length-1].description,
          duration: user.exercises[user.exercises.length-1].duration,
          date: user.exercises[user.exercises.length-1].date,
          _id: user._id.toString()
        })
      })
      .catch( error => reject(error))
    })
  }

  getUserLogs(id: string, from?: Date, to?: Date, limit?: number): Promise<ILogResponse> {
    return new Promise((resolve, reject) => {
      // If is invalid ID, abbort
      if (!mongoose.isValidObjectId(id))
      return reject(new Error("Invalid user ID."));

      User.findById(id)
      .then( user => {
        if (!user)
        return reject(new Error("User does not exist."));

        let log: IExercise[];
        let count: number = 0;

        // Checks if exists a filter
        if (from && to && limit) {
          log = user.exercises.filter((exercise) => {
            if (count >= limit) return false;
              
            if (Utils.dateIsBetween(new Date(exercise.date), from, to)) {
              count++;
              return true;
            }
          })
        } else {
          log = user.exercises
        }

        resolve({
          username: user.username,
          count: user.exercises.length,
          _id: user._id.toString(),
          log
        })
      })
      .catch( error => reject(error))
    })
  }
}

export default new DatabaseManager();