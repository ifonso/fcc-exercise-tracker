import { Schema, model } from "mongoose";

import { IUser } from "./models/User";
import { IExercise } from "./models/Exercise";

const ExerciseSchema = new Schema<IExercise>(
    {
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        date: {
            type: String,
            default: new Date().toDateString(),
        },
    },
    {
        _id: false,
    },
);

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        exercises: {
            type: [{ type: ExerciseSchema }],
            default: [],
        },
    },
    {
        collection: "exercises",
    },
);

export const User = model<IUser>("user", UserSchema);
