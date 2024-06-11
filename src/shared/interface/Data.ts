import { Utils } from '@/utils/Utils'

export interface DropdownOption {
  id: any
  verify: any
  label: string
  smallLabel: string
  icon: string
}
export interface EventDetails {
  c: any
  s: any
  dur: any
}

export interface DataDate extends EventDetails {
  [hour: number]: EventDetails
}

export interface DataMonth extends EventDetails {
  [date: number]: DataDate
}

export interface DataYear extends EventDetails {
  [month: number]: DataMonth
}

export interface Data extends EventDetails {
  [year: number]: DataYear
}
export interface CardMapped extends DataDate {
  date: number
  month: number
  week: string | boolean
  year: number
  durPerEvent: number
  sPerEvent: number
}

export interface MappedData {
  month: number
  data: CardMapped[]
}
export class EventDetailsModel {
  c: number
  s: number
  dur: number
  durPerEvent: number
  sPerEvent: number

  constructor(data: EventDetails) {
    this.c = data.c
    this.s = data.s
    this.dur = data.dur
    this.durPerEvent = Utils.roundNumber(data.dur / data.c, 2)
    this.sPerEvent = Utils.roundNumber(data.s / data.c, 2)
  }
}
