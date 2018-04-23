<template>
  <div id="app" class="flexRowBox">
    <!-- <router-nav/>     -->
    <div id="home-nav" class="flexRowBox">
      <div id="nav-fix">
    <home-nav />
      </div>
    </div>
    <div id="home-context">
      <router-view />
    </div>
  </div>
</template>

<script>
import HomeNav from "@/components/home_nav";

export default {
  name: "App",
  components: {
    "home-nav": HomeNav
  },
  props: {
    is_pin: Boolean,
    default: true
  },
  methods: {
    test: function() {
    }
  },
  mounted() {
    // window.addEventListener("resize", this.test);
  }
};
</script>
<style lang="scss">
@import './assets/animate.min.css';
@import url('./assets/icons.css');
</style>
<style>
.flexRowBox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.flexRowCenter {
  align-items: center;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /* background: url("/static/back.jpg"); */
}
ul {
  -webkit-padding-start: 0px;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 480px) and (max-width: 720px) {
  #home-nav {
    width: 100%;
    margin: 0;
  }
  #home-context {
    width: 100%;
    margin: 0;
  }
}
@media screen and (min-width: 720px) and (max-width: 960px) {
  #home-nav {
    width: 100%;
    margin: 0;
  }
  #home-context {
    width: 720px;
    margin: auto;
  }
}
@media screen and (min-width: 960px) and (max-width: 1280px) {
  #home-nav {
    width: 10%;
    margin: auto;
    margin-top: 0;
  }
  #nav-fix{
    position: fixed;
  }
  #home-context {
    width: 70%;
    margin: auto;
  }
}
@media screen and (min-width: 1280px) {
  #home-nav {
    width: 200px;
    margin: 0;
    margin-left: auto;
  }
  #nav-fix{
    position: fixed;
  }
  #home-context {
    width: 1000px;
    margin: auto;
  }
}
</style>
