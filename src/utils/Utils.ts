import type { Data, DropdownOption } from '@/shared/interface/Data'

export class Utils {
  static readonly shortDaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  static getDataOptions(): DropdownOption[] {
    return [
      {
        id: 'c',
        label: 'Total Events Count',
        smallLabel: 'Events',
        icon: 'mdi-counter',
        verify: 'c'
      },
      {
        id: 's',
        label: 'Total Sum of Money ',
        smallLabel: '$',
        icon: 'mdi-counter',
        verify: 's'
      },
      {
        id: 'dur',
        label: 'Total Duration of Events',
        smallLabel: 's',
        icon: 'mdi-cash',
        verify: 'dur'
      },
      {
        id: 'durPerEvent',
        label: 'Avg Duration per Event',
        smallLabel: 's per Event',
        icon: 'mdi-clock-outline',
        verify: 'dur'
      },
      {
        id: 'sPerEvent',
        label: 'Avg Sum of money per Event',
        smallLabel: '$ per Event',
        icon: 'mdi-cash',
        verify: 's'
      }
    ]
  }

  static formatNumberWithSpaceSeparator(number: any): string {
    let strNumber = number.toString()
    let parts = []
    while (strNumber.length > 3) {
      parts.unshift(strNumber.slice(-3))
      strNumber = strNumber.slice(0, -3)
    }
    parts.unshift(strNumber)

    return parts.join(' ')
  }

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
