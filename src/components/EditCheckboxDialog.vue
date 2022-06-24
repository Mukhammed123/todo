<template>
  <div :class="`dialog-container dialog-fade-${openEditDialog}`">
    <div class="dialog-content">
      <div class="input-container">
        <span
          ref="textarea"
          class="textarea"
          role="textbox"
          contenteditable
          @input="disableBtn"
          >{{ editContent }}</span
        >
      </div>
      <div class="btns-container">
        <button @click="$emit('close-dialog')">Cancel</button>
        <button :disabled="disableEditBtn" @click="editContentFunc()">
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRef } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditCheckboxDialog",
  props: {
    openEditDialog: { type: String, default: "off" },
    content: { type: String, default: "" },
    index: { type: Number, default: -1 },
  },
  setup(props, context) {
    const editContent = toRef(props, "content");
    const index = toRef(props, "index");
    const textarea = ref(null);
    const disableEditBtn = ref(false);
    const editContentFunc = () => {
      const sendData = {
        description: textarea.value.textContent,
        index: index.value,
      };
      context.emit("edit-content", sendData);
    };
    const disableBtn = (val) => {
      if (val.target.textContent.length === 0) {
        disableEditBtn.value = true;
      } else {
        disableEditBtn.value = false;
      }
    };
    return {
      editContent,
      textarea,
      disableBtn,
      disableEditBtn,
      editContentFunc,
    };
  },
});
</script>

<style scoped>
@import "@/styles/components/editcheckboxdialog.css";
</style>
