import { Request, Response } from "express";
import { UserRepository } from "./database/repository/userRepository";

import { createUserSchema } from "./schemas/createUserSchema";
import { createExerciseSchema } from "./schemas/createExerciseSchema";
import { getUserLogsSchema } from "./schemas/getUserLogsSchema";

import { zParse } from "./utils/schemaValidator";
import { ZodError } from "zod";

class Controller {
    constructor(private database: UserRepository) {}

    async createUser(request: Request, response: Response) {
        try {
            // validate request
            const { body } = await zParse(createUserSchema, request);
            // create user
            const user = await this.database.createUser.apply(this.database, [
                body.username,
            ]);
            return response.status(200).json({
                _id: user._id,
                username: user.username,
            });
        } catch (error) {
            // Catching bad request errors
            if (error instanceof ZodError) {
                return response.status(400).send(error.message);
            }
            // Catching other application errors
            return response.status(500).json({
                error: error instanceof Error ? error.message : "unknown error",
            });
        }
    }

    async getAllUsers(_: Request, response: Response) {
        try {
            const users = await this.database.getUsers.apply(this.database, []);
            return response.status(200).json(
                users.map((u) => {
                    return {
                        _id: u._id,
                        username: u.username,
                    };
                }),
            );
        } catch (error) {
            return response.status(500).json({
                message:
                    error instanceof Error ? error.message : "unknown error",
            });
        }
    }

    async createExercise(request: Request, response: Response) {
        try {
            // validate request
            const { body, params } = await zParse(
                createExerciseSchema,
                request,
            );
            const user = await this.database.createExercise.apply(
                this.database,
                [
                    params._id,
                    {
                        description: body.description,
                        duration: Number(body.duration),
                        date:
                            typeof body.date === "undefined"
                                ? new Date().toDateString()
                                : body.date.toDateString(),
                    },
                ],
            );

            return response.status(200).json({
                username: user.username,
                description: user.exercises.at(-1)?.description,
                duration: user.exercises.at(-1)?.duration,
                date: user.exercises.at(-1)?.date,
                _id: user._id,
            });
        } catch (error) {
            // Catching bad request errors
            if (error instanceof ZodError) {
                return response.status(400).send(error.message);
            }
            // Catching other application errors
            return response.status(500).json({
                error: error instanceof Error ? error.message : "unknown error",
            });
        }
    }

    async getUserLogs(request: Request, response: Response) {
        try {
            // validate request
            const { query, params } = await zParse(getUserLogsSchema, request);
            const { from, to, limit } = query;
            const user = await this.database.findUser.apply(this.database, [
                params._id,
            ]);

            if (!user) throw new Error("user with this id does not exist");

            let exercises = user.exercises;

            if (typeof from !== "undefined" || typeof to !== "undefined") {
                exercises = exercises.filter((e) => {
                    let state = true;
                    if (typeof from !== "undefined") {
                        state = new Date(e.date) >= from;
                    }

                    if (typeof to !== "undefined") {
                        state = new Date(e.date) <= to;
                    }
                    return state;
                });
            }

            if (typeof limit !== "undefined") {
                exercises = exercises.slice(0, limit);
            }

            return response.status(200).json({
                _id: user._id,
                username: user.username,
                count: user.exercises.length,
                log: exercises,
            });
        } catch (error) {
            // Catching bad request errors
            if (error instanceof ZodError) {
                return response.status(400).send(error.message);
            }
            // Catching other application errors
            return response.status(500).json({
                error: error instanceof Error ? error.message : "unknown error",
            });
        }
    }
}

export { Controller };
