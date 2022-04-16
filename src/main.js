import { createApp } from 'vue'
import VueElementLoading from 'vue-element-loading';
import App from './App.vue'
import router from './router'
import SimpleTypeahead from 'vue3-simple-typeahead';
import {createPinia} from "pinia";
import mitt from 'mitt';
import Toaster from '@meforma/vue-toaster';

import { Chart, registerables } from "chart.js";

const app = createApp(App)

// Vue.component("VueElementLoading", VueElementLoading);

app.use(router)
app.use(SimpleTypeahead);
app.use(createPinia());
app.component("VueElementLoading", VueElementLoading);
app.use(Toaster);
app.provide('toast', app.config.globalProperties.$toast);

Chart.register(...registerables);

const emitter = mitt();
app.provide('emitter', emitter);
app.mount('#app')

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';
