<template>
  <main>
    <div class="todos-container">
      <div class="title-container">
        <div class="text-container">
          <h1>
            Mukhammed Musa
            <!-- <button @click="showDialog('add')">Add Todo</button> -->
          </h1>
          <div style="display: flex; justify-content: space-between">
            <h3>
              {{ currentCollection ? currentCollection.title : "" }}
            </h3>
            <div style="display: flex">
              <div
                style="display: flex; align-items: center; cursor: pointer"
                class="delete-col-btn-container"
                @click="openEditColDialog"
              >
                <svg
                  class="white-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z"
                  />
                </svg>
              </div>
              <div
                style="display: flex; align-items: center; margin-left: 8px"
                class="delete-col-btn-container"
                @click="openDeleteColDialog()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  class="svg-btn white-svg dark:hover:bg-green-550 dark:focus:ring-green-700"
                >
                  <path
                    d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
                  />
                </svg>
              </div>
            </div>
          </div>
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
              @click="openEditDialog(item)"
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
              @click="openDeleteDialog(item.id)"
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
          <button class="add-todo-btn" @click="openAddDialog()">
            <div>
              <span class="plus-sign">+</span>
              <span class="add-new-todo">New To-do</span>
            </div>
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
    <!-- Delete Collection Modal -->
    <div
      class="hidden overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center"
      id="deleteCollectionModal"
    >
      <DeleteTodoDialog
        :key="modalKey"
        title="Delete Collection"
        text="Are you sure you want to delete this collection?"
        @close-dialog="toggleModal('deleteCollectionModal')"
        @confirmed="deleteCollection"
      />
    </div>
    <div
      class="hidden opacity-25 fixed inset-0 z-40 bg-black"
      :id="`deleteCollectionModal-backdrop`"
    ></div>
    <!-- Edit & Add Todo Modal -->
    <div
      class="hidden overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center"
      id="editAddModal"
    >
      <AddEditTaskDialog
        :key="`add-${modalKey}`"
        :operation="operation"
        name="To-do"
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
    <!-- Collection Modal -->
    <div
      class="hidden overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center"
      id="editCollection"
    >
      <AddEditTaskDialog
        :key="`edit-${modalKey}-collection`"
        operation="edit"
        name="Collection Name"
        :description="currentCollection ? currentCollection.title : ''"
        @close-dialog="toggleModal('editCollection')"
        @confirmed-edit="editCollectionFunc"
      />
    </div>
    <div
      class="hidden opacity-25 fixed inset-0 z-40 bg-black"
      :id="`editCollection-backdrop`"
    ></div>
    <div
      style="
        position: absolute;
        bottom: 0px;
        display: flex;
        justify-content: center;
        width: 100%;
      "
      class="snackbar-container"
    >
      <div
        id="errorSnackbar"
        style="height: 50px"
        :class="`${
          hideSnackbar ? 'hidden' : ''
        } flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200`"
        role="alert"
      >
        <svg
          class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
          Error Message: {{ snackbarMessage }}
        </div>
        <button
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
          @click="hideSnackbar = true"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";
import { todoItemPath, todoPath } from "@/services/apiPaths";
import { useRoute, useRouter } from "vue-router";
import { useTodoStore } from "@/stores/todo";
import DeleteTodoDialog from "@/components/DeleteTodoDialog.vue";
import AddEditTaskDialog from "@/components/AddEditTaskDialog.vue";
import { updateCounter } from "@/utils/UpdateTodosCounter";

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
    const currentCollection = ref(undefined);
    const hideSnackbar = ref(true);
    const snackbarMessage = ref("");
    const router = useRouter();

    const { todoCats, accessToken } = storeToRefs(todoStore);

    watchEffect(() => {
      currentCollection.value = todoCats.value.find(
        (el) => el.id == collectionId
      );
    });

    const getTodos = async () => {
      try {
        const response = await axios.get(`${todoItemPath}${collectionId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.value}`,
          },
        });
        if (response.status === 200) {
          todos.value = response.data;
          originalData.value = JSON.parse(JSON.stringify(response.data));
          updateCounter(
            currentCollection.value.title,
            todos.value.filter((el) => el.finished === false).length
          );
        }
      } catch (err) {
        todos.value = [];
        snackbarMessage.value = err.message;
        hideSnackbar.value = false;
      }
    };

    if (!isNaN(collectionId)) {
      getTodos();
    }

    const inputCheck = async (checkedIndex) => {
      try {
        todos.value[checkedIndex].finished =
          !todos.value[checkedIndex].finished;
        await axios.put(
          `${todoItemPath}${todos.value[checkedIndex].id}/`,
          todos.value[checkedIndex],
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken.value}`,
            },
          }
        );
      } catch (err) {
        todos.value[checkedIndex].finished =
          !todos.value[checkedIndex].finished;
        snackbarMessage.value = err.message;
        hideSnackbar.value = false;
      }
      updateCounter(
        currentCollection.value.title,
        todos.value.filter((el) => el.finished === false).length
      );
    };
    const addCheckbox = async (text) => {
      const newTodo = {
        description: text,
        finished: false,
        todo_id: collectionId,
      };
      toggleModal("editAddModal");
      try {
        await axios.post(todoItemPath, newTodo, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.value}`,
          },
        });
        getTodos();
      } catch (err) {
        snackbarMessage.value = err.message;
        hideSnackbar.value = false;
      }
    };
    const deleteTodo = async () => {
      toggleModal("deleteModal");
      try {
        await axios.delete(`${todoItemPath}${currentTask.value}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.value}`,
          },
        });
        getTodos();
      } catch (err) {
        snackbarMessage.value = err.message;
        hideSnackbar.value = false;
      }
      currentTask.value = undefined;
    };
    const openDeleteDialog = (taskId) => {
      currentTask.value = taskId;
      toggleModal("deleteModal");
    };
    const openAddDialog = () => {
      operation.value = "add";
      currentTaskDesc.value = undefined;
      currentTask.value = undefined;
      toggleModal("editAddModal");
    };
    const openEditDialog = (task) => {
      operation.value = "edit";
      currentTask.value = task;
      currentTaskDesc.value = task.description;
      toggleModal("editAddModal");
    };
    const editContent = async (text) => {
      currentTask.value.description = text;
      toggleModal("editAddModal");
      try {
        await axios.put(
          `${todoItemPath}${currentTask.value.id}/`,
          currentTask.value,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken.value}`,
            },
          }
        );

        getTodos();
      } catch (err) {
        snackbarMessage.value = err.message;
        hideSnackbar.value = false;
      }
      currentTask.value = undefined;
    };
    const openEditColDialog = () => {
      toggleModal("editCollection");
    };

    const editCollectionFunc = async (title) => {
      currentCollection.value.title = title;
      toggleModal("editCollection");
      try {
        await axios.put(
          `${todoPath}${currentCollection.value.id}/`,
          currentCollection.value,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken.value}`,
            },
          }
        );
        getCollections();
      } catch (err) {
        snackbarMessage.value = err.message;
        hideSnackbar.value = false;
      }
    };

    const getCollections = async () => {
      const response = await axios.get(todoPath, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      if (response.status === 200) {
        todoStore.setTodoCats(response.data);
        todoStore.todoCats.forEach((el) => {
          updateCounter(el.title, el.num_tasks);
        });
      }
    };

    const openDeleteColDialog = () => {
      toggleModal("deleteCollectionModal");
    };

    const deleteCollection = async () => {
      toggleModal("deleteCollectionModal");
      await axios.delete(`${todoPath}${collectionId}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      await getCollections();
      router.push("/");
    };

    const toggleModal = (modalId) => {
      modalKey.value += 1;
      const dialog = document.getElementById(modalId);
      dialog.classList.toggle("hidden");
      document.getElementById(modalId + "-backdrop").classList.toggle("hidden");
      document.getElementById(modalId).classList.toggle("flex");
      document.getElementById(modalId + "-backdrop").classList.toggle("flex");
    };

    return {
      snackbarMessage,
      openDeleteColDialog,
      hideSnackbar,
      todos,
      editDialog,
      openAddDialog,
      editContent,
      openDeleteDialog,
      openEditColDialog,
      deleteCollection,
      inputCheck,
      addCheckbox,
      sendContent,
      sendIndex,
      deleteTodo,
      currentCollection,
      editCollectionFunc,
      todoCats,
      collectionId,
      toggleModal,
      openEditDialog,
      modalKey,
      operation,
      currentTaskDesc,
    };
  },
};
</script>

<style scoped>
@import "@/styles/views/tododetailview.css";
</style>
