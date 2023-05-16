import { UserData, UserLog, ExerciseData } from "../Models/User";

export default interface DatabaseManager {
  createUser(username: string): Promise<UserData>;
  getUsers(): Promise<UserData[]>;
  saveExerciseInUser(id: string, exercise: ExerciseData): Promise<UserData>;
  getUserLog(id: string, from?: Date, to?: Date, limit?: number): Promise<UserLog>;
}