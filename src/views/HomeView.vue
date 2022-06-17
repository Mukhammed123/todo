<template>
  <main>Main View</main>
</template>

<script>
import { ref, onMounted } from "vue";
import TodoCard from "@/components/TodoCard.vue";
import TodoDialog from "@/components/TodoDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { useTodoStore } from "@/stores/todo";
import axios from "axios";
import { todoItemPath } from "@/services/apiPaths";

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
    const todoStore = useTodoStore();
    const getTodos = async () => {
      console.log(todoStore.todoCats);
      const response = await axios.get(
        `${todoItemPath}${todoStore.todoCats[0].id}/`
      );
      if (response.status === 200) {
        todos.value = response.data;
        todoStore.setTodoCats(response.data);
        console.log(todoStore.todoCats);
      }
    };

    onMounted(async () => {
      getTodos();
    });

    const showDialog = (op, title, id) => {
      todoOperation.value = op;
      editTodoTitle.value = op === "edit" ? title : "";
      editId.value = id;
      todoKey.value += 1;
      openDialog.value = "in";
    };
    const openConfirmDialog = (delId) => {
      delTodoIndex.value = delId;
      confirmDialog.value = "in";
    };

    const deleteTodo = async (delId) => {
      await axios.delete(`${todoPath}${delId}/`);
      confirmDialog.value = "out";
      getTodos();
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
