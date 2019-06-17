<template>
  <section class="section">
    <div id="wrapper" class="conttainer">
      <article class="media">
        <div class="media-content">
          <div class="field is-grouped">
            <p class="control is-expended">
              <input
                class="input"
                type="text"
                v-model="message"
                @keyup.enter="sendMessage"
                @keypress="setCanMessageSubmit"
                placeholder="message"
              >
            </p>
            <p class="control">
              <button class="button is-info" @click="sendMessage">Send</button>
            </p>
          </div>
        </div>
      </article>
      <article class="media" v-for="(message, index) in reverseMessages" :key="index">
        <messageBox :message='message'></messageBox>
      </article>
      <b-loading :is-full-page="false" :active.sync="isLoading" :can-cansel="false"></b-loading>
    </div>
  </section>
</template>

<script>
import io from "socket.io-client";
import { mapState } from "vuex";
import messageBox from '~/components/messageBox'

export default {
  middleware: "auth",
  components: {
    messageBox
  },
  data() {
    return {
      message: "",
      messages: [],
      socket: "",
      isLoading: true,
      canMessageSubmit: false
    };
  },
  computed: {
    ...mapState(["auth"]),
    reverseMessages: function() {
      return this.messages.slice().reverse();
    }
  },
  mounted() {
    this.socket = io();

    this.socket.on("new-message", message => {
      this.messages.push(message || {});
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
  methods: {
    setCanMessageSubmit() {
      this.canMessageSubmit = true
    },
    sendMessage() {
      if (!this.message.trim()) {
        return;
      }
      else if (!this.canMessageSubmit){
        return;
      }

      let now = new Date();

      now.setTime(now.getTime() + 1000 * 60 * 60 * 9);
      now = now
        .toJSON()
        .split("T")[1]
        .slice(0, 5);

      let message = {
        user: !this.auth.userName === '名無しさん' ? this.auth.userName: '名無しさん' + ' id:' + this.socket.id,
        date: now,
        text: this.message.trim()
      };

      this.messages.push(message);

      this.socket.emit("send-message", message);

      this.message = "";

      this.canMessageSubmit = false
    }
  }
};
</script>

<style scoped>
#wrapper {
  max-width: 680px;
}
</style>