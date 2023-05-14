import { model } from "mongoose";
import { UserModel } from "./interfaces";

import UserSchema from "./schema";
import User from "./Types/User";

export const MongooseUserModel = model<User, UserModel>('Users', UserSchema);