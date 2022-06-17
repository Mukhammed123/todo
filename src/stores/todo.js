import { defineStore } from "pinia";

export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    todoCats: [],
  }),
  getters: {
    getTodoList: (state) => state.todoList,
  },
  actions: {
    setTodoCats(todoCats) {
      this.todoCats = todoCats;
    },
  },
});
