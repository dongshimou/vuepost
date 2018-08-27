<template>
  <div >
      <div class="flexRowBox">
        <a href="https://github.com/yanthems">
      <avatar 
      username="Yanthems"
      :size="100"      
      src="/static/avatar.gif">
      </avatar>
        </a>
      </div>
      <p>Yanthems</p>
      <!-- <Twitter
      title_social="Twitter"
      :page_title="title"
      has_counter
      has_icon
      ></Twitter> -->
      
      <!-- <a href="https://twitter.com/dongshimou">
        <i class="pserson"></i>
     </a> -->
  <div class="flexRowBox quickLink">
      <a href="https://twitter.com/yanthems1" target="_blank">
      <i class="fa fa-fw fa-twitter"></i> Twitter</a>
      <a href="https://weibo.com/WhyYouSoSad" target="_blank">
      <i class="fa fa-weibo"></i> Weibo</a>
      <a href="https://github.com/yanthems" target="_blank">
      <i class="fa fa-github"></i> Github</a>
      <a href="https://steamcommunity.com/id/yanthems" target="_blank">
      <i class="fa fa-steam"></i> Steam</a>
  </div>
    <div>
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
