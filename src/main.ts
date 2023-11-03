import './assets/main.css'

import { createApp } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import { inject } from '@vercel/analytics'

import App from './App.vue'
import router from './router'

dayjs.locale('fr')
inject() // Vercel analytics

const app = createApp(App)
app.use(router)

app.mount('#app')
