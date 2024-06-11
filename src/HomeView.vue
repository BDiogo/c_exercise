<template>
  <v-card>
    <v-layout color="container">
      <Navigation></Navigation>
      <v-main style="background-color: rgb(var(--v-theme-background))">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import Navigation from './router/Navigation.vue'
const store = useStore()
store.dispatch('getEventsData')
</script>

<style scoped lang="scss">
.search-input {
  flex: 0 1 420px;
  margin-left: 3rem;
}
.v-layout {
  height: 100vh;
  .v-main {
    height: 100%;
    overflow: auto;
  }
}
</style>
