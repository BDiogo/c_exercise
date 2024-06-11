<template>
  <v-container fluid class="container-view">
    <v-row
      ><v-col>
        <div class="text-h5">Days with most Events in {{ year }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(card, index) in cards" cols="12" sm="4">
        <v-card>
          <v-card-item :title="getDate(card)"> </v-card-item>

          <v-card-text class="py-0">
            <v-row align="center" no-gutters>
              <v-col cols="6">
                <span class="text-h2 text-bold">{{ card.c }} </span> Events
              </v-col>

              <v-col v-if="index === 0" class="text-right text-h2" cols="6"> 🥇 </v-col>
              <v-col v-if="index === 1" class="text-right text-h2" cols="6"> 🥈 </v-col>
              <v-col v-if="index === 2" class="text-right text-h2" cols="6"> 🥉 </v-col>
            </v-row>
          </v-card-text>

          <div v-if="yearData" class="d-flex py-3 justify-space-between">
            <v-list-item density="compact" prepend-icon="mdi-clock-outline">
              <v-list-item-subtitle
                >{{ card.durPerEvent.toFixed(2) }}s average duration
                <Chip :value="card.durPerEvent" :valueToCompare="yearData?.durPerEvent"></Chip>
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact" prepend-icon="mdi-cash">
              <v-list-item-subtitle
                >{{ card.cPerEvent.toFixed(2) }}$ average Sum.

                <Chip :value="card.cPerEvent" :valueToCompare="yearData?.cPerEvent"></Chip
              ></v-list-item-subtitle>
            </v-list-item>
          </div> </v-card
      ></v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <apexchart
            v-if="!!series.length"
            type="heatmap"
            :height="series.length * 80"
            :options="ChartUtils.getHeatmapOptions(theme.global.name.value)"
            :series="series"
          ></apexchart>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { ChartUtils } from './utils/ChartUtils'
import { Utils } from './utils/Utils'
import { type Data, type CardMapped, EventDetailsModel } from './shared/interface/Data'
import { useTheme } from 'vuetify'
import Chip from './shared/Chip.vue'

const theme = useTheme()
const store = useStore()
let series = ref<{ name: string; data: number[] }[]>([])
let cards = ref<CardMapped[]>([])
let yearData = ref<EventDetailsModel>()
const year = store.state?.year

function setData() {
  const data: Data = store.state?.eventsData.value
  if (data) {
    series.value = ChartUtils.mapHeatmapData(data, year)
    cards.value = ChartUtils.getCards(data, year)
    yearData.value = new EventDetailsModel(data[year])
  }
}

function getDate(card: CardMapped) {
  return `${Utils.getMonthName(card.month)} ${card.date}`
}
setData()
const unsubscribe = store.subscribe((mutation) => {
  if (mutation.type === 'getEventsData') {
    setData()
  }
})

onUnmounted(() => {
  unsubscribe()
})
</script>

<style scoped lang="scss">
.container-view {
  padding: 2rem 2rem;

  .text-h5 {
    font-weight: 500;
  }
}
</style>
