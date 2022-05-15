<template>
  <main>
    <div class="todo-list-container">
      <h1>
        Mukhammed Musa Todo List
        <button @click="showDialog('add')">Add Todo</button>
      </h1>
      <div class="todo-list">
        <div v-for="(item, index) in todoList" :key="`${item}-${index}`">
          <todo-card
            :card-data="item"
            :index="index"
            @edit-todo="showDialog('edit', item.title, index)"
            @delete-todo="openConfirmDialog(index)"
          ></todo-card>
        </div>
      </div>
    </div>
    <todo-dialog
      :open-dialog="openDialog"
      :operation="todoOperation"
      :edit-todo-title="editTodoTitle"
      @close-dialog="openDialog = 'out'"
      :index="editIndex"
      :key="todoKey"
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
import TodoDialog from "@/components/TodoDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default {
  name: "HomeView",
  components: { TodoCard, TodoDialog, ConfirmDialog },
  setup() {
    console.log("Setup");
    const todoListStore = useTodoStore();
    const { todoList } = storeToRefs(todoListStore);
    const openDialog = ref("off");
    const confirmDialog = ref("off");
    const delTodoIndex = ref(null);
    const todoOperation = ref("add");
    const todoKey = ref(0);
    const editTodoTitle = ref("");
    const editIndex = ref(null);

    const showDialog = (op, title, index) => {
      todoOperation.value = op;
      editTodoTitle.value = op === "edit" ? title : "";
      editIndex.value = index;
      todoKey.value += 1;
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
      todoKey,
      todoList,
      openDialog,
      confirmDialog,
      showDialog,
      editIndex,
      deleteTodo,
      delTodoIndex,
      editTodoTitle,
      todoOperation,
      openConfirmDialog,
    };
  },
};
</script>

<style scoped>
@import "@/styles/views/homeview.css";
</style>
