<template>
<div id="a_total">
    <div id="a_head">
    <label id="a_title">{{article.title}}</label>
    <label id="a_time">{{article.time}}</label>
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
    "article-tags": ArticleTags
  },
  data() {
    return {};
  },
  props: {
    article: Object
  },
  created() {}
};
</script>

<style>

</style>
<style scoped>
#a_total {
  padding: 10px 15px;
  background-color: rgba(160, 160, 160, 0.15);
  padding-bottom: 40px;
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
</style>
