<template>
  <canvas :width="width" :height="height" id="tags_ball">
  这里是用来测试canvas的
</canvas>
</template>

<style scoped>
#tags_ball {
  background-color: #dddddd;
  /* margin-top: 3vh; */
  border-radius: 20px;
  /* border: 2px solid #8AC007; */
  border: 2px solid #bc8f8f;
}
</style>

<script>
let Animation = function() {
  this.running = true;
};
Animation.prototype = {
  stop: function() {},
  start: function() {}
};
export default {
  name: "tags-ball",
  data() {
    return {
      animation: new Animation()
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
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    radius: {
      type: Number,
      default: 100
    },
    font: {
      type: String,
      default: "24px monaco"
    }
  },
  methods: {
    init_ball: function() {
      let canvas = this.$el;
      let tags = this.tags;
      let Radius = this.radius;
      let ctx = canvas.getContext("2d");
      ctx.font = this.font;

      let angleX = Math.PI / 100 / 2;
      let angleY = Math.PI / 100 / 2;

      let vpx = canvas.width / 2;
      let vpy = canvas.height / 2;

      let count = tags.length;
      if (count == 0) {
        return;
      }
      this.$el.addEventListener("mousemove", function(event) {
        let x = event.layerX - vpx;
        let y = event.layerY - vpy;
        // console.log("x y =",x,y)
        angleY = -x * 0.0001;
        angleX = -y * 0.0001;
      });

      let points = [];
      let ve3 = function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
      };
      function create() {
        // let R2 = Math.pow(Radius, 2);
        // let lati = Radius * 4 / Math.sqrt(count);
        // let la2 = Math.pow(lati, 2);
        //角度
        // let latitude = Math.acos(Math.sqrt(1 - 8.0 / count));
        let alpha = Math.sqrt(1 - 8.0 / (count + 5));
        function getm(a) {
          return Math.sqrt(
            Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2)
          );
        }

        function getv3cos(a, b) {
          let t1 = a.x * b.x + a.y * b.y + a.z * b.z;

          let t2 = getm(a) * getm(b);
          return t1 / t2;
        }

        function general() {
          let p = new ve3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
          );
          let pm = getm(p);
          p.x = p.x * (Radius / pm);
          p.y = p.y * (Radius / pm);
          p.z = p.z * (Radius / pm);
          return p;
        }
        let template = [];
        template.push(new ve3(Radius, 0, 0));
        template.push(new ve3(-Radius, 0, 0));
        template.push(new ve3(0, Radius, 0));
        template.push(new ve3(0, -Radius, 0));
        template.push(new ve3(0, 0, Radius));
        template.push(new ve3(0, 0, -Radius));
        if (count <= 6) {
          for (let i = 0; i < count; i++) {
            points.push(template[i]);
          }
        } else {
          for (; points.length < count; ) {
            let v = general();
            if (points.length == 0) {
              points.push(v);
            }
            let success = true;
            for (let i = 0; i < points.length; i++) {
              if (getv3cos(v, points[i]) > alpha) {
                success = false;
                break;
              }
            }
            if (success) {
              points.push(v);
            }
          }
        }
      }
      create();

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
          let alpha = (this.z + Radius) / (2 * Radius);
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

      function rotateX() {
        let cos = Math.cos(angleX);
        let sin = Math.sin(angleX);
        for (let i = 0; i < circles.length; i++) {
          let y1 = circles[i].y * cos - circles[i].z * sin;
          let z1 = circles[i].z * cos + circles[i].y * sin;
          circles[i].y = y1;
          circles[i].z = z1;
        }
      }

      function rotateY() {
        let cos = Math.cos(angleY);
        let sin = Math.sin(angleY);
        for (let i = 0; i < circles.length; i++) {
          let x1 = circles[i].x * cos - circles[i].z * sin;
          let z1 = circles[i].z * cos + circles[i].x * sin;
          circles[i].x = x1;
          circles[i].z = z1;
        }
      }

      function rotateZ() {
        let cos = Math.cos(angleY);
        let sin = Math.sin(angleY);
        for (let i = 0; i < circles.length; i++) {
          let x1 = circles[i].x * cos - circles[i].y * sin;
          let y1 = circles[i].y * cos + circles[i].x * sin;
          circles[i].x = x1;
          circles[i].y = y1;
        }
      }

      let init = function() {
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
      };
      init();

      let animation = this.animation;
      let animate = function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rotateX();
        rotateY();
        rotateZ();
        for (let i = 0; i < circles.length; i++) {
          circles[i].paint();
        }
        if (animation.running) {
          requestAnimationFrame(animate);
        }
      };

      this.animation.start = function() {
        animation.running = true;
        animate();
      };
      this.animation.stop = function() {
        animation.running = false;
      };
      this.animation.start();
    }
  },

  mounted: function() {
    this.init_ball();
  },
  computed: {
    // tags:function(){
    // }
  },
  watch: {
    tags: function(t) {
      this.init_ball();
    },
    stop: function(t) {
      if (t) {
        this.animation.stop();
      } else {
        this.animation.start();
      }
    }
  }
};
</script>
