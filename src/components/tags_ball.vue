<template>
  <canvas id="tags_ball">
  这里是用来测试canvas的
</canvas>
</template>

<style scoped>
#tags_ball {
  width: 300px;
  height: 300px;

  background-color: black;
  /* margin-top: 3vh; */
}
</style>

<script>
export default {
  name: "tags-ball",

  methods: {
    create_ball: function() {
      let canvas = this.$el;
      let ctx = canvas.getContext("2d");

      // ctx.font = "48px serif";
      // let t=ctx.measureText("测试")

      // ctx.fillText("测试",vpx-t.width/2,vpy)

      // ctx.strokeText("测试",vpx-t.width/2,vpy)

      let tags = [
        "c++",
        "golang",
        "network",
        "golang",
        "gopost",
        "halo",
        "HS256",
        "javascript",
        "jwt",
        "markdown",
        "npm",
        "opengl",
        "proxy",
        "qss",
        "qt",
        "shader",
        "shadowsock",
        "sort",
        "token",
                "c++",
        "golang",
        "network",
        "golang",
        "gopost",
        "halo",
        "HS256",
        "javascript",
        "jwt",
        "markdown",
        "npm",
        "opengl",
        "proxy",
        "qss",
        "qt",
        "shader",
        "shadowsock",
        "sort",
        "token",
      ];
      // 
      let count = Math.floor(Math.sqrt(tags.length));
      let circles = [];
      let Radis = 100;
      let angleX = Math.PI / 100;
      let angleY = Math.PI / 100;
      // let col= 360 / count
      // let row= 360 / count
      let col = count;
      let row = count;

      let vpx = canvas.width / 2;
      let vpy = canvas.height / 2;

      this.$el.addEventListener("mousemove", function(event) {
        let x = event.clientX - canvas.offsetLeft - vpx;
        let y = event.clientY - canvas.offsetTop - vpy;

        console.log(event.clientX,canvas.offsetLeft)
        console.log("Y",event.clientY-canvas.offsetTop)
        angleY = -x * 0.0001;
        angleX = -y * 0.0001;

        // console.log(x, y);
      });

      let circle = function(x, y, z, r,index) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
        this.width = 2 * r;
        this.index=index
      };
      circle.prototype = {
        paint: function() {
          let fl = 500;
          ctx.save();
          let alpha = (this.z + Radis) / (2 * Radis);

          ctx.fillStyle = "rgba(123,187,255," + (alpha + 0.5) + ")";

          // ctx.beginPath();
          // let scale = fl / (fl - this.z);
          // ctx.arc(
          //   vpx + this.x,
          //   vpy + this.y,
          //   this.r * scale,
          //   0,
          //   Math.PI * 2,
          //   true
          // );
          // ctx.fill();
          ctx.font = "32px monaco";
          let t=ctx.measureText(tags[this.index])
          ctx.fillText(tags[this.index], vpx + this.x-t.width/2, vpy + this.y);
          ctx.restore();
        }
      };

      let layer = function(num, up,index) {
        this.radius = Math.sqrt(
          Math.pow(Radis, 2) -
            Math.pow(Radis * Math.cos(num * Math.PI * 2 / row), 2)
        );
        this.index=index
        this.x = 0;
        this.y = 0;
        this.up = up;
      };

      layer.prototype = {
        setBalls: function(radius) {
          for (let i = 0; i < row; i++) {
            let angle = 2 * Math.PI / row * i;
            let b = new circle(
              radius * Math.cos(angle),
              radius * Math.sin(angle),
              this.up * Math.sqrt(Math.pow(Radis, 2) - Math.pow(radius, 2)),
              1.5,
              this.index*col+i
            );
            b.paint();
            circles.push(b);
          }
        },
        draw: function() {
          ctx.beginPath();
          ctx.arc(vpx, vpy, this.radius, 0, 2 * Math.PI, true);
          ctx.strokeStyle = "#FFF";
          ctx.stroke();
          this.setBalls(this.radius);
        }
      };
      function rotateX() {
        var cos = Math.cos(angleX);
        var sin = Math.sin(angleX);
        for (var i = 0; i < circles.length; i++) {
          var y1 = circles[i].y * cos - circles[i].z * sin;
          var z1 = circles[i].z * cos + circles[i].y * sin;
          circles[i].y = y1;
          circles[i].z = z1;
        }
      }

      function rotateY() {
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);
        for (var i = 0; i < circles.length; i++) {
          var x1 = circles[i].x * cos - circles[i].z * sin;
          var z1 = circles[i].z * cos + circles[i].x * sin;
          circles[i].x = x1;
          circles[i].z = z1;
        }
      }

      function rotateZ() {
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);
        for (var i = 0; i < circles.length; i++) {
          var x1 = circles[i].x * cos - circles[i].y * sin;
          var y1 = circles[i].y * cos + circles[i].x * sin;
          circles[i].x = x1;
          circles[i].y = y1;
        }
      }
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rotateX();
        rotateY();
        rotateZ();
        for (var i = 0; i < circles.length; i++) {
          circles[i].paint();
        }
        // console.log("tick");
        requestAnimationFrame(animate);
      }

      let Animation = function() {
        this.init();
      };

      Animation.prototype = {
        isrunning: false,
        init: function() {
          var num = col / 2;
          for (var i = 0; i <= num; i++) {
            var l = new layer(i, 1,i*2);
            l.draw();
            var l = new layer(i, -1,i*2+1);
            l.draw();
          }
        },

        start: function() {
          this.isrunning = true;
          animate();
        },
        stop: function() {
          this.isrunning = false;
        }
      };

      let animation = new Animation();
      animation.start();
    }
  },

  mounted: function() {
    this.create_ball();
  }
};
</script>
