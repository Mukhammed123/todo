<template>
  <main>
    <div class="todo-list-container">
      <h1>
        Mukhammed Musa Todo List
        <button @click="showDialog('add')">Add Todo</button>
      </h1>
      <div class="todo-list">
        <div v-for="(item) in todos" :key="`${item.title}`">
          <todo-card
            :card-data="item"
            @edit-todo="showDialog('edit', item.title, item.id)"
            @delete-todo="openConfirmDialog(item.id)"
          ></todo-card>
        </div>
      </div>
    </div>
    <todo-dialog
      :open-dialog="openDialog"
      :operation="todoOperation"
      :edit-todo-title="editTodoTitle"
      @close-dialog="openDialog = 'out'"
      @get-data="getTodos"
      :edit-id="editId"
      :key="todoKey"
    />
    <confirm-dialog
      :open-dialog="confirmDialog"
      :todo-index="delTodoIndex"
      operation="delete"
      received-text="Are you sure you want to delete this todo?"
      @close-dialog="confirmDialog = 'out'"
      @confirmed-delete="deleteTodo"
    />
  </main>
</template>

<script>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import TodoCard from "@/components/TodoCard.vue";
import TodoDialog from "@/components/TodoDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import axios from 'axios';

export default {
  name: "HomeView",
  components: { TodoCard, TodoDialog, ConfirmDialog },
  setup() {
    const openDialog = ref("off");
    const confirmDialog = ref("off");
    const delTodoIndex = ref(null);
    const todoOperation = ref("add");
    const todoKey = ref(0);
    const editTodoTitle = ref("");
    const editId = ref(null);
    const todos = ref([]);

    const getTodos = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/todo/");
      if(response.status === 200) {
        todos.value = response.data;
      }
    }

    onMounted( async () => {
      getTodos()
    })

    const showDialog = (op, title, id) => {
      todoOperation.value = op;
      editTodoTitle.value = op === "edit" ? title : "";
      editId.value = id;
      console.log("show: ", id)
      todoKey.value += 1;
      openDialog.value = "in";
    };
    const openConfirmDialog = (index) => {
      delTodoIndex.value = index;
      confirmDialog.value = "in";
    };

    const deleteTodo = (index) => {
      // const tempArr = JSON.parse(JSON.stringify(todoList.value));
      // tempArr.splice(index, 1);
      // todoListStore.setTodoList(tempArr);
      // confirmDialog.value = "out";

      // getTodos();
    };

    return {
      todoKey,
      todos,
      openDialog,
      confirmDialog,
      showDialog,
      getTodos,
      editId,
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
