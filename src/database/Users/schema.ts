import { Schema } from "mongoose";
import { UserMethods, UserModel } from "./interfaces";

import Exercise from "./Types/Exercise";
import User from "./Types/User";

import Utils from "../../utils/DateValidator";

const ExerciseSchema = new Schema<Exercise>(
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
      default: Utils.getCurrentDateString(),
    },
  },
  { 
    _id: false
  }
);

const UserSchema = new Schema<User, UserModel, UserMethods>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    exercises: {
      type: [
        { type: ExerciseSchema }
      ],
      default: [],
    },
  },
  {
    collection: "Exercises",
  }
);

// Methods
UserSchema.static("createUser", function createUser(username: string) {
  return this.create({ username });
})

UserSchema.method("addExercise", function addExercise(exercise: Exercise) {
  this.exercises.push(exercise);
  return this.save();
});

export default UserSchema;