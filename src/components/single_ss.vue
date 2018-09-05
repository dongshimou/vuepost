<template>
<div class="flexColBox">
    <div id="server" class="flexColBox" :class="server.is_online ? online:offline">
        <div id="channels">
            <!-- <ul v-for="cc in channelStatus" :class="cc.status" @click="getChan(cc)" @mouseover="getMsg(cc)"></ul> -->
             <!-- v-tooltip="{ content: msg }" -->

            <v-popover
            offset="16"
            v-for="cc in channelStatus"  :class="cc.status" 
            :disabled="!(cc.status=='exist')"
            :key="cc.id"
            
            >
            <div class="chan-btn" @click="getChan(cc)"></div>
            <template slot="popover">
                <div class="flexRowBox flexRowBoxLeft"><p>地址:</p><p>{{chan.host}}</p></div>
                <div class="flexRowBox flexRowBoxLeft"><p>端口:</p><p>{{chan.port}}</p></div>
                <div class="flexRowBox flexRowBoxLeft"><p>加密:</p><p>{{chan.method}}</p></div>
                <div class="flexRowBox flexRowBoxLeft"><p>密码:</p><p>{{chan.password}}</p></div>
                <!-- <a v-close-popover>Close</a> -->
            </template>
            </v-popover>

        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      offline: "Offline",
      online: "Online",
      channelStatus: [],
      chan: {}
    };
  },
  props: {
    server: Object
  },
  methods: {
    getChan: function(cc) {
      console.log(cc.chan);
      let index = Math.floor(Math.random() * cc.chan.length);
      //   console.log(index);
      //   console.log(cc.chan[index]);
      this.chan = cc.chan[index];
      console.log(this.chan);
    },
    getMsg: function(cc) {}
  },
  mounted() {
    let channels = this.server.channels;
    let max = this.server.max;
    let host = this.server.host;
    let method = this.server.method;

    let len = channels.length;
    let scale = 10.0 / max;
    let Fscale = max / 10.0;
    let sl = Math.ceil(scale * len);
    console.log(scale, sl);
    for (let i = 0; i < 10; i++) {
      let temp = {
        status: "",
        id: i,
        chan: []
      };
      if (i < sl) {
        temp.status = "exist";
      } else {
        temp.status = "not";
      }
      let l = i * Fscale;
      let r = l + Fscale;
      for (let j = l; j < r; j++) {
        if (channels[j]) {
          let tc = channels[j];
          tc["host"] = host;
          tc["method"] = method;
          temp.chan.push(tc);
        }
      }
      this.channelStatus.push(temp);
    }
  }
};
</script>
<style lang="scss">
.tooltip {
  // ...
  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }
}
</style>

<style lang="scss">
$acolor: rgba(0, 200, 0, 0.4);
$dcolor: rgba(200, 0, 0, 0.4);
$more: rgba(0, 0, 0, 0.5);
#server {
  margin: auto;
  width: 80%;
  height: 10vh;
  position: relative;
  &.Online {
    background-color: rgba(160, 160, 160, 0.3);
    #channels {
      *.not {
        background-color: transparent;
      }
      *.exist {
        background-color: $acolor;
        .chan-btn {
          &:hover {
            background-color: #fff;
          }
        }
      }
    }
  }
  &.Offline {
    background-color: rgba(160, 160, 160, 0.8);
    #channels {
       *.exist {
        background-color: $dcolor;
        .chan-btn {
          &:hover {
            background-color: #ddd;
          }
        }
      }
    }
  }
  #channels {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    *:focus {
        outline: none;
      }
    > * {
      width: 8%;
      margin: auto;
      height: 9vh;
    }

    div > span {
      width: 100%;
      height: 100%;
    }
    *.chan-btn {
      border-radius: 20%;
      width: 100%;
      height: 100%;
    }
    *.exist {
      border-radius: 20%;
    }
  }
}
</style>




