<template>
  <div class="relative w-auto my-6 mx-auto max-w-3xl">
    <!--content-->
    <div
      class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
    >
      <!--header-->
      <div
        class="flex items-start justify-between p-5 pb-1 border-b border-solid border-slate-200 rounded-t"
      >
        <h3 class="text-3xl font-semibold">{{ title }}</h3>
        <button class="p-2 m-0 pt-0" @click="$emit('close-dialog')">
          <span style="font-size: x-large; display: flex; align-items: start">
            ×
          </span>
        </button>
      </div>
      <!--body-->
      <div class="relative p-6 flex-auto">
        <p class="my-4 text-slate-500 text-lg leading-relaxed">
          {{ text }}
        </p>
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
          class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          @click="$emit('confirmed')"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DeleteTodoDialog",
  props: {
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  },
});
</script>

<style scoped>
@import "@/styles/components/addtododialog.css";
</style>
