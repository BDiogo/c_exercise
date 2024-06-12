<template>
  <v-container fluid class="container-view">
    <v-row
      ><v-col cols="12" sm="10">
        <div class="text-h5">Days with more {{ selectedFilter.label }} in {{ year }}</div>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-select
          v-if="!!selectedFilter"
          v-model="selectedFilter"
          :items="filterOptions"
          label="Data Type"
          item-title="label"
          item-value="id"
          style="max-width: 180px"
          variant="outlined"
          hide-details
          @update:model-value="filterSubTopic($event)"
          density="compact"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(card, index) in cards" cols="12" sm="4">
        <v-card>
          <v-card-item :title="getDate(card)"> </v-card-item>

          <v-card-text class="py-0">
            <v-row align="center" no-gutters>
              <v-col cols="8" sm="6">
                <span class="text-h2 text-bold nowrap"
                  >{{ Utils.formatNumberWithSpaceSeparator(card?.[selectedFilter.id]) }} <br
                /></span>
                {{ selectedFilter.label }}
              </v-col>

              <v-col v-if="index === 0" class="text-right text-h2" cols="4" sm="6"> 🥇 </v-col>
              <v-col v-if="index === 1" class="text-right text-h2" cols="4" sm="6"> 🥈 </v-col>
              <v-col v-if="index === 2" class="text-right text-h2" cols="4" sm="6"> 🥉 </v-col>
            </v-row>
          </v-card-text>

          <div v-if="yearData" class="d-flex py-3 justify-space-between">
            <v-list-item density="compact" prepend-icon="mdi-clock-outline">
              <v-list-item-subtitle
                >{{ card.durPerEvent }}s average duration
                <Chip :value="card.durPerEvent" :valueToCompare="yearData?.durPerEvent"></Chip>
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item density="compact" prepend-icon="mdi-cash">
              <v-list-item-subtitle
                >{{ card.sPerEvent }}$ average Sum.

                <Chip :value="card.sPerEvent" :valueToCompare="yearData?.sPerEvent"></Chip
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
            :height="series.length * 60"
            :options="options"
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
import {
  type Data,
  type CardMapped,
  type DropdownOption,
  EventDetailsModel
} from './shared/interface/Data'
import { useTheme } from 'vuetify'
import Chip from './shared/Chip.vue'

const theme = useTheme()
const store = useStore()
let series = ref<{ name: string; data: any[] }[]>([])
let cards = ref<CardMapped[]>([])
let yearData = ref<EventDetailsModel>()
let options = ref()
const year = store.state?.year
const filterOptions = ref<DropdownOption[]>(Utils.getDataOptions())
let selectedFilter = ref<DropdownOption>(filterOptions.value[0])

function setData() {
  const data: Data = store.state?.eventsData.value
  if (data) {
    const getMappedData = ChartUtils.getMappedData(data, year, selectedFilter.value)
    series.value = ChartUtils.mapHeatmapData(getMappedData, selectedFilter.value)
    cards.value = ChartUtils.getThreeCards(getMappedData, selectedFilter.value)
    options.value = ChartUtils.getHeatmapOptions(theme.global.name.value, selectedFilter.value)
    yearData.value = new EventDetailsModel(data[year])
  }
}

function filterSubTopic(event) {
  selectedFilter.value = filterOptions.value.find((e) => e.id === event) as DropdownOption
  setData()
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
  .nowrap {
    white-space: nowrap;
  }
}
</style>
