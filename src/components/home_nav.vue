<template>
  <div>
      <div id="nav-avatar" class="flexRowBox">
        <a href="https://github.com/yanthems">
      <avatar 
      username="Yanthems"
      :size="100"      
      src="/static/avatar.gif">
      </avatar>
        </a>
      </div>
      <div id="nav-descrip">
      <p>Yanthems</p>
      <p>anime,coder,gamer</p>
      </div>
      <!-- <Twitter
      title_social="Twitter"
      :page_title="title"
      has_counter
      has_icon
      ></Twitter> -->
      
      <!-- <a href="https://twitter.com/dongshimou">
        <i class="pserson"></i>
     </a> -->
  <div id="nav-links" class="flexRowBox quickLink">
      <a href="https://twitter.com/yanthems1" target="_blank">
      <i class="fa fa-twitter"></i> Twitter</a>
      <a href="https://weibo.com/WhyYouSoSad" target="_blank">
      <i class="fa fa-weibo"></i> Weibo</a>
      <a href="https://github.com/yanthems" target="_blank">
      <i class="fa fa-github"></i> Github</a>
      <a href="https://steamcommunity.com/id/yanthems" target="_blank">
      <i class="fa fa-steam-square"></i> Steam</a>
  </div>
    <div id="nav-tags">
    <tags-ball :style="{'background-color':'#eeeeee'}" :tags="tags"/>
    </div>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
// import VueGoodshareTwitter from "vue-goodshare/src/providers/Twitter";
import TagsBall from "@/components/tags_ball";
import GlobalData from "@/components/global";

export default {
  components: {
    Avatar,
    // Twitter: VueGoodshareTwitter,
    "tags-ball": TagsBall
  },
  data() {
    return {
      title: "我喜欢这个!",
      tags: []
    };
  },
  methods: {
    stop_it: function() {
      this.stop = !this.stop;
      console.log("status=", this.stop);
    },
    fetch_tags: function() {
      let address = GlobalData.inter + "/tags";
      this.$http.get(address).then(
        res => {
          if (res.body.code == 1000) {
            let data = res.body.data;
            this.tags = data.names;
          }
        },
        res => {
          console.log(res.body);
        }
      );
    }
  },
  computed: {},
  mounted() {
    this.fetch_tags();
  }
};
</script>

<style>
</style>
<style scoped>
#nav-links{
  margin-top:15px;
}
#nav-links i{
  font-size:32px;
}
.quickLink{
  width:200px;
}
.quickLink a{
  width: 50px;
  color:#000;
}
.quickLink a:visited{
  color:#000;
}
.quickLink a:hover{
  color:#66ccff;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 480px) {
  #nav-descrip{
    display: none;
  }
  #nav-tags{
    display: none;
  }
}
@media screen and (min-width: 480px) and (max-width: 720px) {
  #nav-avatar{
  }
  #nav-tags{
    display: none;
  }
}
@media screen and (min-width: 720px) and (max-width: 960px) {
  #nav-tags{
    display: none;
  }
}
</style>
