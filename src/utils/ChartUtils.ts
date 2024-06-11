import type { CardMapped, Data } from '@/shared/interface/Data'
import { Utils } from './Utils'

export class ChartUtils {
  static maxNumDays = Array.from({ length: 31 }, (_, index) => index + 1)
  static getHeatmapOptions(theme: string) {
    return {
      theme: {
        mode: theme
      },
      stroke: {
        colors: [theme === 'dark' ? '#312f2f' : '#f9f9fb']
      },
      chart: {
        background: theme === 'dark' ? '#312f2f' : '#f9f9fb',
        foreColor: theme === 'dark' ? '#312f2f' : '#f9f9fb',
        type: 'heatmap',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        heatmap: { radius: 5 }
      },
      tooltip: {
        theme: theme
      },
      markers: {
        colors: '#3eba5f',
        strokeColors: '#3eba5f',
        strokeWidth: 0,
        hover: {
          size: 8
        }
      },
      xaxis: {
        type: 'category',
        categories: Array.from({ length: 31 }, (_, index) => index + 1),

        labels: {
          style: {
            colors: '#8c99a8'
          }
        }
      },
      colors: ['#3eba5f'],
      grid: {
        show: false
      },

      yaxis: {
        tooltip: {
          enabled: false
        },

        labels: {
          style: {
            colors: '#8c99a8'
          }
        }
      }
    }
  }

  static mapHeatmapData(data: Data, year: number): { name: string; data: number[] }[] {
    const newSeries = []
    if (data[year]?.c) {
      const yearData = data[year]
      for (let key in yearData) {
        if (yearData.hasOwnProperty(key) && yearData[key]?.c) {
          const dataa = this.maxNumDays.map((e) => yearData[key][e]?.c || 0)
          newSeries.unshift({
            name: Utils.getMonthName(parseInt(key)),
            data: dataa
          })
        }
      }
      if (newSeries.length) {
        return newSeries
      }
    }
    return []
  }
  static getCards(data: Data, year: number): CardMapped[] {
    const dates: CardMapped[] = []
    Object.keys(data[year]).forEach((month) => {
      const monthData = data[year][parseInt(month)]
      if (monthData?.c) {
        Object.keys(monthData)?.forEach((date) => {
          const dateData = data[year][parseInt(month)][parseInt(date)]
          if (dateData?.c) {
            dates.push({
              ...dateData,
              date: parseInt(date),
              year,
              month: parseInt(month),
              durPerEvent: Utils.roundNumber(dateData.dur / dateData.s, 2),
              cPerEvent: Utils.roundNumber(dateData.c / dateData.s, 2)
            })
          }
        })
      }
    })

    return dates.sort((a, b) => b.c - a.c).slice(0, 3)
  }
}
