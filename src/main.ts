import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'

import Select from './components/SelectComponent.vue'

const app = createApp(App)

app.component('v-select', Select)

app.mount('#app')
