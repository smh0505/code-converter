import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'

import './style.css'
import App from './App.vue'
import Home from './components/Home.vue'
import Convert from './components/Convert.vue'
import Detect from './components/Detect.vue'
import Hash from './components/Hash.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/convert', component: Convert },
    { path: '/detect', component: Detect },
    { path: '/hash', component: Hash }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
