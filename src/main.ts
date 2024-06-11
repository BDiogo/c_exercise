import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import VueApexCharts from 'vue3-apexcharts'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import axios from 'axios'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/lib/styles/main.sass'
import './styles.scss'
import type { Data } from './shared/interface/Data'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: '#292727',
          surface: '#312f2f',
          'on-surface-variant': '#312f2f',
          'on-surface': '#eef0f6',
          containerBackground: '#312f2f',
          text: '#eef0f6',
          textCards: '#eef0f6',
          textSecondary: 'rgba(171, 180, 190)',
          border: '#2b2929',
          shadow: 'rgba(112, 106, 106, 0.5)',
          dark: '#eef0f6',
          card: 'hsl(225, 25%, 98%)',
          primary: '#3eba5f',
          primaryHover: '#199a4c',
          cyan: '#0693e5',
          purple: '#5137ae',
          error: 'rgb(236, 97, 72)',
          errorHover: 'rgb(168, 68, 50)',
          warning: 'hsl(39, 82%, 34%)',
          success: '#3eba5f',
          gray: '#494949',
          grayBack: '#9da3a0',
          darkBlue: '#065fe5',
          scrollBarBackground: '#dce1e6',
          scrollBar: '#bbc1c7'
        }
      },
      light: {
        dark: false,
        colors: {
          background: '#eef0f6',
          surface: '#f9f9fb',
          'on-surface-variant': '#f9f9fb',
          'on-surface': '#3f3d3d',
          containerBackground: '#f9f9fb',
          textCards: '#eef0f6',
          text: '#3f3d3d',
          textSecondary: '#abb4be',
          border: '#e6e7ea',
          shadow: 'rgba(112, 106, 106, 0.2)',
          dark: '#292727',
          primary: 'rgb(103 197 128)',
          primaryHover: 'hsl(144 62% 45% / 1)',
          cyan: '#0693e5',
          purple: '#5137ae',
          error: 'rgb(212, 94, 73)',
          warning: 'hsl(39, 77%, 45%)',
          warningBack: '#ccc585',
          success: '#579e57',
          gray: '#494949',
          grayBack: '#9da3a0',
          darkBlue: '#065fe5',
          scrollBarBackground: '#dce1e6',
          scrollBar: '#98a2ac'
        }
      }
    }
  }
})
const store = createStore({
  state() {
    return {
      year: 2022,
      eventsData: ref<Data>({} as Data)
    }
  },
  mutations: {
    getEventsData(state, response) {
      state.eventsData.value = response
    }
  },
  actions: {
    async getEventsData({ commit }) {
      axios
        .get(
          'https://gist.githubusercontent.com/ar2rsawseen/3cb5565f6fff3ef70e7cf42eb39c8c83/raw/211d8f16c9921afab813f1b512f2241dce6384dd/2_task_data.json'
        )
        .then((resp) => {
          commit('getEventsData', resp.data)
        })
    }
  }
})

app.use(vuetify)
app.use(router)
app.use(store)
app.use(VueApexCharts)
app.mount('#app')
