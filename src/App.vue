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
    <quick-menu/>
  </div>
</template>

<script>
import HomeNav from "@/components/home_nav";
import QuickMenu from "@/components/quick_menu";

export default {
  name: "App",
  components: {
    "home-nav": HomeNav,
    "quick-menu":QuickMenu
  },
  methods: {
    test: function() {}
  },
  mounted() {
    // window.addEventListener("resize", this.test);
  }
};
</script>git
<style lang="scss">
// @import "@/assets/animate.min.css";
// @font-face {
//   font-family: "Material Icons";
//   font-style: normal;
//   font-weight: 400;
//   src: url(https://fonts.gstatic.com/s/materialicons/v36/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2)
//     format("woff2");
// }

// .material-icons {
//   font-family: "Material Icons";
//   font-weight: normal;
//   font-style: normal;
//   font-size: 24px;
//   line-height: 1;
//   letter-spacing: normal;
//   text-transform: none;
//   display: inline-block;
//   white-space: nowrap;
//   word-wrap: normal;
//   direction: ltr;
//   -webkit-font-feature-settings: "liga";
//   -webkit-font-smoothing: antialiased;
// }
</style>
<style>

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

