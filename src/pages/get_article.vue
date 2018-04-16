<template>
<div id="get_article">
    <div class="container">
  <single-input title="Title" :readOnly="true" :setValue="art_title"></single-input>
  <input-tag title="Tags" :readOnly="true" :tags.sync="art_tags"></input-tag>
</div>
    <mavon-editor :toolbarsFlag="false" :subfield="false"  defaultOpen="preview" codeStyle="monokai"  v-model="art_context"/>
    <div class="container">
    <router-link v-if="art_prev!=''" :to="link_prev" @click="reload">
    <strong class="article-nav-caption"><</strong>
    <p class="article-nav-title">{{art_prev}}</p>
    </router-link>
    <router-link v-if="art_next!=''" :to="link_next" @click="reload">
    <p class="article-nav-title">{{art_next}}</p>
    <strong class="article-nav-caption">></strong>
    </router-link>
    </div>
</div>
    
</template>

<script>
import InputTag from "@/components/input_tag";
import SingleInput from "@/components/single_input";

export default {
  data() {
    return {
      art_context: "",
      art_tags: [],
      art_title: "",
      art_author: "",
      art_next: "",
      art_prev: "",
      link_next: {},
      link_prev: {}
    };
  },
  components: {
    "input-tag": InputTag,
    "single-input": SingleInput
  },
  methods: {
    fetch_data: function(address) {
      this.$http.get(address).then(
        res => {
          if (res.body.code == 1000) {
            let data = res.body.data;
            console.log(data);
            this.art_context = data.context;
            this.art_tags = data.tags;
            this.art_title = data.title;
            this.art_author = data.author;
            console.log(this.$route);
            console.log(data.prev,data.next,"prev next")
            if (data.prev != "") {
              this.art_prev = data.prev;
              this.link_prev = {
                name: "get-article",
                params: {
                  title: data.prev
                }
              };
            }
            if (data.next != "") {
              this.art_next = data.next;
              this.link_next = {
                name: "get-article",
                params: {
                  title: data.next
                }
              };
            }
          } else {
            console.log(res.body.msg);
          }
        },
        res => {}
      );
    },
    reload(){
      console.log(this.$route.path);
      let address = "//127.0.0.1:12345/v1";
      this.fetch_data(address + this.$route.path);
    }
  },
  mounted() {
     this.reload()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'reload'
  },
};
</script>

<style>
.article-nav-caption {
  background: #999;
  color: #fff;
  border-radius: 100%;
  width: 15px;
  height: 15px;
  display: inline-block;
  text-align: center;
  -webkit-transition: background 0.3s;
  -moz-transition: background 0.3s;
  -ms-transition: background 0.3s;
  transition: background 0.3s;
}
.article-nav-title {
  display: inline-block;
  font-size: 1rem;
  color: #999;
  -webkit-transition: color 0.3s;
  -moz-transition: color 0.3s;
  -ms-transition: color 0.3s;
  transition: color 0.3s;
}
</style>
