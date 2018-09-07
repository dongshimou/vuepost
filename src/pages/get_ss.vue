<template>
    <div class="flexColBox servers">
        <ul v-for="s of servers" :id="s.host">
            <single-ss :host="s.host"/>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.servers {
  // justify-content: flex-start;
  width: 320px;
}
</style>


<script>
import SingleSS from "@/components/single_ss";
import Global from "@/components/global";
export default {
  data() {
    return {
      servers: []
    };
  },
  components: {
    Global,
    "single-ss": SingleSS
  },
  methods: {
    fetchData: function() {
      let address = Global.ss1 + "/admin/server/query";
      console.log(address);
      this.$http
        .get(address, {
          params: {
            // channels:1
          }
        })
        .then(
          res => {
            if (res.body.code == 1000) {
              this.servers = res.body.data.list;
              // console.log(this.servers)
            } else {
              this.$noty.error(res.body.msg);
            }
          },
          res => {
            this.$noty.error(res.statusText);
          }
        );
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
