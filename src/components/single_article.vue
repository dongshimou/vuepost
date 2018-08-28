<template>
<div id="a_total" @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:style="thisColor">
    <div id="a_head">
    <label id="a_title">{{article.title}}</label>
    <label id="a_time">{{moment(article.time).fromNow()}}</label>
    </div>
    <hr/>    

    <div id="a_body">
    <p id="a_context" for="">{{article.context}}</p>
    </div>
    <hr/>
    
    <div id="a_tail">
    <article-tags :tags="article.tags"/>        
    </div>
</div>
</template>

<script>
import ArticleTags from "@/components/article_tags";

export default {
  name: "single_article",
  components: {
    "article-tags": ArticleTags,
  },
  data() {
    return {
      activeColor:{
        "background-color":"rgba(66, 188, 255, 0.3)"
      },
      defaultColor:{
        "background-color":"rgba(160, 160, 160, 0.3)"
      },
      thisColor:{
        "background-color":"rgba(160,160,160,0.15)"
      }
    };
  },
  props: {
    article: Object
  },
  methods:{
    mouseOver:function(){
      console.log("over")
      this.thisColor=this.activeColor
    },
    mouseLeave:function(){
      console.log("leave")
      this.thisColor=this.defaultColor
    }
  },
  computed:{
  },
  created() {

  }
};
</script>

<style>

</style>
<style scoped>
#a_total {
  padding: 10px 15px;
  /* background-color: rgba(160, 160, 160, 0.15); */
  padding-bottom: 40px;
  border-radius:10px;
}
#a_head {
  height: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
#a_title {
  float: left;
  color: #000000;
  word-break: break-all;
}
#a_context {
  text-indent: 2em;
  text-align: left;
  color: #999;
  word-break: break-word;
}
#a_time {
  float: right;
  color: #ff7e7ef0;
}
/* 放大动画 */
#a_total {
    transition:All 0.2s ease-in-out;
    -webkit-transition:All 0.2s ease-in-out;
    -moz-transition:All 0.2s ease-in-out;
    -o-transition:All 0.2s ease-in-out;
}
#a_total:hover {
    transform:scale(1.08);
    -webkit-transform:scale(1.08);
    -moz-transform:scale(1.08);
    -o-transform:scale(1.08);
    -ms-transform:scale(1.08);
}
</style>
