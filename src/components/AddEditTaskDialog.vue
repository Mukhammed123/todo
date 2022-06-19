<template>
  <div class="relative w-full my-6 mx-auto max-w-2xl">
    <!--content-->
    <div
      class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
    >
      <!--header-->
      <div
        class="flex items-start justify-between p-5 pb-1 border-b border-solid border-slate-200 rounded-t"
      >
        <h3 class="text-3xl font-semibold">{{ operation }} To-do</h3>
        <button class="p-2 m-0 pt-0" @click="$emit('close-dialog')">
          <span style="font-size: x-large; display: flex; align-items: start">
            ×
          </span>
        </button>
      </div>
      <!--body-->
      <div class="relative p-6 flex-auto">
        <div class="mb-6">
          <label
            for="default-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Description:</label
          >
          <input
            v-model="content"
            type="text"
            id="default-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <!--footer-->
      <div
        class="flex p-6 border-t border-solid border-slate-200 rounded-b"
        style="justify-content: space-between"
      >
        <button
          class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          @click="$emit('close-dialog')"
        >
          Close
        </button>
        <button
          type="button"
          :class="`text-white bg-green-400 dark:bg-gree-500 ${
            !(content.length > 0) ? 'cursor-not-allowed' : ''
          } font-medium rounded-lg text-sm px-5 py-2.5 text-center`"
          @click="$emit(`confirmed-${operation}`, content)"
          :disabled="!(content.length > 0)"
        >
          {{ operation.toLocaleUpperCase() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRef, watchEffect } from "vue";

export default {
  name: "AddEditTaskDialog",
  props: {
    title: { type: String, default: "" },
    operation: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  setup(props) {
    const content = ref("");
    content.value = props.description;
    return {
      content,
    };
  },
};
</script>

<style scoped>
@import "@/styles/components/addtododialog.css";
h3::first-letter {
  text-transform: capitalize;
}
</style>
