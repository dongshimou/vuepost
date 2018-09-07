<template>
<div class="flexRowBox flexRowBoxLeft server-container">
    <div id="server" class="flexRowBox" :class="server.is_online ? online:offline">
      <div class="flexRowBox channels-container">
        <div id="channels">
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

    <div class="channels-add flexColBox">
        <button @click="addServer" :disabled='!server.is_online'>
          生成
        </button>
    </div>
</div>
</template>

<script>
import Global from "@/components/global";

export default {
  components: {
    Global
  },
  data() {
    return {
      server: {},
      offline: "Offline",
      online: "Online",
      enable: "",
      disable: "Disable",
      channelStatus: [],
      chan: {}
    };
  },
  props: {
    host: String
  },
  methods: {
    getChan: function(cc) {
      if (cc.chan.length == 0) {
        return;
      }
      let index = Math.floor(Math.random() * cc.chan.length);
      this.chan = cc.chan[index];
      // console.log(this.chan)
    },
    addServer: function() {
      let address = Global.ss1 + "/admin/ss/add";
      this.$http
        .get(address, {
          params: {
            host: this.host
          }
        })
        .then(
          res => {
            if (res.body.code == 1000) {
              let data = res.body.data;
              let temp = {
                host: data.host,
                port: data.port,
                method: data.method,
                password: data.password,
                flow_count: data.flow_count,
                dead_time: data.dead_time
              };
              console.log(this.server.channels);
              this.server.channels.push(temp);
              this.initServer();
              console.log("success");
              this.$noty.success("["+this.host+"]:生成成功");
            } else {
              this.$noty.error(res.body.msg);
            }
          },
          res => {
            this.$noty.error(res.statusText);
          }
        );
    },
    fetchServer: function() {
      // console.log(this.host)
      let address = Global.ss1 + "/admin/server/query";
      this.$http
        .get(address, {
          params: {
            channels: 1,
            host: this.host
          }
        })
        .then(
          res => {
            if (res.body.code == 1000) {
              let data = res.body.data;
              // console.log(data.list)
              if (data.list == null) {
                this.$noty.error("server : [" + this.host + "] is null");
                return;
              }
              if (data.list.length != 1) {
                this.$noty.error("Get Server Error");
                return;
              }
              this.server = data.list[0];
              this.initServer();
            }
          },
          res => {
            // console.log(res.statusText)
            this.$noty.error(res.statusText);
          }
        );
    },
    initServer: function() {
      let channels = this.server.channels;
      let max = this.server.max;
      let host = this.server.host;
      let method = this.server.method;
      this.channelStatus = [];

      
      let clen = channels.length;
      let scale = 10.0 / max;
      let Fscale = max / 10.0;
      let sl = Math.ceil(scale * clen);
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
  },
  mounted() {
    this.fetchServer();
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
$height: 100px;
$serverWidth: 200px;
$buttonWidth: 100px;

$aDark:rgba(160, 160, 160, 0.3);
$dDark:rgba(160, 160, 160, 0.8);
$myLove:#66ccff;
.server-container {
  width: $serverWidth + $buttonWidth;
}
.channels-container {
  width: 100%;
}
.channels-add {
  width: $buttonWidth;
  button {
    margin: 20%;
    height: 30%;
    border-radius: 5px;
    outline: none;
    border: 1px solid $myLove;
    background-color:rgba($myLove,0.2);
    &:focus{
      background-color: #fff;
    }
    &:hover{
      background-color:rgba($myLove,0.5);
    }
    &:active  {
      background-color: $myLove;
    }
    &:disabled{
      cursor: not-allowed;
       background-color:$aDark;
    }
  }
}
#server {
  margin: auto;
  height: $height;
  width: $serverWidth;
  position: relative;
  &.Online {
    background-color: $aDark;
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
    background-color: $dDark;
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
    width: 100%;
    *:focus {
      outline: none;
    }
    > * {
      width: 8%;
      margin: auto;
      height: $height;
    }

    div > span {
      width: 100%;
      height: 100%;
    }
    *.chan-btn {
      border-radius: 20px;
      width: 100%;
      height: 100%;
    }
    *.exist {
      border-radius: 20px;
    }
  }
}
</style>




