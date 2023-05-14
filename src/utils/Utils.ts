import RangeTime from "../interfaces/Models/RangeTime";

export default class Utils {
  static getCurrentDateString(): string {
    const currentDate = new Date();
    return currentDate.toDateString();
  }

  static dateIsBetween(date: Date, minDate: Date, maxDate: Date): boolean {
    return date.getTime() >= minDate.getTime() && date.getTime() <= maxDate.getTime();
  }

  static isValidDate(date: any): boolean {
    const passedDate = new Date(date);
    return passedDate instanceof Date && isFinite(+passedDate);
  }

  static formatDateToString(date: Date): string {
    const passedDate = new Date(date);
    return passedDate.toDateString();
  }

  static getIntervalParams(from: any, to: any): RangeTime | undefined {
    if (!Utils.isValidDate(from) || !Utils.isValidDate(to))
    return;

    return {
      from: new Date(from),
      to: new Date(to),
    }
  }

  static isValidInterval(from: any, to: any): boolean {
    if (!Utils.isValidDate(from) || !Utils.isValidDate(to))
    return false;

    if (new Date(from) < new Date(to))
    return false;

    return true;
  }

  static numberOrUndefined(data: any): number | undefined {
    if (!isNaN(Number(data))) return Number(data);
  }
}