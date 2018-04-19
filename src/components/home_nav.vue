<template>
  <div class="">
      <div class="flexRowBox">
      <avatar username="Jane Doe"
      src="/static/avatar.gif"></avatar>
      </div>
      <p>这是我</p>
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
import Avatar from 'vue-avatar'
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter'
export default {
components: {
    Avatar,
    "Twitter":VueGoodshareTwitter
  },
    data(){
        return{
            title:"我喜欢这个!"
        }
    },
  mounted(){
  }
}
</script>

<style>

</style>
<style scoped>



</style>
