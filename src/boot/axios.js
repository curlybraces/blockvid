import Vue from "vue";
import axios from "axios";

Vue.prototype.$axios = axios;

// News Api
Vue.prototype.$newsApiEndpoint =
  "https://newsapi.org/v2/top-headlines?apiKey=9c95cd826b654b059f388b2ad899e69d&";

Vue.prototype.$infectsItaly =
  "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json";

// Matness Backend
Vue.prototype.$matnessEndpoint = "https://matness.it/api";
// Vue.prototype.$matnessEndpoint = "http://localhost:8000/api";
