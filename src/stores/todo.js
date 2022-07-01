import { defineStore } from "pinia";

export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    todosCounter: {},
    username: "",
    todoCats: [],
    accessToken: "",
    refreshToken: "",
    isLoggedIn: false,
  }),
  getters: {
    getTodoList: (state) => state.todoList,
  },
  actions: {
    setTodosCounter(value) {
      this.todosCounter = value;
    },
    setUsername(value) {
      this.username = value;
    },
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
