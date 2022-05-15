<template>
  <div class="todo-card">
    <div class="todo-card-content">
      <div class="card-toolbar">
        <RouterLink :to="`/todo-detail/${index}`">
          <h2>{{ cardData.title }}</h2>
        </RouterLink>
        <div class="btns-container">
          <button @click="editTodo()">Edit</button>
          <button @click="$emit('delete-todo')">Delete</button>
        </div>
      </div>
      <RouterLink :to="`/todo-detail/${index}`">
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
    index: { type: Number, default: 0 },
  },
  setup(props, context) {
    const editTodo = () => {
      console.log("Edit clicked");
    };
    return {
      editTodo,
    };
  },
};
</script>

<style scoped>
@import "@/styles/components/todocard.css";
</style>
