import { defineStore } from "pinia";

export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    todoCats: [],
    accessToken: "",
    refreshToken: "",
    isLoggedIn: false,
  }),
  getters: {
    getTodoList: (state) => state.todoList,
  },
  actions: {
    setIsLoggedIn(value) {
      this.isLoggedIn = value;
    },
    setAccessToken(value) {
      this.accessToken = value;
    },
    setRefreshToken(value) {
      this.refreshToken = value;
    },
    setTodoCats(todoCats) {
      this.todoCats = todoCats;
    },
    setIsAuthenticated(value) {
      this.isAuthenticated = value;
    },
  },
});
