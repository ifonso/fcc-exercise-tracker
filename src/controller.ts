import { Request, Response } from "express";
import { ExerciseData } from "./interfaces/Models/User";

import DatabaseManager from "./interfaces/Managers/DataManager";

import Database from "./services/Database";
import Utils from "./utils/Utils";

class Controller {

  private database: DatabaseManager;

  constructor(database: DatabaseManager) {
    this.database = database;
  }

  async createUser(request: Request, response: Response) {
    const { username } = request.body;
    
    if (typeof username === "undefined") 
    return response.status(400).send("No username.");

    const data = await this.database.createUser.apply(this.database, [username]);
    
    return response.json({
      username: data.username,
      _id: data._id
    })
  }

  async getAllUsers(_: Request, response: Response) {
    const data = await this.database.getUsers.apply(this.database, []);    

    return response.json(data.map( user => {
      return {
        username: user.username,
        _id: user._id
      }
    }));
  }

  async saveExercise(request: Request, response: Response) {
    const { description, duration, date } = request.body;
    const { _id } = request.params;

    if (typeof description === "undefined" || typeof duration === "undefined" || typeof _id === "undefined")
    return response.status(400).send("Data missing.");

    if (typeof date !== "undefined" && !Utils.isValidDate(date))
    return response.status(400).send("Invalid date passed.");
    
    const exercise: ExerciseData = {
      description: description,
      duration: duration,
      date: typeof date === "undefined"
      ? Utils.getCurrentDateString()
      : Utils.formatDateToString(date)
    };

    const data = await this.database.saveExerciseInUser.apply(this.database, [_id, exercise]);

    return response.json({
      username: data.username,
      description: data.exercises.at(-1)?.description,
      duration: data.exercises.at(-1)?.duration,
      date: data.exercises.at(-1)?.date,
      _id: data._id
    });
  }

  async getUserLogs(request: Request, response: Response) {
    const { _id } = request.params;
    const { from, to, limit } = request.query;

    if (typeof _id === "undefined")
    return response.status(400).send("Data missing.");
    
    if (typeof from !== "undefined" && typeof to !== "undefined" && !Utils.isValidInterval(from, to))
    return response.status(400).send("Invalid data range.");

    if (typeof limit !== "undefined" && isNaN(Number(limit)))
    return response.status(400).send("Invalid limit.");
    
    const data = await this.database.getUserLog.apply(
      this.database,
      [
        _id, 
        Utils.getIntervalParams(from, to), 
        isNaN(Number(limit)) ? undefined : Number(limit)
      ]
    );

    return response.json(data);
  }
}

export default new Controller(Database);
