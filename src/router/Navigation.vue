<template>
  <v-app-bar color="containerBackground">
    <router-link class="logo" to="/"
      ><img v-if="theme.global.name.value === 'dark'" src="../assets/logo-white.svg" />
      <img v-else src="../assets/logo.svg"
    /></router-link>
    <v-spacer></v-spacer>
    <v-col cols="auto">
      <v-btn
        :icon="theme.global.name.value === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
        @click="toggleTheme()"
        size="small"
      ></v-btn>
    </v-col>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
}
</script>

<style scoped lang="scss">
.logo {
  padding: 0 2em;
  align-items: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgb(var(--v-theme-text));
  img {
    height: 2rem;
    object-fit: contain;
    margin-right: 0.4em;
  }
}
</style>
