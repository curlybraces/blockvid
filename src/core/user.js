import Vue from "vue";
import axiosClient from "./axiosClient";
import store from "./../store/index";

export const getUserToken = () => {
  let token = localStorage.getItem("token");
  return token;
};

export const userHasValidToken = () => {
  return new Promise((resolve, reject) => {
    axiosClient
      // .get("https://matness.it/api/v1/verifyToken")
      .get(Vue.prototype.$matnessEndpoint + "/v1/verifyToken")
      .then(response => {
        store.dispatch("isLogged", true);
        resolve(response);
      })
      .catch(error => {
        store.dispatch("isLogged", false);
        reject(error);
      });
  });
};

export const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    axiosClient
      // .get("https://matness.it/api/v1/users/me")
      .get(Vue.prototype.$matnessEndpoint + "/v1/users/me")
      .then(response => {
        store.dispatch("setUserProfile", response.data.data);
        resolve(response);
      })
      .catch(error => {
        store.dispatch("setUserProfile", null);
        reject(error);
      });
  });
};
