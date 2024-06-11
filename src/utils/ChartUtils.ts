import type { CardMapped, Data, DropdownOption, MappedData } from '@/shared/interface/Data'
import { Utils } from './Utils'

export class ChartUtils {
  static getHeatmapOptions(theme: string, selectedFilter: DropdownOption) {
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
        heatmap: {
          radius: 5
        }
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
      },
      dataLabels: {
        enabled: true,
        formatter: (
          val: number,
          e: { dataPointIndex: number; seriesIndex: number; value: number }
        ) => {
          return Utils.formatNumberWithSpaceSeparator(val)
        }
      },

      tooltip: {
        theme: theme,
        custom: (val: { series: any; seriesIndex: number; dataPointIndex: number; w: any }) => {
          const dataPoint = val.w.config.series[val.seriesIndex].data[val.dataPointIndex]
          return `<div class="apexcharts-tooltip-text"><span class="hightlight">${
            dataPoint.date
          } ${Utils.getMonthName(
            dataPoint.x,
            true
          )}</span><br>${Utils.formatNumberWithSpaceSeparator(dataPoint.y)} ${
            selectedFilter.smallLabel
          } </div>`
        }
      }
    }
  }

  static mapHeatmapData(
    data: MappedData[],
    filterOptions: DropdownOption
  ): { name: string; data: any[] }[] {
    return data
      .sort((a, b) => b.month - a.month)
      .map((monthData) => {
        return {
          name: Utils.getMonthName(monthData.month),
          data: monthData.data.map((dateData) => ({
            y: dateData?.[filterOptions.id] || (dateData.week ? 0 : undefined),
            x: String(dateData.date),
            year: dateData.year,
            date: dateData.date
          }))
        }
      })
  }
  static getMappedData(data: Data, year: number, filterOptions: DropdownOption): MappedData[] {
    return Object.keys(data[year])
      .map((monthStr) => {
        const monthNum = parseInt(monthStr)
        const monthData = data[year][monthNum]

        if (monthData?.[filterOptions.verify]) {
          return {
            month: monthNum,
            data: Object.keys(monthData)
              .map((dateStr) => {
                const dateNum = parseInt(dateStr)
                const dateData = monthData[dateNum]

                if (dateData?.[filterOptions.verify]) {
                  return {
                    ...dateData,
                    date: dateNum,
                    year,
                    week: Utils.validateAndGetDayOfWeek(dateNum, monthNum, year),
                    month: monthNum,
                    durPerEvent: Utils.roundNumber(dateData.dur / dateData.c, 2),
                    sPerEvent: Utils.roundNumber(dateData.s / dateData.c, 2)
                  }
                }
              })
              .filter(Boolean)
          }
        }
      })
      .filter(Boolean) as MappedData[]
  }

  static getThreeCards(dates: MappedData[], variableToCompare: DropdownOption): CardMapped[] {
    return dates
      .flatMap((item) => item.data)
      .sort((a, b) => {
        const aValue = a?.[variableToCompare.id]
        const bValue = b?.[variableToCompare.id]

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return bValue - aValue
        }
        return 0
      })
      .slice(0, 3)
  }
}
