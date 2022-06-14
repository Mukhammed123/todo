<template>
  <div class="app-container">
    <header>
      <nav>
        <RouterLink to="/">
        <h1>Home</h1>
        </RouterLink>
      </nav>
    </header>
  <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style>
@import "@/assets/base.css";
</style>
