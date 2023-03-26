import { Request, Response } from "express";

import databaseManager from "./services/DatabaseManager";
import Utils from "./utils";

class Controller {
  databaseManager;

  constructor(dataManager: typeof databaseManager) {
    this.databaseManager = dataManager;
  }

  async createUser(request: Request, response: Response) {
    const { username } = request.body;
    
    if (!username) 
    return response.status(400).send("No data provided.");

    try {
      const data = await databaseManager.createUser(username);
      return response.json(data);
    } catch (error) {
      console.log(error);
      return response.status(500).send("Could not create the user."); 
    }
  }

  async getAllUsers(_: Request, response: Response) {
    try {
      const data = await databaseManager.getAllUsers();
      return response.json(data);
    } catch (error) {
      console.log(error);
      return response.status(500).send("Could not retrieve users."); 
    }
  }

  async saveExercise(request: Request, response: Response) {
    const { description, duration, date } = request.body;
    const { _id } = request.params;

    let formatedDate: string | undefined;

    if (!description || !duration || !_id)
    return response.status(400).send("Data missing.");

    // TODO: Validate date and return formated in Utils
    if (date) {
      if (!Utils.isCorrectDate(new Date(date)))
      return response.status(400).send("Invalid date passed.");
      formatedDate = Utils.formatDateToString(new Date(date));
    }
    
    try {
      const data = await databaseManager.saveUserExercise(_id, description, duration, date);
      return response.json(data);
    } catch (error) {
      console.log(error);
      return response.status(500).send("Could not save user exercise."); 
    }
  }

  async getUserLogs(request: Request, response: Response) {
    const { _id } = request.params;
    const { from, to, limit } = request.query;
    
    let initial: Date | undefined = undefined;
    let final: Date | undefined = undefined;
    let count: number | undefined = undefined;

    if (!_id) return response.status(400).send("Data missing.");

    // Check if entries are valid
    if (from && to && limit) {
      initial = new Date(from as string);

      if (!Utils.isCorrectDate(initial))
      return response.status(400).send("Invalid date 'from' passed.");

      final = new Date(to as string);

      if (!Utils.isCorrectDate(final))
      return response.status(400).send("Invalid date 'to' passed.");

      count = Number(limit);

      if (!count)
      return response.status(400).send("Invalid limit passed.");
    }
    
    try {
      const data = await databaseManager.getUserLogs(_id, initial, final, count);
      return response.json(data);
    } catch (error) {
      console.log(error);
      return response.status(400).send("Could not get user logs."); 
    }
  }
}

export default new Controller(databaseManager);
