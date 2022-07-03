<template>
  <div class="snackbar">
    <div
      class="hidden opacity-25 fixed inset-0 z-40 bg-black"
      :id="`editCollection-backdrop`"
    ></div>
    <div
      style="
        position: absolute;
        bottom: 0px;
        display: flex;
        justify-content: center;
        width: 100%;
      "
      class="snackbar-container"
    >
      <div
        :id="snackbarId"
        style="height: 50px"
        :class="`${
          hideSnackbar ? 'hidden' : ''
        } flex p-4 mb-4 bg-${type}-100 rounded-lg dark:bg-${type}-200`"
        role="alert"
      >
        <svg
          :class="`flex-shrink-0 w-5 h-5 text-${type}-700 dark:text-${type}-800`"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div
          :class="`ml-3 text-sm font-medium text-${type}-700 dark:text-${type}-800`"
        >
          {{ `${type === "red" ? "Error Message:" : "Message:"}` }}
          {{ snackbarMessage }}
        </div>
        <button
          type="button"
          :class="`ml-auto -mx-1.5 -my-1.5 bg-${type}-100 text-${type}-500 rounded-lg focus:ring-2 focus:ring-${type}-400 p-1.5 hover:bg-${type}-200 inline-flex h-8 w-8 dark:bg-${type}-200 dark:text-${type}-600 dark:hover:bg-${type}-300`"
          @click="$emit('close')"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Snackbar",
  props: {
    snackbarId: { type: String, default: "errorSnackbar" },
    type: { type: String, default: "error" },
    hideSnackbar: { type: Boolean, default: true },
    snackbarMessage: { type: String, default: "" },
  },
  setup() {},
});
</script>
