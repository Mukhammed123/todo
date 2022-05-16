<template>
  <div :class="`dialog-container dialog-fade-${openEditDialog}`">
    <div class="dialog-content">
      <div class="input-container">
        <span ref="textarea" class="textarea" role="textbox" contenteditable>{{
          editContent
        }}</span>
      </div>
      <div class="btns-container">
        <button @click="$emit('close-dialog')">Cancel</button>
        <button @click="editContentFunc()">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRef } from "vue";
export default {
  name: "EditCheckboxDialog",
  props: {
    openEditDialog: { type: String, default: "off" },
    content: { type: String, default: "" },
    index: { type: Number, default: -1 },
  },
  setup(props, context) {
    const editContent = toRef(props, "content");
    const textarea = ref(null);
    const editContentFunc = () => {
      const sendData = {
        index: props.index,
        content: textarea.value.textContent,
      };
      context.emit("edit-content", sendData);
    };
    return {
      editContent,
      textarea,
      editContentFunc,
    };
  },
};
</script>

<style scoped>
@import "@/styles/components/editcheckboxdialog.css";
</style>