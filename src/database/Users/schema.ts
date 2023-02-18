import { Schema } from "mongoose";
import { IExercise, IUser, IUserMethods, UserModel } from "./interfaces";

import Utils from "../../utils";

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
      default: Utils.getCurrentDateString(),
    },
  },
  { 
    _id: false
  }
);

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
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

UserSchema.method("addExercise", function addExercise(exercise: IExercise) {
  this.exercises.push(exercise);
  return this.save();
});

export default UserSchema;