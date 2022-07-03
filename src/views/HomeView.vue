<template>
  <main>
    <div class="title-container"></div>
  </main>
</template>

<script>
import {useTodoStore} from '@/stores/todo';
import {useRouter} from 'vue-router';
export default {
  name: "HomeView",
  setup() {
    const todoStore = useTodoStore();
    const router = useRouter();

    if(!todoStore.isLoggedIn) router.push('/login');
    return {
    };
  },
};
</script>

<style scoped>
@import "@/styles/views/homeview.css";
</style>
