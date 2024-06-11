import type { Data } from '@/shared/interface/Data'

export class Utils {
  static getMonthName(monthStr: number): string {
    return new Date(new Date().setUTCMonth(monthStr - 1)).toLocaleString('default', {
      month: 'long'
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
}
