import { Utils } from '@/utils/Utils'

export interface EventDetails {
  c: number
  s: number
  dur: number
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
  year: number
  durPerEvent: number
  cPerEvent: number
}

export class EventDetailsModel {
  c: number
  s: number
  dur: number
  durPerEvent: number
  cPerEvent: number

  constructor(data: EventDetails) {
    this.c = data.c
    this.s = data.s
    this.dur = data.dur
    this.durPerEvent = Utils.roundNumber(data.dur / data.s, 2)
    this.cPerEvent = Utils.roundNumber(data.c / data.s, 2)
  }
}
