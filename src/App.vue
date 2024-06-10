<template>
  <v-app>
    <v-main>
      <v-theme-provider :theme="theme.global.name.value || 'light'">
        <router-view />
      </v-theme-provider>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()
</script>
