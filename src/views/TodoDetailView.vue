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
            <input v-model="checkbox.content" class="content-input" />
          </label>
          <button @click="removeCheckbox(index)">Remove</button>
        </div>
      </div>
      <div class="view-footer">
        <button @click="cancelClicked()">Cancel</button>
        <button @click="saveChanges()">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTodoStore } from "@/stores/todo";

export default {
  name: "TodoDetailView",
  setup() {
    const todoStore = useTodoStore();
    const route = useRoute();
    const router = useRouter();
    const todos = ref(null);
    const todoTitle = ref("");
    const newCheckbox = ref("");
    const index = Number(route.params.id);
    if (!isNaN(index)) {
      // Need to use _.cloneDeep
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
    return {
      todos,
      newCheckbox,
      todoTitle,
      inputCheck,
      addCheckbox,
      saveChanges,
      cancelClicked,
      removeCheckbox,
    };
  },
};
</script>

<style scoped>
@import "@/styles/views/tododetailview.css";
</style>