import Exercise from "./Exercise";

export default interface User {
  username: string;
  exercises: Exercise[];
}