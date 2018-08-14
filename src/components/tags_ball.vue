<template>
  <canvas width="200" height="200" id="tags_ball">
  这里是用来测试canvas的
</canvas>
</template>

<style scoped>
#tags_ball {
  background-color: #dddddd;
  margin-top: 3vh;
  border-radius: 20px;
  /* border: 2px solid #8AC007; */
  border: 2px solid #bc8f8f;
}
</style>

<script>
let Animation = function() {
  this.isrunning = false;
};

Animation.prototype = {
  start: function() {
    this.isrunning = true;
    this.animate();
  },
  stop: function() {
    this.isrunning = false;
  },
  animate: function() {}
};

export default {
  name: "tags-ball",
  data() {
    return {
      animation: new Animation
    };
  },
  props: {
    stop: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Array,
      default: []
    }
  },
  methods: {
    init_ball: function() {
      let canvas = this.$el;
      let tags = this.tags;
      let ctx = canvas.getContext("2d");
      ctx.font = "32px monaco";

      let count = tags.length;
      let Radis = 100;
      let angleX = Math.PI / 100;
      let angleY = Math.PI / 100;

      let vpx = canvas.width / 2;
      let vpy = canvas.height / 2;

      this.$el.addEventListener("mousemove", function(event) {
        let x = event.layerX - vpx;
        let y = event.layerY - vpy;
        angleY = -x * 0.0001;
        angleX = -y * 0.0001;
      });

      let points = [];
      let ve3 = function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
      };

      points.push(new ve3(100, 0, 0));
      points.push(new ve3(-100, 0, 0));
      points.push(new ve3(0, 100, 0));
      points.push(new ve3(0, -100, 0));
      points.push(new ve3(0, 0, 100));
      points.push(new ve3(0, 0, -100));

      let circles = [];
      let circle = function(x, y, z, str, width, max) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.str = str;
        this.width = width;
        this.max = max;
      };

      circle.prototype = {
        paint: function() {
          ctx.save();
          let alpha = (this.z + Radis) / (2 * Radis);
          ctx.fillStyle = "rgba(255,132,87," + (alpha + 0.5) + ")";
          ctx.fillText(
            this.str,
            vpx + this.x - Math.min(this.max, this.width) / 2,
            vpy + this.y,
            this.max
          );
          ctx.restore();
        }
      };

      for (let i = 0; i < points.length; i++) {
        let t = ctx.measureText(tags[i]);
        circles.push(
          new circle(
            points[i].x,
            points[i].y,
            points[i].z,
            tags[i],
            t.width,
            60
          )
        );
      }

      function rotateX() {
        let cos = Math.cos(angleX);
        let sin = Math.sin(angleX);
        for (let i = 0; i < circles.length; i++) {
          let y1=circles[i].y * cos - circles[i].z * sin;
          let z1=circles[i].z * cos + circles[i].y * sin;
          circles[i].y = y1
          circles[i].z = z1
        }
      }

      function rotateY() {
        let cos = Math.cos(angleY);
        let sin = Math.sin(angleY);
        for (let i = 0; i < circles.length; i++) {
          let x1=circles[i].x * cos - circles[i].z * sin;
          let z1=circles[i].z * cos + circles[i].x * sin;
          circles[i].x = x1
          circles[i].z = z1
        }
      }

      function rotateZ() {
        let cos = Math.cos(angleY);
        let sin = Math.sin(angleY);
        for (let i = 0; i < circles.length; i++) {
          let x1=circles[i].x * cos - circles[i].y * sin;
          let y1=circles[i].y * cos + circles[i].x * sin;
          circles[i].x = x1
          circles[i].y = y1
        }
      }

      let temp = function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rotateX();
        rotateY();
        rotateZ();
        for (let i = 0; i < circles.length; i++) {
          circles[i].paint();
        }
        requestAnimationFrame(animate);
      };
      this.animation.animate = temp;
    }
  },

  mounted: function() {
    this.init_ball();
    this.animation.start();
  },
  computed: {
    // tags:function(){
    // }
  },
  watch: {
    tags: function(t) {
      this.init_ball();
      this.animation.start();
    },
    stop: function(s) {
      if (s) {
        this.animation.stop();
      } else {
        this.animation.start();
      }
    }
  }
};
</script>
