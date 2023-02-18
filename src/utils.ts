export default class Utils {
  static getCurrentDateString(): string {
    const currentDate = new Date();
    return currentDate.toDateString();
  }
}