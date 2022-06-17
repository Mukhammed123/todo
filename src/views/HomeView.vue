<template>
  <main>
    <div class="todos-container">
      <div class="title-container">
        <div class="text-container">
          <h1>
            Mukhammed Musa Todo List
            <button @click="showDialog('add')">Add Todo</button>
          </h1>
          <h3>Today's Date</h3>
        </div>
      </div>
      <ul
        class="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <li
          v-for="item in todos"
          :key="`top-${item}`"
          class="todo-list-item w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
        >
          <div class="description-container">
            <button
              type="button"
              class="text-white bg-green-400 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-xs px-1.5 py-1.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-550 dark:focus:ring-green-700"
            >
              <svg
                class="white-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"
                />
              </svg>
            </button>
            <button
              type="button"
              class="text-white bg-white-400 hover:bg-white-700 focus:ring-4 focus:outline-none focus:outline-none font-medium rounded-lg text-xs px-0 py-0 text-center inline-flex items-center mr-2 dark:bg-white-600 dark:hover:bg-white-100 dark:focus:ring-white-100"
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:serif="http://www.serif.com/"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path
                  serif:id="shape 12"
                  d="M18 0h-12c-3.312 0-6 2.688-6 6v12c0 3.312 2.688 6 6 6h12c3.312 0 6-2.688 6-6v-12c0-3.312-2.688-6-6-6m0 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4h-12c-2.206 0-4-1.794-4-4v-12c0-2.206 1.794-4 4-4h12z"
                />
              </svg>
            </button>
            <span>{{ item.description }}</span>
          </div>

          <div>
            <button
              type="button"
              class="text-white bg-yellow-400 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-400 font-medium rounded-lg text-xs px-1.5 py-1.5 text-center inline-flex items-center mr-2 dark:bg-yellow-600 dark:hover:bg-yellow-550 dark:focus:ring-yellow-700"
            >
              <svg
                class="white-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z"
                />
              </svg>
            </button>
            <button
              type="button"
              class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-1.5 py-1.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                class="white-svg"
              >
                <path
                  d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
                />
              </svg>
            </button>
          </div>
        </li>
      </ul>
      <div class="todo-list">
        <div v-for="item in todos" :key="`${item.description}`">
          <todo-card
            :card-data="item"
            @edit-todo="showDialog('edit', item.description, item.id)"
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
import TodoCard from "@/components/TodoCard.vue";
import TodoDialog from "@/components/TodoDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
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

    const getTodos = async () => {
      const response = await axios.get(todoItemPath);
      if (response.status === 200) {
        todos.value = response.data;
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
