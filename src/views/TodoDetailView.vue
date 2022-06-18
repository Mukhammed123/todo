<template>
  <main>
    <div class="todos-container">
      <div class="title-container">
        <div class="text-container">
          <h1>
            Mukhammed Musa
            <!-- <button @click="showDialog('add')">Add Todo</button> -->
          </h1>
          <h3>
            {{ (todoCats.find((el) => el.id == collectionId) ?? {}).title }}
          </h3>
        </div>
      </div>
      <ul
        class="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <li
          v-for="(item, index) in todos"
          :key="`top-${item}`"
          :style="`background-color: ${item.finished ? '#f5f2f2' : '#FFFFFF'}`"
          class="todo-list-item w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600"
        >
          <div class="description-container">
            <button
              v-if="item.finished"
              type="button"
              class="text-white bg-green-400 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-xs px-1.5 py-1.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-550 dark:focus:ring-green-700"
              @click="inputCheck(index)"
            >
              <svg
                class="white-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"
                />
              </svg>
            </button>
            <button
              v-else
              type="button"
              class="text-white bg-white-400 hover:bg-white-700 focus:ring-4 focus:outline-none focus:outline-none font-medium rounded-lg text-xs px-0 py-0 text-center inline-flex items-center mr-2 dark:bg-white-600 dark:hover:bg-white-100 dark:focus:ring-white-100"
              @click="inputCheck(index)"
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
            <span
              :style="`text-decoration: ${item.finished ? 'line-through' : ''}`"
              >{{ item.description }}</span
            >
          </div>

          <div>
            <button
              type="button"
              class="text-white bg-yellow-400 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-400 font-medium rounded-lg text-xs px-1.5 py-1.5 text-center inline-flex items-center mr-2 dark:bg-yellow-600 dark:hover:bg-yellow-550 dark:focus:ring-yellow-700"
              @click="toggleModal('editAddModal', item, 'edit')"
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
              @click="toggleModal('deleteModal', item.id)"
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
        <li
          class="todo-list-item w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600"
        >
          <button @click="toggleModal('editAddModal', undefined, 'add')">
            + New To-do
          </button>
        </li>
      </ul>
    </div>
    <!-- Delete Modal -->
    <div
      class="hidden overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center"
      id="deleteModal"
    >
      <DeleteTodoDialog
        :key="modalKey"
        title="Delete Task"
        text="Are you sure you want to delete this task?"
        @close-dialog="toggleModal('deleteModal')"
        @confirmed="deleteTodo"
      />
    </div>
    <div
      class="hidden opacity-25 fixed inset-0 z-40 bg-black"
      :id="`deleteModal-backdrop`"
    ></div>
    <!-- Edit & Add Todo Modal -->
    <div
      class="hidden overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center"
      id="editAddModal"
    >
      <AddEditTaskDialog
        :key="`add-${modalKey}`"
        :operation="operation"
        title="Delete Task"
        text="Are you sure you want to delete this task?"
        :description="currentTaskDesc"
        @close-dialog="toggleModal('editAddModal')"
        @confirmed-add="addCheckbox"
        @confirmed-edit="editContent"
      />
    </div>
    <div
      class="hidden opacity-25 fixed inset-0 z-40 bg-black"
      :id="`editAddModal-backdrop`"
    ></div>
  </main>
</template>

<script>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";
import { todoItemPath } from "@/services/apiPaths";
import { useRoute } from "vue-router";
import { useTodoStore } from "@/stores/todo";
import DeleteTodoDialog from "@/components/DeleteTodoDialog.vue";
import AddEditTaskDialog from "@/components/AddEditTaskDialog.vue";

export default {
  name: "TodoDetailView",
  components: { DeleteTodoDialog, AddEditTaskDialog },
  setup() {
    const todoStore = useTodoStore();
    const route = useRoute();
    const todos = ref([]);
    const editDialog = ref("off");
    const sendContent = ref("");
    const sendIndex = ref(-1);
    const collectionId = Number(route.params.id);
    const originalData = ref([]);
    const modalKey = ref(0);
    const operation = ref(undefined);
    const currentTask = ref(undefined);
    const currentTaskDesc = ref(undefined);

    const { todoCats } = storeToRefs(todoStore);

    const getTodos = async () => {
      const response = await axios.get(`${todoItemPath}${collectionId}`);
      if (response.status === 200) {
        todos.value = response.data;
        originalData.value = JSON.parse(JSON.stringify(response.data));
      } else todos.value = [];
    };

    if (!isNaN(collectionId)) {
      getTodos();
    }

    const inputCheck = (checkedIndex) => {
      todos.value[checkedIndex].finished = !todos.value[checkedIndex].finished;
      axios.put(
        `${todoItemPath}${todos.value[checkedIndex].id}/`,
        todos.value[checkedIndex]
      );
    };
    const addCheckbox = (text) => {
      console.log("Add: ", text);
      const newTodo = {
        description: text,
        finished: false,
        todo_id: collectionId,
      };
      axios.post(todoItemPath, newTodo);
      toggleModal('editAddModal');
      getTodos();
    };
    const deleteTodo = () => {
      axios.delete(`${todoItemPath}${currentTask.value}/`);
      toggleModal("deleteModal");
      getTodos();
      currentTask.value = undefined;
    };
    const editContent = (text) => {
      currentTask.value.description = text;
      axios.put(
        `${todoItemPath}${currentTask.value.id}/`,
        currentTask.value
      );
      currentTask.value = undefined;
      toggleModal("editModal");
      getTodos();
    };
    const toggleModal = (modalId, task, op) => {
      operation.value = op;
      currentTask.value = task;
      if(task && task.description) currentTaskDesc.value = task.description;
      modalKey.value += 1;
      const dialog = document.getElementById(modalId);
      dialog.classList.toggle("hidden");
      document.getElementById(modalId + "-backdrop").classList.toggle("hidden");
      document.getElementById(modalId).classList.toggle("flex");
      document.getElementById(modalId + "-backdrop").classList.toggle("flex");
    };
    return {
      todos,
      editDialog,
      editContent,
      inputCheck,
      addCheckbox,
      sendContent,
      sendIndex,
      deleteTodo,
      todoCats,
      collectionId,
      toggleModal,
      modalKey,
      operation,
      currentTaskDesc
    };
  },
};
</script>

<style scoped>
@import "@/styles/views/tododetailview.css";
</style>
