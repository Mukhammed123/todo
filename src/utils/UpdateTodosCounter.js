import { useTodoStore } from "@/stores/todo";

export const updateCounter = (title, todos) => {
  const todoStore = useTodoStore();
  const tempCounter = JSON.parse(JSON.stringify(todoStore.todosCounter));
  tempCounter[title] = todos;
        todoStore.setTodosCounter(tempCounter);
}