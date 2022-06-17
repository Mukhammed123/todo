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
        <button
          v-if="operation === 'add'"
          :disabled="(todoTitle || '').length === 0"
          @click="addTodo()"
        >
          Add
        </button>
        <button
          v-else
          :disabled="(todoTitle || '').length === 0"
          @click="editTodo()"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRef } from "vue";
import axios from "axios";
import { todoPath } from "@/services/apiPaths";
import { useTodoStore } from "@/stores/todo";

export default {
  name: "TodoDialog",
  props: {
    openDialog: { type: String, default: "off" },
    operation: { type: String, default: "add" },
    editTodoTitle: { type: String, default: "edit" },
    editId: { type: Number, default: -1 },
  },
  emits: ["close-dialog", "get-data"],
  setup(props, context) {
    const todoId = toRef(props, "editId");
    const todoTitle = ref("");
    if (props.operation === "edit") todoTitle.value = props.editTodoTitle;
    const todoStore = useTodoStore();
    const addTodo = async () => {
      const newTodo = {
        title: todoTitle.value,
        finished: false,
      };
      await axios.post(todoPath, newTodo);
      context.emit("close-dialog");
      context.emit("get-data");
    };
    const editTodo = async () => {
      await axios.put(`${todoPath}${todoId.value}/`, {
        title: todoTitle.value,
      });
      context.emit("close-dialog");
      context.emit("get-data");
    };
    return {
      addTodo,
      editTodo,
      todoTitle,
    };
  },
};
</script>

<style scoped>
@import "@/styles/components/addtododialog.css";
</style>
