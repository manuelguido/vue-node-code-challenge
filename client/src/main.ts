/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Router
import router from '@/router'

// Store
import store from '@/store';

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')










// import store from './store';

// // Vuetify setup
// import "vuetify/styles";
// import { createVuetify } from "vuetify";
// import * as components from "vuetify/components";
// import * as directives from "vuetify/directives";

// import { fa } from "vuetify/iconsets/fa";
// import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
// import "@mdi/font/css/materialdesignicons.css";
// import "@fortawesome/fontawesome-free/css/all.css";

// const vuetify = createVuetify({
//   theme: {
//     defaultTheme: "light",
//   },
//   icons: {
//     defaultSet: "mdi",
//     aliases,
//     sets: {
//       mdi,
//       fa,
//     },
//   },
//   components,
//   directives,
// });

// // Vue Application setup
// createApp(app).use(router).use(store).use(vuetify).mount("#app")
