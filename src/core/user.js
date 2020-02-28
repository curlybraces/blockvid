import axiosClient from "./axiosClient";
import store from "./../store/index";

export const getUserToken = () => {
  let token = localStorage.getItem("token");
  return token;
};

export const userHasValidToken = () => {
  return new Promise((resolve, reject) => {
    axiosClient
      .get("https://matness.it/api/v1/verifyToken")
      // .get("localhost:8000/api/v1/verifyToken")
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
