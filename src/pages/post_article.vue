<template>
<div id="post_article">
<div class="container">
    
    <single-input title="Title" @value="get_title"></single-input>
  <input-tag title="Tags" limit="4" :tags.sync="sub_tags"></input-tag>
</div>
  <mavon-editor v-model="sub_value"/>
  <progress-button class="btn" :fill-color="sub_color" @click="sub_act">{{sub_text}}</progress-button>
</div>
</template>

<script>
import Button from "vue-progress-button";
import InputTag from "@/components/input_tag";
import SingleInput from "@/components/single_input";

export default {
  data() {
    return {
      sub_text: "提交",
      sub_color: "#66ccff",

      sub_title: "",
      sub_value: "",
      sub_tags: []
    };
  },

  components: {
    "progress-button": Button,
    "input-tag": InputTag,
    "single-input": SingleInput
  },
  methods: {
    get_title: function(s) {
      this.sub_title = s;
    },
    sub_act: function() {
      let ads_prc = "//127.0.0.1:12345";
      console.log("title = ", this.sub_title);
      console.log("context = ", this.sub_value);
      console.log("tags = ", this.sub_tags);
      this.$http
        .post(ads_prc + "/v1/article", {
          title: this.sub_title,
          context: this.sub_value,
          tags: this.sub_tags
        })
        .then(
          res => {
            console.log(res.body.msg);
            if (res.body.code == 1000) {
              console.log("ok -> jump to next");
            }else{
                console.log(res.body.msg)
            }
          },
          res => {
            console.log(res.body.msg);
          }
        );
    }
  }
};
</script>

<style scoped>
.container {
  font-family: "Roboto";
  width: 600px;
  margin: 30px auto 0;
  display: block;
  background: #fff;
  padding: 10px 10px 50px;
}

progress-button {
  margin-top: 10vw;
}
</style>
