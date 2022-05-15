<template>
  <div class="detail-view-container">
    <header>
      <h1>{{ todoTitle }}</h1>
    </header>
    <div class="view-body">
      <div class="content-container">
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
            <span>{{ checkbox.content }}</span>
          </label>
        </div>
      </div>
      <div class="view-footer">
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useTodoStore } from "@/stores/todo";

export default {
  name: "TodoDetailView",
  setup() {
    const todoStore = useTodoStore();
    const route = useRoute();
    const todos = ref(null);
    const todoTitle = ref("");
    const index = Number(route.params.id);
    if (!isNaN(index)) {
      // Need to use _.cloneDeep
      todos.value = [...todoStore.todoList[index].todos];
      todoTitle.value = todoStore.todoList[index].title;
    }
    const inputCheck = (checkedIndex) => {
      const temp = [...todos.value];
      temp[checkedIndex].checked = !todos.value[checkedIndex].checked;
      console.log(temp[checkedIndex]);
      todos.value = temp;
    };
    return {
      todos,
      todoTitle,
      inputCheck,
    };
  },
};
</script>

<style scoped>
@import "@/styles/views/tododetailview.css";
</style>