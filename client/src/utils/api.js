import axios from "axios";

export default {
  // user routes
  createUser: function (data) {
    return axios.post("/api/users/register", data);
  },
  authUser: function (data) {
    return axios.post("/api/users/login", data);
  },
  signout: function () {
    return axios.get("/api/users/logout");
  },

  // polish routes
  getAllPolishes: function () {
    return axios.get("/api/polishes");
  },
  getAllFavoritess: function () {
    return axios.get("/api/polishes/favorites")
  },
  addFavorite: function (id) {
    return axios.post(`/api/polishes/favorites/${id}`)
  },
  removeFavorite: function (id) {
    return axios.delete(`/api/polishes/favorites/${id}`)
  },

  // wish routes
  createWish: function (id, data) {
    return axios.post(`/api/wishes/${id}`, data);
  },

  // scrape route
  scrape: function () {
    return axios.get("/api/scrapes");
  }
}