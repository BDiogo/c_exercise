import type { Data } from '@/shared/interface/Data'

export class Utils {
  static readonly shortDaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  static getMonthName(monthStr: number, short?: boolean): string {
    return new Date(new Date().setUTCMonth(monthStr - 1)).toLocaleString('default', {
      month: short ? 'short' : 'long'
    })
  }

  static mapHeatmapData(data: Data, year: number) {
    if (data && data[year]?.c) {
      const yearData = data[year]
      for (let key in yearData) {
        if (yearData.hasOwnProperty(key) && yearData[key]?.c) {
          const dataa = Object.keys((e: string) => yearData[key][parseInt(e)]?.c || 0)
        }
      }
    }
  }
  static roundNumber(number: number, decimalCases: number) {
    return parseFloat(number.toFixed(decimalCases))
  }

  static validateAndGetDayOfWeek(day: number, month: number, year: number): string | boolean {
    const date = new Date(year, month - 1, day)

    if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
      var dayOfWeek = this.shortDaysOfWeek[date.getDay()]
      return dayOfWeek
    } else {
      return false
    }
  }
}
