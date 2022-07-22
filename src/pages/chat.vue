<template>
  <q-page>
    <div class="row">
      <div class="col-2"></div>
      <div
        class="col-8 q-pa-md"
        style="border: 1px solid rgba(86, 61, 124, 0.2)"
      >
        <div v-for="(chat_message, index) in chat_block" v-bind:key="index">
          <q-chat-message name="me" :text="[chat_message]" sent />
        </div>
        <div class="row q-pt-md">
          <div class="col-10">
            <q-input v-model="text" outlined dense> </q-input>
          </div>
          <div class="col-1 q-pl-sm">
            <q-btn @click="sendMessage()" icon="send" flat></q-btn>
          </div>
          <div class="col-1">
            <q-btn @click="refreshMessage()" icon="refresh" flat></q-btn>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent } from "vue";

var chat_block = ["hey, how are you?"];
var text = ref("");
export default defineComponent({
  name: "chat",
  setup() {
    function sendMessage() {
      if (text.value != "") {
        console.log(text.value);
        chat_block.push(text.value);
        text.value = "";
      }
    }
    function refreshMessage() {
      chat_block = ["hey, how are you?"];
    }
    return {
      chat_block,
      text,
      sendMessage,
      refreshMessage,
    };
  },
});
</script>
