<template>
  <div class="detail-view-container">
    <header>
      <h1>{{ todoTitle }}</h1>
    </header>
    <div class="view-body">
      <div class="content-container">
        <div class="add-button-container">
          <input v-model="newCheckbox" type="text" />
          <button class="add-checkbox-btn" @click="addCheckbox()">Add</button>
        </div>
        <div
          v-for="(checkbox, index) in todos"
          :key="`detail-${index}`"
          class="checkbox-container"
        >
          <div :class="`${checkbox.finsihed ? 'checked' : ''}`">
            <input
              type="checkbox"
              :checked="checkbox.finsihed"
              @input="inputCheck(index)"
            />
            <div
              class="content-input"
              @click="openEditDialog(checkbox.description, index)"
            >
              {{ checkbox.description }}
            </div>
          </div>
          <button @click="removeCheckbox(index)">Remove</button>
        </div>
      </div>
      <div class="view-footer">
        <div class="delete-cancel-btns">
          <button
            @click="
              openConfirmDialog(
                'Are you sure you want to discard all changes?',
                'cancel'
              )
            "
          >
            Cancel
          </button>
          <button
            @click="
              openConfirmDialog(
                'Are you sure you want to delete this todo?',
                'delete'
              )
            "
          >
            Delete
          </button>
        </div>
        <button @click="saveChanges()">Save</button>
      </div>
    </div>
    <edit-checkbox-dialog
      :key="editContentKey"
      :open-edit-dialog="editDialog"
      :content="sendContent"
      :index="sendIndex"
      @close-dialog="editDialog = 'out'"
      @edit-content="editContent"
    ></edit-checkbox-dialog>
    <confirm-dialog
      :open-dialog="confirmDialog"
      :received-text="confirmText"
      :operation="confirmOperation"
      @close-dialog="confirmDialog = 'out'"
      @confirmed-cancel="cancelClicked()"
      @confirmed-delete="deleteTodo()"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";
import { useTodoStore } from "@/stores/todo";
import EditCheckboxDialog from "@/components/EditCheckboxDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default {
  name: "TodoDetailView",
  components: { EditCheckboxDialog, ConfirmDialog },
  setup() {
    const todoStore = useTodoStore();
    const route = useRoute();
    const router = useRouter();
    const todos = ref(null);
    const todoTitle = ref("");
    const newCheckbox = ref("");
    const editDialog = ref("off");
    const sendContent = ref("");
    const sendIndex = ref(-1);
    const editContentKey = ref(0);
    const confirmKey = ref(0);
    const confirmDialog = ref("off");
    const confirmText = ref("");
    const confirmOperation = ref("");
    const todoId = Number(route.params.id);

    const getTodos = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/api/todo/list/${todoId}`);
      if(response.status === 200)
        todos.value = response.data;
      else todos.value = [];
    }

    if (!isNaN(todoId)) {
      getTodos();
      console.log(todoTitle.value)
    }
    
    const inputCheck = (checkedIndex) => {
      todos.value[checkedIndex].checked = !todos.value[checkedIndex].checked;
    };
    const addCheckbox = () => {
      if (newCheckbox.value.length > 0) {
        const temp = {
          content: newCheckbox.value,
          checked: false,
        };
        todos.value.unshift(temp);
        newCheckbox.value = "";
      }
    };
    const removeCheckbox = (checkboxIndex) => {
      todos.value.splice(checkboxIndex, 1);
    };
    const saveChanges = () => {
      const saveTodo = {
        title: todoTitle.value,
        todos: todos.value,
      };
      const temp = JSON.parse(JSON.stringify(todoStore.todoList));
      temp[todoId] = saveTodo;
      todoStore.setTodoList(temp);
      router.push("/");
    };
    const cancelClicked = () => {
      router.push("/");
    };
    const openEditDialog = (value, todoId) => {
      editDialog.value = "in";
      sendContent.value = value;
      sendIndex.value = todoId;
      editContentKey.value += 1;
    };
    const editContent = (data) => {
      todos.value[data.todoId].content = data.content;
      editDialog.value = "out";
    };
    const openConfirmDialog = (text, op) => {
      confirmOperation.value = op;
      confirmText.value = text;
      confirmKey.value += 1;
      confirmDialog.value = "in";
    };
    const deleteTodo = () => {
      const tempArr = JSON.parse(JSON.stringify(todoStore.todoList));
      tempArr.splice(todoId, 1);
      todoStore.setTodoList(tempArr);
      confirmDialog.value = "out";
      router.push("/");
    };
    return {
      todos,
      newCheckbox,
      todoTitle,
      editDialog,
      openEditDialog,
      editContentKey,
      editContent,
      inputCheck,
      addCheckbox,
      saveChanges,
      confirmText,
      openConfirmDialog,
      confirmOperation,
      cancelClicked,
      removeCheckbox,
      sendContent,
      sendIndex,
      confirmDialog,
      confirmKey,
      deleteTodo,
    };
  },
};
</script>

<style scoped>
@import "@/styles/views/tododetailview.css";
</style>