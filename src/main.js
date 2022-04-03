import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { Chart, registerables } from "chart.js";

const app = createApp(App)

app.use(router)

Chart.register(...registerables);

app.mount('#app')

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
