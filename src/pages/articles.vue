<template>
<div>
  <!-- <div v-scroll-loadmore='loadmore'> -->
<ul v-for="art in articles">
   <a href="javascript:void(0)" @click="art_jump(art)">
     <single-article :article="art"/>
    </a>
</ul>
</div>
</template>
<style scoped>
a {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
a:link,
a:visited {
  text-decoration: none;
}
</style>

<script>
import SingleArticle from "@/components/single_article";
import GlobalData from "@/components/global";

export default {
  components: {
    "single-article": SingleArticle,
    GlobalData
  },
  data() {
    return {
      articles: [],
      start_load: false,
      time: new Date(),
      size: 10,
      on_load_pos:0,
    };
  },
  methods: {
    art_jump: function(art) {
      this.$router.push({
        name: "get_article",
        params: {
          title: art.title
        }
      });
    },
    reloadData: function() {
      let address = GlobalData.inter + "/article";
      this.start_load = true;
      let tstr=this.time.getTime().toString()
      let t=tstr.substring(0,tstr.length-3)
      this.$http
        .get(address, {
          params: {
            time: t,
            size: this.size
          }
        })
        .then(
          res => {
            let data = res.body.data.articles;
            for (let i = 0; i < data.length; i++) {
              this.articles.push({
                title: data[i].title,
                context: data[i].context.substring(0, 256) + "...",
                time: data[i].create_datetime,
                tags: data[i].tags
              });
              this.time = new Date(data[i].create_datetime)
            }
            console.log("load time:",this.time.toLocaleString());
            this.start_load = false;
          },
          res => {
            this.start_load = false;
          }
        );
    },
    getScrollTop: function() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    },
    getScrollHeight: function() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    },
    getWindowHeight: function() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    },
    scrollLoad: function() {
        let now_scroll=this.getScrollTop() + this.getWindowHeight()
        let total_scroll=this.getScrollHeight()
      if (now_scroll >=total_scroll*0.9) {
        if (!this.start_load) {
          if(this.on_load_pos<total_scroll){
          this.on_load_pos=total_scroll
          this.reloadData();
          }
        }
      }
    },
    loadmore: function() {
      // console.log("loadmore");
      this.reloadData();
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollLoad);
  },
  created() {
    this.reloadData();
  }
};
</script>

<style>

</style>