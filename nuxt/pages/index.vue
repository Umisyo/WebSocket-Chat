<template>
  <div>
    <nav class="level">
      <div class="level-item has-text-centered">
        <button class="button is-info" @click="googleLogin">Login with Google</button>
      </div>
      <div class="level-item has-text-centered">
        <button class="button is-info" @click="unknownLogin">名無しさんとしてログイン</button>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.$store.dispatch("setAuth", {
            uid: result.user.uid,
            userName: result.user.displayName
          }),
            this.$router.push("/socket");
        });
    },
    unknownLogin() {
      this.$store.dispatch("setAuth", {
        uid: "unknown",
        userName: "名無しさん"
      });
      this.$router.push("/socket");
    }
  }
};
</script>

<style>
</style>
