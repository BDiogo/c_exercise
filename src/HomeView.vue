<template>
  <v-card>
    <v-layout color="container">
      <Navigation></Navigation>
      <v-main style="background-color: rgb(var(--v-theme-background))">
        <router-view class="app-router"></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import Navigation from './router/Navigation.vue'
</script>
<style scoped lang="scss">
.search-input {
  flex: 0 1 420px;
  margin-left: 3rem;
}
.v-layout {
  height: 100vh;
  overflow: hidden;
}
</style>
