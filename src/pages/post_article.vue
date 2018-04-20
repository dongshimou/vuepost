<template>
<div id="post_article">
<div class="container">
  <single-input title="Title" @value="get_title"></single-input>
  <input-tag title="Tags" limit="4" :tags.sync="sub_tags"></input-tag>
</div>
<toggle-button @change="enable_toolbar"/>
<toggle-button @change="enable_preview"/>
<toggle-button @change="enable_catalog"/>
  <mavon-editor :toolbarsFlag="is_tool" :subfield="is_prew" :navigation="is_list" codeStyle="monokai"  v-model="sub_value"/>
  <progress-button class="btn" :fill-color="sub_color" @click="sub_act">{{sub_text}}</progress-button>
</div>
</template>

<script>
import ProgressButton from "vue-progress-button";
import InputTag from "@/components/input_tag";
import SingleInput from "@/components/single_input";
import GlobalData from "@/components/global"
export default {
  data() {
    return {
      sub_text: "提交",
      sub_color: "#66ccff",

      is_tool: false,
      is_prew: true,
      is_list: false,

      sub_title: "",
      sub_value: "",
      sub_tags: []
    };
  },

  components: {
    "progress-button": ProgressButton,
    "input-tag": InputTag,
    "single-input": SingleInput
  },
  methods: {
    get_title: function(s) {
      this.sub_title = s;
    },
    enable_toolbar: function() {
      this.is_tool = !this.is_tool;
    },
    enable_preview: function() {
      this.is_prew = !this.is_prew;
    },
    enable_catalog: function() {
      this.is_list = !this.is_list;
    },
    sub_act: function() {
      let ads_prc = GlobalData.inter;
      console.log("title = ", this.sub_title);
      console.log("context = ", this.sub_value);
      console.log("tags = ", this.sub_tags);
      this.$http
        .post(ads_prc + "/article", {
          title: this.sub_title,
          context: this.sub_value,
          tags: this.sub_tags
        })
        .then(
          res => {
            console.log(res.body.msg);
            if (res.body.code == 1000) {
              console.log("ok -> jump to next");
            } else {
              console.log(res.body.msg);
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
progress-button {
  margin-top: 10vw;
}
</style>

<style>
.container {
  font-family: "Roboto";
  width: 100%;
  margin: 0;
  display: block;
  background: #fff;
  padding-bottom: 25px;
}
</style>

<style lang="scss">
.btn {
  color: #666;
  cursor: pointer;
  display: block;
  font-size: 16px;
  // font-weight: 400;
  line-height: 35px;
  margin: auto;

  margin-top: 25px;
  max-width: 100px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  vertical-align: middle;
  width: 100%;
  text-shadow: none;
  border: 0 solid;

  &:hover {
    text-decoration: none;
  }
}
</style>
