<template>
<div id="post_article">
<div class="container">
  <single-input title="Title" @getValue="get_title"></single-input>
  <input-tag title="Tags" limit="4" :tags.sync="art_tags" ></input-tag>
</div>
<div class="container flexRowBox">
  <label>工具栏</label>
<toggle-button :sync="true" :value="is_tool" @change="enable_toolbar"/>
  <label>多窗口</label>
<toggle-button :sync="true" :value="is_prew" @change="enable_preview"/>

<label>预览</label>
<toggle-button :sync="true" :value="is_multi" @change="enable_multi"/>
  <label>编辑</label>
<toggle-button :sync="true" :value="is_edit" @change="enable_catalog"/>
</div>
  <mavon-editor :toolbarsFlag="is_tool" :subfield="is_prew" :editable="is_edit" codeStyle="monokai" :defaultOpen="edit_prew" v-model="art_context"/>
  <progress-button class="btn-submit" :fill-color="sub_color" @click="sub_act">{{sub_text}}</progress-button>
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
      base_address: GlobalData.inter,
      sub_text: "提交",
      sub_color: "#66ccff",

      is_tool: false,
      is_prew: true,
      is_edit: true,
      edit_prew: "preview",

      is_multi: true,

      art_context: "",
      art_tags: [],
      art_title: "",
      art_author: "",

      page_status: "create"
    };
  },

  components: {
    "progress-button": ProgressButton,
    "input-tag": InputTag,
    "single-input": SingleInput
  },
  mounted() {
    if (this.$route.name == "update_article") {
      this.fetch_article(
        this.base_address + "/article/" + this.$route.params.title
      );
      this.page_status = "update";
    } else if (this.$route.name == "create_article") {
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "reload"
  },
  methods: {
    fetch_article: function(address) {
      this.$http.get(address).then(
        res => {
          if (res.body.code == 1000) {
            let data = res.body.data;
            this.art_context = data.context;
            this.art_tags = data.tags;
            this.art_title = data.title;
            this.art_author = data.author;
            // this.art_prev = data.prev;
            // this.art_next = data.next;
            // if (data.prev != "") {
            //   this.link_prev = {
            //     name: "get_article",
            //     params: {
            //       title: data.prev
            //     }
            //   };
            // }
            // if (data.next != "") {
            //   this.link_next = {
            //     name: "get_article",
            //     params: {
            //       title: data.next
            //     }
            //   };
            // }
          } else {
            // console.log(res.body.msg);
            this.$noty.error(res.body.msg)
          }
        },
        res => {
          this.$noty.error(res.statusText)
        }
      );
    },
    get_title: function(s) {
      this.art_title = s;
    },
    enable_multi: function() {
      this.is_multi = !this.is_multi;
      // console.log(this.is_multi);
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
      let path_address = "";
      if (this.page_status == "create") {
        path_address = "/article";
      } else if (this.page_status == "update") {
        path_address = "/article/update/" + this.art_title;
      }
      this.$http
        .post(this.base_address + path_address, {
          title: this.art_title,
          context: this.art_context,
          tags: this.art_tags
        })
        .then(
          res => {
            // console.log(res.body)
            if (res.body.code == 1000) {
              // console.log("ok -> jump to next");
              this.$router.push({
                name: "get_article",
                params: {
                  title: this.art_title
                }
              });
              this.$noty.success(res.body.msg)
            } else {
              this.$noty.error(res.body.msg)
            }
          },
          res => {
            this.$noty.error(res.statusText)
          }
        );
    }
  }
};
</script>

<style>

</style>


