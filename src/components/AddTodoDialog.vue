<template>
  <div :class="`add-todo-dialog-container dialog-fade-${openDialog}`">
    <div class="add-todo-dialog">
      <div class="toolbar">
        <button>icon</button>
        <span>Add Todo</span>
        <button @click="$emit('close-dialog')">Close</button>
      </div>
      <div class="dialog-body">
        <input
          v-model="todoTitle"
          placeholder="Enter Todo Title"
          class="title-input"
        />
      </div>
      <div class="dialog-footer">
        <button @click="$emit('close-dialog')">Cancel</button>
        <button :disabled="(todoTitle || '').length === 0" @click="addTodo()">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTodoStore } from "@/stores/todo";

export default {
  name: "AddTodoDialog",
  props: {
    openDialog: { type: String, default: "off" },
  },
  emits: ["close-dialog"],
  setup(props, context) {
    const todoTitle = ref("");
    const todoStore = useTodoStore();
    const addTodo = () => {
      const newTodo = {
        title: todoTitle.value,
        todos: [],
        checked: false,
      };
      const tempArr = [...todoStore.todoList];
      tempArr.push(newTodo);
      todoStore.setTodoList(tempArr);
      context.emit("close-dialog");
    };
    return {
      addTodo,
      todoTitle,
    };
  },
};
</script>

<style scoped>
@import "@/styles/components/addtododialog.css";
</style>
