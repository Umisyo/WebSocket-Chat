<template>
  <div class="container">
    <button class="button is-info" @click="googleLogin">Login with Google</button>
    <button class="button is-info" @click="unknownLogin">名無しさんとしてログイン</button>
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
        .then((result) => {
          this.$store.dispatch('setAuth', {uid: result.user.uid, userName: result.user.displayName}),
          this.$router.push('/socket');
        });
    },
    unknownLogin() {
      this.$store.dispatch('setAuth', {uid: 'unknown', userName: '名無しさん'})
      this.$router.push('/socket')
    }
  },
}
</script>

<style>

</style>
