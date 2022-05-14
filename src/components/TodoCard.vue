<template>
  <div class="todo-card">
    <RouterLink :to="`/todo-detail/${index}`">
      <div class="todo-card-content">
        <h2>{{ cardData.title }}</h2>
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
</template>

<script>
export default {
  name: "TodoCard",
  props: {
    cardData: { type: Object, default: undefined },
    index: { type: Number, default: 0 },
  },
  setup() {},
};
</script>

<style scoped>
@import "@/styles/components/todocard.css";
</style>
