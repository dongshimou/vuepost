<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
  <div id="container">
    <router-view/>
  </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style lang="scss" scoped>
#container{
  @media (min-width:480px){
    width:100%;
    margin:auto;
  }
  @media (min-width:680px){
    width:600px;
    margin:auto;
  }
  @media (min-width:840px){
    width:720px;
    margin:auto;
  }
  @media (min-width:1280px){
    width: 1000px;
    margin:auto;
  }
}
</style>
