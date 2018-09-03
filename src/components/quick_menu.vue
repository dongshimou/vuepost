<template>
    <div class="quick-menu">
        <div v-if="isTop" @click="backTop" class="menu-item flexColBox">
            <div class="item-label" >顶部</div>
        </div>
        <div v-if="showHome" @click="backHome" class="menu-item flexColBox">
            <div class="item-label">首页</div>
        </div>
        <div @click="backLast" class="menu-item flexColBox">
             <div class="item-label">返回</div>
        </div>
    </div>
</template>
<script>
export default {
  name: "quick-menu",
  props: {
    // isTop:Boolean,
    // default:true
  },
  data() {
    return {
      isTop: false,
      isHome:true,
    };
  },
  methods: {
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
    setScrollHeight:function(){
        let ele = null;
        if(document.body){
            ele=document.body
        }else if (document.documentElement){
            ele=document.documentElement
        }
        ele.scrollIntoView(true);
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
      let now_scroll = this.getScrollTop();
      let v = this.getScrollTop() / this.getWindowHeight();
      if (v > 0.1) {
        this.isTop = true;
      } else {
        this.isTop = false;
      }
    },
    backTop:function(){
        this.setScrollHeight()
    },
    backLast:function(){
        this.$router.go(-1)
    },
    backHome:function(){
        this.$router.push({name:'articles'})
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollLoad);
  },
  computed:{
      showHome:function(){
          if(this.$route.name=="articles"){
                this.isHome=true
            }else{
                this.isHome=false
            }
          return this.isHome==false
      }
  }
};
</script>
<style scoped>
.quick-menu {
    z-index: 9999;
  position: fixed;
  bottom: 60px;
  right: 60px;
}
.menu-item {
  text-justify: auto;
  margin-top: 15px;
  width: 48px;
  height: 48px;
  color: #fff;
  background-color: rgba(204, 204, 204, 0.8);
  border-radius: 24px;
}
.menu-item:hover{
    color: #66ccff;
    background-color: rgba(255, 127, 80, 0.8);
}
.item-label {
}
</style>
