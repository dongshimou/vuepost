<template>
<div id="get_article">
    <div class="container">
  <single-input title="Title" :readOnly="true" :setValue="art_title"></single-input>
  <input-tag title="Tags" :readOnly="true" :tags.sync="art_tags" ></input-tag>
    <div class="article-nav-header">
    <div class="article-nav-header-left">
     
    <router-link v-if="art_prev!=''" :to="link_prev" @click="reload">
       <i class="fa fa-arrow-circle-left"></i>
    <!-- <strong class="article-nav-caption"><</strong> -->
    <p class="article-nav-title">{{art_prev}}</p>
    </router-link>
    </div>

    <div class="article-nav-header-right">
       
    <router-link v-if="art_next!=''" :to="link_next" @click="reload">
    <p class="article-nav-title">{{art_next}}</p>
    <!-- <strong class="article-nav-caption">></strong> -->
    <i class="fa fa-arrow-circle-right"></i>
    </router-link>
    
    </div>

    </div>

    <mavon-editor :toolbarsFlag="false" :subfield="false"  defaultOpen="preview" codeStyle="monokai"  v-model="art_context"/>
    <div class="article-nav-header">
          <div class="article-nav-header-left">
             
    <router-link v-if="art_prev!=''" :to="link_prev" @click="reload">
      <i class="fa fa-arrow-circle-left"></i>
    <!-- <strong class="article-nav-caption"><</strong> -->
    <p class="article-nav-title">{{art_prev}}</p>
    </router-link>
          </div>

          <div class="article-nav-header-right">          
            
    <router-link v-if="art_next!=''" :to="link_next" @click="reload">
    <p class="article-nav-title">{{art_next}}</p>
    <!-- <strong class="article-nav-caption">></strong> -->
    <i class="fa fa-arrow-circle-right"></i>
    </router-link>
     
          </div>
    </div>

      <single-input title="Replay" @value="get_replay"/>
      <progress-button class="btn" :fill-color="sub_color" @click="sub_replay">{{sub_text}}</progress-button>
    <p v-for="replay in art_replays" style="text-align:left;">
    {{replay.context}}
    </p>
    </div>
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
      sub_text: "回复",
      sub_color: "#66ccff",

      art_context: "",
      art_tags: [],
      art_title: "",
      art_author: "",
      art_next: "",
      art_prev: "",
      art_replays: [],
      art_replay: "",
      link_next: {},
      link_prev: {}
    };
  },
  components: {
    "progress-button": ProgressButton,
    "input-tag": InputTag,
    "single-input": SingleInput
  },
  methods: {
    fetch_article: function(address) {
      this.$http.get(address).then(
        res => {
          if (res.body.code == 1000) {
            let data = res.body.data;
            // console.log(data);
            this.art_context = data.context;
            this.art_tags = data.tags;
            this.art_title = data.title;
            this.art_author = data.author;
            this.art_prev = data.prev;
            this.art_next = data.next;
            if (data.prev != "") {
              this.link_prev = {
                name: "get_article",
                params: {
                  title: data.prev
                }
              };
            }
            if (data.next != "") {
              this.link_next = {
                name: "get_article",
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

    fetch_replays: function(address) {
      this.$http.get(address).then(
        res => {
          if (res.body.code == 1000) {
            let data = res.body.data;
            // console.log("replays : ", data);
            this.art_replays = data.replays;
          } else {
            console.log(res.body.msg);
          }
        },
        res => {}
      );
    },

    get_replay: function(s) {
      this.art_replay = s;
    },
    sub_replay: function() {
      // console.log(this.art_replay);
      this.$http
        .post(this.base_address + "/replay", {
          title: this.art_title,
          context: this.art_replay
        })
        .then(
          res => {
            if (res.body.code == 1000) {
              // console.log("replay ok");
              this.reload_replays();
            } else {
            }
          },
          res => {}
        );
    },

    reload() {
      console.log(this.$route.path);
      this.reload_article();
      this.reload_replays();
    },
    reload_article() {
      this.fetch_article(this.base_address + this.$route.path);
    },
    reload_replays() {
      this.fetch_replays(
        this.base_address + this.$route.path.replace("article", "replay")
      );
    }
  },
  mounted() {
    this.reload();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "reload"
  }
};
</script>
<style scoped>
a{
  /* 去掉链接下划线 */
  text-decoration:none;
  /* 让图标和文字在一行 */
  display: table;
}
a *{
  display: table-cell;
  /* 颜色渐变 */
  -webkit-transition: color 0.3s;
  -moz-transition: color 0.3s;
  -ms-transition: color 0.3s;
  transition: color 0.3s;
}
a i{
  /* a下icon颜色 */
  color: #66ccff;
}
a:hover i{
  /* a下icon 掠过颜色 */
  color: red;
}
a p{
  /* a下文字 */
  display: inline-block;
  font-size: 1rem;
  color: #666;
}
a:hover p{
  /* a下掠过颜色 */
  color: #66ccff;
}
</style>

<style>
.article-nav-header {
  padding: 0 3vw 0 3vw;
  display: flex;
  justify-content: space-between;
}
.article-nav-header-left {
}
.article-nav-header-left {
}
/* .article-nav-caption {
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
} */
.article-nav-title {
  /* move to [a p] */
}
</style>
