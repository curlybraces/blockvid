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

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      leftDrawerOpen: false,
      totalInfected: 0,
      totalInfectedItaly: 0,
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
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
