import Vue from "vue";
import Vuex from "vuex";
import axiosClient from "./../core/axiosClient";

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
    userProfile: Object,
    leftDrawerOpen: false,
    confirmDeletingDialogOpen: false,
    isValidToken: null,
    totalInfected: 0,
    totalHealeds: 0,
    totalDeaths: 0,
    headerNewsLink: Object,
    headerNewsLinkInternational: Object,
    newsLinks: [],
    newsLinksInternational: [],

    // blockchain storing
    blockchain: [],

    infectsNumbers: []
  },
  mutations: {
    leftDrawerOpen(state, value) {
      state.leftDrawerOpen = value;
    },
    setTotalInfected(state, value) {
      state.totalInfected = value;
    },
    setTotalHealeds(state, value) {
      state.totalHealeds = value;
    },
    setTotalDeaths(state, value) {
      state.totalDeaths = value;
    },
    setHeaderNewsLink(state, value) {
      state.headerNewsLink = value;
    },
    setHeaderNewsLinkInternational(state, value) {
      state.headerNewsLinkInternational = value;
    },
    setNewsLinks(state, value) {
      state.newsLinks = value;
    },
    setNewsLinksInternational(state, value) {
      state.newsLinksInternational = value;
    },
    isLogged(state, value) {
      state.isLogged = value;
    },
    setUserProfile(state, value) {
      state.userProfile = value;
    },
    setConfirmDeletingDialogOpen(state, value) {
      state.confirmDeletingDialogOpen = value;
    },

    // blockchain storing
    setBlockchain(state, value) {
      state.blockchain = value;
    },

    setInfectsNumbers(state, value) {
      state.infectsNumbers = value;
    }
  },
  actions: {
    leftDrawerOpen({ commit }, value) {
      commit("leftDrawerOpen", value);
    },
    setTotalInfected({ commit }, value) {
      commit("setTotalInfected", value);
    },
    setTotalHealeds({ commit }, value) {
      commit("setTotalHealeds", value);
    },
    setTotalDeaths({ commit }, value) {
      commit("setTotalDeaths", value);
    },
    setHeaderNewsLink({ commit }, value) {
      commit("setHeaderNewsLink", value);
    },
    setHeaderNewsLinkInternational({ commit }, value) {
      commit("setHeaderNewsLinkInternational", value);
    },
    setNewsLinks({ commit }, value) {
      commit("setNewsLinks", value);
    },
    setNewsLinksInternational({ commit }, value) {
      commit("setNewsLinksInternational", value);
    },
    isLogged({ commit }, value) {
      commit("isLogged", value);
    },
    setUserProfile({ commit }, value) {
      commit("setUserProfile", value);
    },
    setConfirmDeletingDialogOpen({ commit }, value) {
      commit("setConfirmDeletingDialogOpen", value);
    },

    // blockchain storing
    setBlockchain({ commit }, value) {
      commit("setBlockchain", value);
    },

    getInfectsNumbers({ commit }) {
      axiosClient
        .get(Vue.prototype.$matnessEndpoint + "/v1/blockvid/infects-numbers")
        .then(response => {
          commit("setInfectsNumbers", response.data.data);
        });
    },

    setInfectsNumbers({ commit }, value) {
      commit("setInfectsNumbers", value);
    }
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
});
