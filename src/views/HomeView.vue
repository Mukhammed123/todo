<template>
  <main>
    <div class="todo-list-container">
      <h1>
        Mukhammed Musa Todo List
        <button @click="showDialog()">Add Todo</button>
      </h1>
      <div class="todo-list">
        <div v-for="(item, index) in todoList" :key="`${item}-${index}`">
          <todo-card
            :card-data="item"
            :index="index"
            @delete-todo="openConfirmDialog(index)"
          ></todo-card>
        </div>
      </div>
    </div>
    <add-todo-dialog
      :open-dialog="openDialog"
      @close-dialog="openDialog = 'out'"
    />
    <confirm-dialog
      :open-dialog="confirmDialog"
      :todo-index="delTodoIndex"
      @close-dialog="confirmDialog = 'out'"
      @delete-todo="deleteTodo"
    />
  </main>
</template>

<script>
import { defineComponent, toRef, ref } from "vue";
import { useTodoStore } from "@/stores/todo";
import { storeToRefs } from "pinia";
import TodoCard from "@/components/TodoCard.vue";
import AddTodoDialog from "@/components/AddTodoDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default {
  name: "HomeView",
  components: { TodoCard, AddTodoDialog, ConfirmDialog },
  setup() {
    const todoListStore = useTodoStore();
    const { todoList } = storeToRefs(todoListStore);
    const openDialog = ref("off");
    const confirmDialog = ref("off");
    const delTodoIndex = ref(null);

    const showDialog = () => {
      openDialog.value = "in";
    };
    const openConfirmDialog = (index) => {
      delTodoIndex.value = index;
      confirmDialog.value = "in";
    };
    const deleteTodo = (index) => {
      const tempArr = [...todoList.value];
      tempArr.splice(index, 1);
      todoListStore.setTodoList(tempArr);
      confirmDialog.value = "out";
    };

    return {
      todoList,
      openDialog,
      confirmDialog,
      showDialog,
      deleteTodo,
      delTodoIndex,
      openConfirmDialog,
    };
  },
};
</script>

<style scoped>
@import "@/styles/views/homeview.css";
</style>
