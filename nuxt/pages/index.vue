<template>
  <div>
    メール
    <br>
    <input type="text" v-model="email">
    <br>パスワード
    <br>
    <input type="password" v-model="password">
    <br>
    <button @click="login">ログイン</button>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapActions, mapState, mapGetters, mapMutations,Store } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isAuthenticated"])
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.setUser(user);
    });
  },
  methods: {
    ...mapActions(["setUser"]),
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.push("/socket");
        })
        .catch(error => {
          alert(error);
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setUser(null);
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>