import RangeTime from "../interfaces/Models/RangeTime";

export default class DateValidator {
  
  static isValidDate(date: any): boolean {
    return new Date(date) instanceof Date && isFinite(+(new Date(date)));
  }

  static getCurrentDateString(): string {
    return (new Date()).toDateString();
  }

  static getFormatedDateString(date: Date): string {
    return (new Date(date)).toDateString();
  }

  static isValidInterval(from: any, to: any): boolean {
    if (!DateValidator.isValidDate(from) || !DateValidator.isValidDate(to) || new Date(from) < new Date(to))
    return false;

    return true;
  }

  static dateIsBetween(date: Date, minDate: Date, maxDate: Date): boolean {
    return date.getTime() >= minDate.getTime() && date.getTime() <= maxDate.getTime();
  }

  static getIntervalParams(from: any, to: any): RangeTime | undefined {
    if (!DateValidator.isValidDate(from) || !DateValidator.isValidDate(to)) return;

    return {
      from: new Date(from),
      to: new Date(to),
    }
  }
}