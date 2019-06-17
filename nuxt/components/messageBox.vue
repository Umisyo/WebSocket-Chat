<template>
  <div>
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png">
      </p>
    </figure>
    <div class="media-content">
        <div class="content">
            <p>
                >
                <strong>User: {{ message.user }}</strong>
                <br>
                {{ message.text }}
                <br>
                <small>
                    <a>Like</a>
                    <a @click="setShowReplyArea" v-if="isMother">Reply</a>
                    . {{ message.date }}
                </small>
            </p>
        </div>
    </div>
    <div v-if="showReplyArea">
      <p class="control is-expended">
      <input
        class="input"
        type="text"
        v-model="reply"
        @keyup.enter="sendReply"
        @keypress="setCanMessageSubmit"
        placeholder="reply"
      >
      </p>
      <p class="control">
        <button class="button is-info" @click="sendReply">Send</button>
      </p>
      <small>
        <div class="container">
          <article class="media" v-for="(reply, index) in message.replys" :key="index">
            <messageBox :message='reply' :socket='socket' :auth='auth' :isMother='false'></messageBox>
          </article>
        </div>
      </small>
    </div>
  </div>
</template>

<script>
import messageBox from '~/components/messageBox'
export default {
    name: 'messageBox',
    components: {
      messageBox
    },
    props: {
        socket: Object,
        message: Object,
        auth: Object,
        thisIndex: Number,
        isMother: Boolean
    },
    data () {
      return {
        reply: '',
        showReplyArea: false,
        isLoading: true,
        canMessageSubmit: false
      }
    },
    computed: {
    },
    mounted() {
      this.socket.on('new-reply', reply => {
        this.replys.push(reply || {})
      })
    },
    methods: {
      setShowReplyArea () {
        if (this.showReplyArea) {
          this.showReplyArea = false
        }
        else {
          this.showReplyArea = true
        }
      },
      setCanMessageSubmit () {
        this.canMessageSubmit = true
      },
      sendReply () {
        if (!this.reply.trim()) {
          return;
        }
        else if(!this.canMessageSubmit) {
          return;
        }
        let now = new Date();
        now.setTime(now.getTime() + 1000 * 60 * 60 * 9)

        now = now
          .toJSON()
          .split("T")[1]
          .slice(0, 5)

        let reply = {
          user: this.auth.userName !== '名無しさん' ? this.auth.userName : '名無しさん' + 'id:' + this.socket.id,
          date: now,
          text: this.reply.trim(),
        }

        this.message.replys.push(reply)

        console.log(this.thisIndex)

        this.socket.emit('send-reply', reply, this.thisIndex)

        this.reply = ''

        this.canMessageSubmit = false
      }
    }
}
</script>

