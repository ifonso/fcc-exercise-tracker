import { Request, Response } from "express";
import { User } from "./database/Users/models";

class Controller {
  createUser(request: Request, response: Response) {
    const { username } = request.body;
    
    if (!username) 
      return response.status(400).send("No data provided.");

    User.createUser(username)
      .then(data => {
        return response.json({
          username: data.username,
          _id: data._id
        })
      })
      .catch( error => {
        return response.status(400).json({ error });
      })
  }

  getAllUsers(_: Request, response: Response) {
    User.find()
      .then( data => {
        let responseArray = Array<any>();

        for (let user of data) {
          responseArray.push({
            _id: user._id,
            username: user.username
          })
        }

        return response.json(responseArray)
      })
      .catch( error => {
        return response.status(400).json({ error });
      })
  }

  saveExercise(request: Request, response: Response) {
    const { description, duration, date } = request.body;
    const { _id } = request.params;

    if (!description && !duration && !_id)
      return response.status(400).send("Data missing.");
    
    User.findById(_id)
      .then( user => {
        if (!user)
          return response.status(404).send("User not found.");

        user?.addExercise({
          description,
          duration,
          date
        })
          .then( data => {
            return response.json({
              username: data.username,
              description: data.exercises[data.exercises.length-1].description,
              duration: data.exercises[data.exercises.length-1].duration,
              date: data.exercises[data.exercises.length-1].date,
              _id: data._id
            })
          })
      })
      .catch( error => {
        return response.status(400).json({ error });
      })
  }

  getUserLogs(request: Request, response: Response) {
    const { _id } = request.params;
    
    if (!_id)
      return response.status(400).send("Data missing.");
    
    User.findById(_id)
      .then( user => {
        if (!user)
          return response.status(404).send("User not found.");
        
        return response.json({
          username: user.username,
          count: user.exercises.length,
          _id: user._id,
          log: [...user.exercises]
        })        
      })
      .catch( error => {
        return response.status(400).json({ error });
      })
  }
}

export default new Controller();
