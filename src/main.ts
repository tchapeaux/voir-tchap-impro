import './assets/main.css'

import { createApp } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import { inject } from '@vercel/analytics'

import App from './App.vue'

dayjs.locale('fr')
inject() // Vercel analytics

const app = createApp(App)

app.mount('#app')
