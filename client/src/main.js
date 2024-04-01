import { createApp, markRaw } from "vue";
import App from "./App.vue";
import router from "./router";
import VueApexCharts from "vue3-apexcharts";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
import { createPinia } from "pinia";
// import "flowbite";
import "./assets/tailwind.css";
import "./assets/animate.css";
import "./assets/sass/css/windzo.css";
import vClickOutside from "click-outside-vue3";

const app = createApp(App);
const pinia = createPinia()

pinia.use(({ store }) => {
  store.$router = markRaw(router)
})
app.use(pinia)
app.use(router);
app.use(VueApexCharts);
app.use(PerfectScrollbar);
app.use(vClickOutside);
app.mount("#app");
