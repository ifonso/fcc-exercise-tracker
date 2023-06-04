import { Request, Response } from "express";
import { ExerciseData } from "./interfaces/Models/User";

import DatabaseManager from "./interfaces/Managers/DataManager";
import ValidationManager from "./interfaces/Managers/ValidationManager";

// Services
import DateValidator from "./utils/DateValidator";
import Database from "./services/Database";
import Validator from "./services/Validator";

// Validation Schemas
import {
  createUserValidationSchema,
  getUsersLogValidationSchema,
  saveExerciseValidationSchema
} from "./utils/RequestValidationSchemas";

// @TODO: 
// -> No duration provided always trigger.
// -> from, to & limit throw erros.

class Controller {

  private database: DatabaseManager;
  private validator: ValidationManager;

  constructor(database: DatabaseManager, validator: ValidationManager) {
    this.database = database;
    this.validator = validator;
  }

  async createUser(request: Request, response: Response) {
    const { username } = request.body;

    try {
      this.validator.validateRequest(createUserValidationSchema, request.body);
    } catch (error) {
      return this.handleRequestError(error as Error, response);
    }

    try {
      const data = await this.database.createUser.apply(this.database, [username]);
      
      return response.json({
        username: data.username,
        _id: data._id
      })
    } catch (error) {
      return this.handleServerError(error as Error, response);
    }
  }

  async getAllUsers(_: Request, response: Response) {
    try {
    const data = await this.database.getUsers.apply(this.database, []);    

    return response.json(data.map( user => {
      return {
        username: user.username,
        _id: user._id
      }
    }));
    } catch (error) {
      return this.handleServerError(error as Error, response);
    }
  }

  async saveExercise(request: Request, response: Response) {
    const { description, duration, date } = request.body;
    const { _id } = request.params;

    try {
      this.validator.validateRequest(saveExerciseValidationSchema, request.body);
    } catch (error) {
      return this.handleRequestError(error as Error, response);
    }
    
    const exercise: ExerciseData = {
      description: description,
      duration: duration,
      date: typeof date === "undefined"
      ? DateValidator.getCurrentDateString()
      : DateValidator.getFormatedDateString(date)
    };

    try {
      const data = await this.database.saveExerciseInUser.apply(this.database, [_id, exercise]);

      return response.json({
        username: data.username,
        description: data.exercises.at(-1)?.description,
        duration: data.exercises.at(-1)?.duration,
        date: data.exercises.at(-1)?.date,
        _id: data._id
      });
    } catch (error) {
      return this.handleServerError(error as Error, response);
    }
  }

  async getUserLogs(request: Request, response: Response) {
    const { _id } = request.params;
    const { from, to, limit } = request.query;

    try {
      this.validator.validateRequest(getUsersLogValidationSchema, { ...request.params, ...request.query });
    } catch (error) {
      return this.handleRequestError(error as Error, response);
    }

    try {
      const data = await this.database.getUserLog.apply(
        this.database,
        [
          _id, 
          DateValidator.isValidDate(from) ? new Date(from as string) : undefined,
          DateValidator.isValidDate(from) ? new Date(to as string) : undefined, 
          !isNaN(Number(limit)) ? Number(limit) : undefined
        ]
      );

      return response.json(data);
    } catch (error) {
      return this.handleServerError(error as Error, response);
    }
  }

  handleRequestError(error: Error, response: Response) {
    console.log(error.message);
    return response.status(400).send(error.message);
  }

  handleServerError(error: Error, response: Response) {
    console.log(error.message);
    return response.status(500).send(error.message);
  }
}

export default new Controller(Database, new Validator);
