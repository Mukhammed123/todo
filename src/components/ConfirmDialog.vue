<template>
  <div :class="`confirm-dialog-container dialog-fade-${openDialog}`">
    <div class="confirm-dialog">
      <div class="toolbar">
        <h2>Delete Dialog</h2>
        <button @click="$emit('close-dialog')">Close</button>
      </div>
      <div class="dialog-body">
        <h3>
          Are you sure you want to delete this todo in index - {{ todoIndex }}
        </h3>
      </div>
      <div class="dialog-footer">
        <button @click="$emit('close-dialog')">Cancel</button>
        <button @click="$emit('delete-todo', todoIndex)">Delete</button>
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
  },
};
</script>

<style scoped>
@import "@/styles/components/confirmdialog.css";
</style>