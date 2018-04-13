<template>
<div id="post_article">
  <mavon-editor v-model="sub_value"/>
  <progress-button class="btn" :fill-color="sub_color" @click="sub_act">{{sub_text}}</progress-button>
</div>
</template>

<script>
import Button from "vue-progress-button";

export default {
  data() {
    return {
      sub_text: "提交",
      sub_color: "#66ccff",
      sub_value:""
    };
  },

  components: {
    "progress-button": Button
  },
  methods: {
    sub_act: function() {
      console.log("1");
      console.log(this.sub_value)
    }
  }
};
</script>

<style scoped>
progress-button {
  margin-top: 10vw;
}
</style>
