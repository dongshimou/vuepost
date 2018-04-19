<template>
  <div id="app" class="flexRowBox">
    <!-- <img src="./assets/logo.png"> -->
    <div id="home-nav" class="flexRowBox flexRowCenter">
    <home-nav/>
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
  }
};
</script>

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
</style>

<style lang="scss" scoped>
#home-nav {
  @media (max-width: 200px) {
    width: 100%;
    margin: auto;
  }
  @media (min-width: 200px) {
    width: 200px;
    margin: 0;
  }
}
#home-context {
  @media (min-width: 400px) {
    width: 100%;
    margin: auto;
  }
  @media (min-width: 680px) {
    width: 600px;
    margin: auto;
  }
  @media (min-width: 720px) {
    width: 700px;
    margin: auto;
  }
  @media (min-width: 1280px) {
    width: 1000px;
    margin: auto;
  }
}
</style>
