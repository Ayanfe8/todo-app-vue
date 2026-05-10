import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// Global error handler (replaces ErrorBoundary class)
app.config.errorHandler = (err, info) => {
  console.error('Global Error:', err, info)
}

app
  .use(createPinia())
  .use(router)
  .use(VueQueryPlugin)
  .mount('#app')
