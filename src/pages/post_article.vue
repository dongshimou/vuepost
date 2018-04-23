<template>
<div id="post_article">
<div class="container">
  <single-input title="Title" @value="get_title"></single-input>
  <input-tag title="Tags" limit="4" :tags.sync="sub_tags"></input-tag>
</div>
<div class="container  flexRowBox">
  <label>工具栏</label>
<toggle-button :sync="true" :value="is_tool" @change="enable_toolbar"/>
  <label>多窗口</label>
<toggle-button :sync="true" :value="is_prew" @change="enable_preview"/>

<label>预览</label>
<toggle-button :sync="true" :value="is_multi" @change="enable_multi"/>
  <label>编辑</label>
<toggle-button :sync="true" :value="is_edit" @change="enable_catalog"/>
</div>
  <mavon-editor :toolbarsFlag="is_tool" :subfield="is_prew" :editable="is_edit" codeStyle="monokai" :defaultOpen="edit_prew" v-model="sub_value"/>
  <progress-button class="btn" :fill-color="sub_color" @click="sub_act">{{sub_text}}</progress-button>
</div>
</template>

<script>
import ProgressButton from "vue-progress-button";
import InputTag from "@/components/input_tag";
import SingleInput from "@/components/single_input";
import GlobalData from "@/components/global";
export default {
  data() {
    return {
      sub_text: "提交",
      sub_color: "#66ccff",

      is_tool: false,
      is_prew: true,
      is_edit: true,
      edit_prew: "preview",

      is_multi: true,

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
  created() {},
  methods: {
    get_title: function(s) {
      this.sub_title = s;
    },
    enable_multi: function() {
      this.is_multi = !this.is_multi;
      console.log(this.is_multi);
      if (this.is_multi) {
        this.is_prew = false;
        this.edit_prew = "preview";
      } else {
        this.is_prew = false;
        this.edit_prew = "edit";
      }
    },
    enable_toolbar: function() {
      this.is_tool = !this.is_tool;
    },
    enable_preview: function() {
      this.is_prew = !this.is_prew;
      if (this.is_prew) {
        this.edit_prew = "preview";
      } else {
        this.edit_prew = "edit";
      }
    },
    enable_catalog: function() {
      this.is_edit = !this.is_edit;
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
            this.$router.push({
              name: "get_article",
              params: {
                title: this.sub_title
              }
            });
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
.switchs {
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
