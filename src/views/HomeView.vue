<template>
  <main>
    <div class="todo-list-container">
      <h1>
        Mukhammed Musa Todo List
        <button @click="showDialog()">Add Todo</button>
      </h1>
      <div class="todo-list">
        <div v-for="(item, index) in todoList" :key="`${item}-${index}`">
          <todo-card :card-data="item" :index="index"></todo-card>
        </div>
      </div>
    </div>
    <div :class="`add-todo-dialog-container dialog-fade-${openDialog}`">
      <div class="add-todo-dialog">
        <div class="toolbar">
          <button>icon</button>
          <span>Add Todo</span>
          <button @click="closeDialog()">Close</button>
        </div>
        <div class="dialog-body">Content</div>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent, toRef, ref } from "vue";
import { useTodoStore } from "@/stores/todo";
import { storeToRefs } from "pinia";
import TodoCard from "@/components/TodoCard.vue";

export default {
  name: "HomeView",
  components: { TodoCard },
  setup() {
    const todoListStore = useTodoStore();
    const { todoList } = storeToRefs(todoListStore);
    const openDialog = ref("off");

    const showDialog = () => {
      openDialog.value = "in";
    };
    const closeDialog = () => {
      openDialog.value = "out";
    };

    return {
      todoList,
      openDialog,
      showDialog,
      closeDialog,
    };
  },
};
</script>

<style scoped>
@import "@/styles/views/homeview.css";
</style>
