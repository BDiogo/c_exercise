<template>
  <v-chip v-if="value > valueToCompare" color="success" variant="tonal">
    <v-icon> mdi-arrow-up </v-icon>
    {{ compareDayWithYearData(1) }}%
  </v-chip>
  <v-chip v-else-if="value < valueToCompare" color="error" variant="tonal">
    <v-icon> mdi-arrow-down </v-icon>
    {{ compareDayWithYearData(1) }}%
  </v-chip>
  <v-chip v-else color="warning" variant="tonal">
    <v-icon> mdi-equal </v-icon>
    {{ compareDayWithYearData(0) }}%
  </v-chip>
</template>
<script setup lang="ts">
const props = defineProps<{
  value: number
  valueToCompare: number
}>()

function compareDayWithYearData(decimals: number): string {
  return (((props.value - props.valueToCompare) * 100) / props.valueToCompare).toFixed(decimals)
}
</script>
