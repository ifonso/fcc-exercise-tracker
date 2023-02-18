import { Router } from "express";
import controller from "./controller";

const routes = Router();

// Request logger middleware
routes.use(function(request, _, next) {
  console.log("\nBODY:")
  for (const key in request.body) { 
    console.log(`${key}: ${request.body[key]}`);
  }
  next()
})

// POST request create a new user and return it.
routes.post("/users", controller.createUser);

// GET request to return all users in database.
routes.get("/users", controller.getAllUsers);

// POST request should create a new exercise & return user object.
routes.post("/users/:_id/exercises", controller.saveExercise);

// GET request should return a full exercise log of any user.
routes.get("/users/:_id/logs", controller.getUserLogs);

export default routes;
