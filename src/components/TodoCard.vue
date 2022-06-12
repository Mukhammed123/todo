<template>
  <div class="todo-card">
    <div class="todo-card-content">
      <div class="card-toolbar">
        <RouterLink :to="`/todo-detail/${cardData.todoId}`">
          <h2>{{ cardData.title }}</h2>
        </RouterLink>
        <div class="btns-container">
          <button @click="$emit('edit-todo')">Edit</button>
          <button @click="$emit('delete-todo')">Delete</button>
        </div>
      </div>
      <RouterLink :to="`/todo-detail/${cardData.todoId}`">
        <div class="grid-container">
          <div class="todo-grid">
            <label
              v-for="(data, index) in cardData.todos"
              :key="`checkbox-${index}`"
              for="checkbox"
            >
              <input type="checkbox" :checked="data.checked" />
              {{ data.content }}
            </label>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoCard",
  props: {
    cardData: { type: Object, default: undefined },
  },
  setup() {},
};
</script>

<style scoped>
@import "@/styles/components/todocard.css";
</style>
