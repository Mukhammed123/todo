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
import { ref } from "vue";
import { useTodoStore } from "@/stores/todo";

export default {
  name: "TodoDialog",
  props: {
    openDialog: { type: String, default: "off" },
    operation: { type: String, default: "add" },
    editTodoTitle: { type: String, default: "edit" },
    index: { type: Number, default: -1 },
  },
  emits: ["close-dialog"],
  setup(props, context) {
    const todoTitle = ref("");
    if (props.operation === "edit") todoTitle.value = props.editTodoTitle;
    const todoStore = useTodoStore();
    const addTodo = () => {
      const newTodo = {
        title: todoTitle.value,
        todos: [],
        checked: false,
      };
      const tempArr = JSON.parse(JSON.stringify(todoStore.todoList));
      tempArr.unshift(newTodo);
      todoStore.setTodoList(tempArr);
      context.emit("close-dialog");
    };
    const editTodo = () => {
      const tempArr = JSON.parse(JSON.stringify(todoStore.todoList));
      tempArr[props.index].title = todoTitle.value;
      todoStore.setTodoList(tempArr);
      context.emit("close-dialog");
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
