<template>
  <div class="article-tag tagcloud" >
      <ul class="article-tag-list">
          <li v-for="tag in tags" class="article-tag-list-item">
              <a>{{tag}}</a>
          </li>
        </ul>
        <div class="clearfix"/>
  </div>
</template>

<script>
export default {
  name: "article_tags",
  props: {
    tags: Array
  }
};
</script>

<style scoped>
li {
  display: list-item;
  text-align: -webkit-match-parent;
}
ul{
    -webkit-padding-start: 10px;
}
.article-tag-list {
  margin-top: 0px;
}
.article-tag-list:before {
  left: 15px;
}
.article-tag-list {
  margin-right: 1em;
  display: -moz-inline-stack;
  display: inline-block;
  vertical-align: middle;
  zoom: 1;
  color: #666;
  font-size: 14px;
}
.article-tag-list .article-tag-list-item {
  display: inline-block;
  width: auto;
  max-width: 83px;
  padding-left: 8px;
  font-size: 12px;
}
.article-tag::before {
  /* content: "\f02b"; */
  content:"Tags";
  margin-left: 1em;
}
.article-tag::before,
.article-category::before {
  float: left;
  color:coral;
  font: 16px FontAwesome;
  margin-right: 5px;
  margin-top: 0.333333333333333rem;
}
.tagcloud {
  float: left;
}
.tagcloud a {
  display: inline-block;
  text-decoration: none;
  font-weight: normal;
  font-size: 0.75rem;
  color: #fff;
  height: 1.125rem;
  line-height: 1.125rem;
  float: left;
  padding: 0 5px 0 10px;
  position: relative;
  border-radius: 0 5px 5px 0;
  margin: 5px 9px 5px 8px;
  opacity: 0.75;
  outline: none;
  outline-width: 0;
  border: 0;
  cursor: pointer;
  background: #bc8f8f;
  font-family: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB",
    "WenQuanYi Micro Hei" "Lucida Grande", Verdana, "Helvetica Neue", Arial;
}
.tagcloud a:before {
  content: " ";
  width: 0;
  height: 0;
  position: absolute;
  top: 0;
  left: -1.1rem;
  border: 0.5625rem solid transparent;
}
.tagcloud a:after {
  content: " ";
  width: 4px;
  height: 4px;
  background-color: #fff;
  border-radius: 4px;
  -webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0.4375rem;
  left: 2px;
}
.clearfix {
  *zoom: 1;
}
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
</style>

