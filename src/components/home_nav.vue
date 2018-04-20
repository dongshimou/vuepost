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
      <Twitter
      title_social="Share"
      :page_title="title"
      has_counter
      has_icon
      ></Twitter>
      <a href="https://twitter.com/dongshimou">
    <i class="pserson"></i></a>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
import VueGoodshareTwitter from "vue-goodshare/src/providers/Twitter";
export default {
  components: {
    Avatar,
    Twitter: VueGoodshareTwitter
  },
  data() {
    return {
      title: "我喜欢这个!"
    };
  },
  computed: {
  },
  mounted() {
  }
};
</script>

<style>

</style>
<style scoped>

</style>
