export default class Utils {
  static getCurrentDateString(): string {
    const currentDate = new Date();
    return currentDate.toDateString();
  }

  static dateIsBetween(date: Date, minDate: Date, maxDate: Date): boolean {
    return date.getTime() >= minDate.getTime() && date.getTime() <= maxDate.getTime();
  }

  static isCorrectDate(date: Date): boolean {
    return date instanceof Date && isFinite(+date);
  }

  static formatDateToString(date: Date): string {
    return date.toDateString()
  }
}