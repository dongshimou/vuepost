<template>
<div>
  <fab :actions="fabActions"
    @signin="signin"
    @signout="signou"
    @signup="signup"
    @about="about"
    @article="article">
  </fab>
</div>
</template>

<script>
import fab from "vue-fab";

export default {
  components: {
    fab
  },
  data() {
    return {
      fabActions: []
    };
  },
  name: "my-fab",
  props: {
    is_about: {
      type: Boolean,
      default: false
    },
    is_article: {
      type: Boolean,
      default: false
    },
    is_replay: {
      type: Boolean,
      default: false
    },
    is_signin: {
      type: Boolean,
      default: false
    },
    is_signout: {
      type: Boolean,
      default: false
    },
    is_signup: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    add_about() {
      this.fabActions.push({
        name: "about",
        icon: "account_circle"
      });
    },
    add_replay() {
      this.fabActions.push({
        name: "replay",
        icon: "replay"
      });
    },
    add_article() {
      this.fabActions.push({
        name: "article",
        icon: "create"
      });
    },
    add_signout() {
      this.fabActions.push({
        name: "signout",
        icon: "person_outline"
      });
    },
    add_signin() {
      this.fabActions.push({
        name: "signin",
        icon: "people"
      });
    },
    add_signup() {
      this.fabActions.push({
        name: "signup",
        icon: "person_add"
      });
    },
    article() {
      this.$router.push({ name: "post_article" });
    },
    signin() {},
    signup() {}
  }
};
</script>

<style>

</style>
