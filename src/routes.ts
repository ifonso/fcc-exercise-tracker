import { Request, Response, Router } from "express";

import { Controller } from "./controller";
import { UserRepository } from "./database/repository/userRepository";

const routes = Router();
const userRepository = new UserRepository();
const controller = new Controller(userRepository);

// POST request create a new user and return it.
routes.post("/users", (request: Request, response: Response) => {
    return controller.createUser.apply(controller, [request, response]);
});

// GET request to return all users in database.
routes.get("/users", (request: Request, response: Response) => {
    return controller.getAllUsers.apply(controller, [request, response]);
});

// POST request should create a new exercise & return user object.
routes.post("/users/:_id/exercises", (request: Request, response: Response) => {
    return controller.createExercise.apply(controller, [request, response]);
});

// GET request should return a full exercise log of any user.
routes.get("/users/:_id/logs", (request: Request, response: Response) => {
    return controller.getUserLogs.apply(controller, [request, response]);
});

export default routes;
