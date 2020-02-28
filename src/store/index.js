import Vue from "vue";
import Vuex from "vuex";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  state: {
    isLogged: false,
    isValidToken: null,
    leftDrawerOpen: false,
    totalInfected: 0,
    totalInfectedItaly: 0,
    newsLinks: [],
    newsLinksInternational: []
  },
  mutations: {
    leftDrawerOpen(state, value) {
      state.leftDrawerOpen = value;
    },
    setTotalInfected(state, value) {
      state.totalInfected = value;
    },
    setTotalInfectedItaly(state, value) {
      state.totalInfectedItaly = value;
    },
    setNewsLinks(state, value) {
      state.newsLinks = value;
    },
    setNewsLinksInternational(state, value) {
      state.newsLinksInternational = value;
    },
    isLogged(state, value) {
      state.isLogged = value;
    }
  },
  actions: {
    leftDrawerOpen({ commit }, value) {
      commit("leftDrawerOpen", value);
    },
    setTotalInfected({ commit }, value) {
      commit("setTotalInfected", value);
    },
    setTotalInfectedItaly({ commit }, value) {
      commit("setTotalInfectedItaly", value);
    },
    setNewsLinks({ commit }, value) {
      commit("setNewsLinks", value);
    },
    setNewsLinksInternational({ commit }, value) {
      commit("setNewsLinksInternational", value);
    },
    isLogged({ commit }, value) {
      commit("isLogged", value);
    }
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
});
