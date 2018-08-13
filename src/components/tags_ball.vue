<template>
  <canvas id="tags_ball">
  这里是用来测试canvas的
</canvas>
</template>

<style scoped>
#tags_ball {
  width: 200px;
  height: 200px;

  background-color: aqua;
  margin-top: 3vh;
}
</style>

<script>
export default {
  name: "tags-ball",

  methods:{
    create_ball:function(){
      let canvas=this.$el
      let ctx = canvas.getContext("2d");
      

      let vpx = canvas.width/2
      let vpy = canvas.height/2

      ctx.font = "48px serif";
      let t=ctx.measureText("测试")

      ctx.fillText("测试",vpx-t.width/2,vpy)

      let tags=["1","1","1","1","1","1","1","1","1","1","1","1","2",
      "2","2","2","2","2","2","2","2","2","3","3","3","3","3",
      "3","3","3","3","3","3","3","3","3","3","3","3","3","3",]
      let count=Math.floor(Math.sqrt(tags.length))

      let ball={
        radis:100,
        angleX : Math.PI/100,
        angleY : Math.PI/100,
        col:360/count,
        row:360/count,
      }

      this.$el.addEventListener("mousemove",function(event){
        let x = event.clientX - canvas.offsetLeft - vpx;
        let y = event.clientY - canvas.offsetTop - vpy;

        ball.angleY = -x*0.0001;
        ball.angleX = -y*0.0001;

        console.log(ball.angleX,ball.angleY)

      })




    }
  },

  mounted:function() {
    this.create_ball()
  }
}
</script>
