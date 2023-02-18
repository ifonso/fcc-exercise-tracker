import { Request, Response } from "express";
import databaseManager from "./services/DatabaseManager";

import Utils from "./utils";

class Controller {
  databaseManager;

  constructor() {
    this.databaseManager = databaseManager
  }

  createUser(request: Request, response: Response) {
    const { username } = request.body;
    
    if (!username) 
    return response.status(400).send("No data provided.");

    databaseManager.createUser(username)
    .then( data => {
      return response.json(data);
    })
    .catch( error => {
      console.log(error)
      return response.status(500).send("Could not create the user.");
    })
  }

  getAllUsers(_: Request, response: Response) {
    databaseManager.getAllUsers()
    .then( data => {
      return response.json(data)
    })
    .catch( error => {
      return response.status(500).send("Could not retrieve users.");
    })
  }

  saveExercise(request: Request, response: Response) {
    const { description, duration, date } = request.body;
    const { _id } = request.params;

    let formatedDate: string | undefined;

    if (!description && !duration && !_id)
    return response.status(400).send("Data missing.");

    if (date) {
      if (!Utils.isCorrectDate(new Date(date)))
      return response.status(400).send("Invalid date passed.");
      formatedDate = Utils.formatDateToString(new Date(date));
    }
    
    databaseManager.saveUserExercise(_id, description, duration, date)
    .then( data => {
      return response.json(data);
    })
    .catch( error => {
      return response.status(500).send("Could not save user exercise.");
    })
  }

  getUserLogs(request: Request, response: Response) {
    const { _id } = request.params;
    const { from, to, limit } = request.query;
    
    let initial: Date | undefined = undefined;
    let final: Date | undefined = undefined;
    let count: number | undefined = undefined;

    if (!_id)
    return response.status(400).send("Data missing.");

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
    
    databaseManager.getUserLogs(_id, initial, final, count)
    .then( data => {
      return response.json(data);
    })
    .catch( error => {
      return response.status(400).send("Could not get user logs.");
    })
  }
}

export default new Controller();
