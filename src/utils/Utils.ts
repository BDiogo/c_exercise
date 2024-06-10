export class Utils {
  static getMaxInputLength(): number {
    return 255
  }

  static isStringEmpty(value: string): boolean {
    return !value?.trim().length
  }

  static areStringsEqual(first: string, second: string): boolean {
    return first === second
  }

  static isEmailValid(value: string): boolean {
    return /.+@.+\..+/g.test(value)
  }

  static isUsernameValid(value: string) {
    return /([._-]|[a-zA-Z0-9]){3,18}([a-zA-Z0-9]|[._-])$/g.test(value)
  }
  static isStr(s: unknown) {
    return typeof s === 'string' || s instanceof String
  }
}
