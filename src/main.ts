import './assets/main.css'

import { createApp } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

import App from './App.vue'
import router from './router'

dayjs.locale('fr')

const app = createApp(App)

app.use(router)

app.mount('#app')
