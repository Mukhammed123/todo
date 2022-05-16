<template>
  <div :class="`confirm-dialog-container dialog-fade-${openDialog}`">
    <div class="confirm-dialog">
      <div class="toolbar">
        <h2>Confirm Dialog</h2>
        <button @click="$emit('close-dialog')">Close</button>
      </div>
      <div class="dialog-body">
        <h3>
          {{ receivedText }}
        </h3>
      </div>
      <div class="dialog-footer">
        <button @click="$emit('close-dialog')">Cancel</button>
        <button @click="$emit(`confirmed-${operation}`, todoIndex)">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    openDialog: { type: String, default: "off" },
    todoIndex: { type: Number, default: -1 },
    receivedText: { type: String, default: "" },
    operation: { type: String, default: "" },
  },
};
</script>

<style scoped>
@import "@/styles/components/confirmdialog.css";
</style>