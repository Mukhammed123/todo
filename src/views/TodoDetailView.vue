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
          <label for="checkbox" :class="`${checkbox.checked ? 'checked' : ''}`">
            <input
              type="checkbox"
              :checked="checkbox.checked"
              @input="inputCheck(index)"
            />
            <div
              class="content-input"
              @click="openEditDialog(checkbox.content, index)"
            >
              {{ checkbox.content }}
            </div>
          </label>
          <button @click="removeCheckbox(index)">Remove</button>
        </div>
      </div>
      <div class="view-footer">
        <button @click="cancelClicked()">Cancel</button>
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
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTodoStore } from "@/stores/todo";
import EditCheckboxDialog from "@/components/EditCheckboxDialog.vue";

export default {
  name: "TodoDetailView",
  components: { EditCheckboxDialog },
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
    const index = Number(route.params.id);
    if (!isNaN(index)) {
      todos.value = JSON.parse(JSON.stringify(todoStore.todoList[index].todos));
      todoTitle.value = todoStore.todoList[index].title;
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
      const temp = [...todoStore.todoList];
      temp[index] = saveTodo;
      todoStore.setTodoList(temp);
      router.push("/");
    };
    const cancelClicked = () => {
      router.push("/");
    };
    const openEditDialog = (value, index) => {
      editDialog.value = "in";
      sendContent.value = value;
      sendIndex.value = index;
      editContentKey.value += 1;
    };
    const editContent = (data) => {
      todos.value[data.index].content = data.content;
      editDialog.value = "out";
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
      cancelClicked,
      removeCheckbox,
      sendContent,
      sendIndex,
    };
  },
};
</script>

<style scoped>
@import "@/styles/views/tododetailview.css";
</style>