<template>
  <v-chip v-if="value > valueToCompare" color="success" variant="tonal">
    <v-icon> mdi-arrow-up </v-icon>
    {{ compareDayWithYearData() }}%
  </v-chip>
  <v-chip v-else-if="value < valueToCompare" color="error" variant="tonal">
    <v-icon> mdi-arrow-down </v-icon>
    {{ compareDayWithYearData() }}%
  </v-chip>
  <v-chip v-else color="warning" variant="tonal">
    <v-icon> mdi-equal </v-icon>
    {{ compareDayWithYearData() }}%
  </v-chip>
</template>
<script setup lang="ts">
const props = defineProps<{
  value: number
  valueToCompare: number
}>()

function compareDayWithYearData(): string {
  return (((props.value - props.valueToCompare) * 100) / props.valueToCompare).toFixed()
}
</script>
