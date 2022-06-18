<template>
  <main>Main View</main>
</template>

<script>
import TodoCard from "@/components/TodoCard.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default {
  name: "HomeView",
  components: { TodoCard, ConfirmDialog },
  setup() {
    return {};
  },
};
</script>

<style scoped>
@import "@/styles/views/homeview.css";
</style>
