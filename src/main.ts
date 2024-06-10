import { createApp } from 'vue'
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
      // words: ref<wordsTypeClass[]>([]),
    }
  },
  mutations: {
    /*getTopics(state, response) {
      state.topics.value = response
    },
    */
  },
  actions: {
    async getWords({ commit }) {
      axios.get('/api/word').then((resp) => {
        commit('getWords', resp.data)
      })
    }
  }
})

app.use(vuetify)
app.use(router)
app.use(store)
app.use(VueApexCharts)
app.mount('#app')
