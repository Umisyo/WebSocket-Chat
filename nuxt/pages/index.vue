<template>
  <div>
    <button @click="googleLogin">Login with Google</button>
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
          console.log(result);
          this.$store.dispatch('setAuth', {uid: result.user.uid, userName: result.user.displayName}),
          this.$router.push('/socket');
        });
    }
  },
}
</script>