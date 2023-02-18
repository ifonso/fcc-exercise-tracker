import { model } from "mongoose";
import { IUser, UserModel } from "./interfaces";

import UserSchema from "./schema";

export const User = model<IUser, UserModel>('Users', UserSchema);