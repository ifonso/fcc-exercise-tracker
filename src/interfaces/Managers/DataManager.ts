import RangeTime from "../Models/RangeTime";

import { UserData, UserLog, ExerciseData } from "../Models/User";

export default interface DatabaseManager {
  createUser(username: string): Promise<UserData>;
  getUsers(): Promise<UserData[]>;
  saveExerciseInUser(id: string, exercise: ExerciseData): Promise<UserData>;
  getUserLog(id: string, params?: RangeTime, limit?: number): Promise<UserLog>;
}