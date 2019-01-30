<template >
  <div id="mood-box" class="flexColBox">
    <label id="mood-context" class="flexRowBoxLeft" v-for="mood in moods">{{mood.context}}
        <div class="flexColBox">
        <label id="mood-time" class="flexRowBoxRight">
            {{moment(mood.CreatedAt).fromNow()}}
            </label>
        </div>
    </label>
  </div>
</template>

<script>
import Global from "@/components/global";

export default {
  components: {
    Global
  },
  data() {
    return {};
  },
    props: {
    moods: {
      type: Array,
      default: []
    }
    },
    methods:{
        init_mood:function(){

        }
    },
    mounted:function(){
        this.init_mood()
    }
};
</script>

<style scoped>
#mood-context {
    margin-top: 10px;
    padding-top: 5px;
    padding-left: 10px;
    box-shadow: 0px 2px 2px 2px #ccc;
    word-wrap:break-word; 
}
#mood-box{
    margin-top:2vh;
    /* max-width: 200px; */
}
#mood-time{
      color: #ff7e7ef0;
}
</style>
