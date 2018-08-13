<template>
  <div class="group">
      <input type="text" required v-model="value" :class='{"read-only": readOnly}' >
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>{{title}}</label>
    </div>
</template>
<style scoped>
input.read-only {
  cursor: default;
}
input.read-only ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264ae;
}
</style>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  props: {
    title: {
      type: String
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    setValue: {
      type: String,
      default: ""
    }
  },
  methods: {
    // renders:function(){
    //     console.log(this.$el.firstChild.textContent)
    // },
    init_read_only: function() {
      if (this.readOnly) {
        this.$el.firstChild.setAttribute("disabled", "disabled");
      } else {
        this.$el.firstChild.removeAttribute("disabled");
      }
    }
  },
  watch: {
    value: function() {
      this.$emit("value", this.value);
    },
    setValue: function(o) {
      this.value = o;
    }
  },
  mounted() {
    this.init_read_only();
  }
};
</script>

<style>
</style>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 50px;
}
h2 small {
  font-weight: normal;
  color: #888;
  display: block;
}
/* form starting stylings ------------------------------- */
.group {
  position: relative;
  margin-bottom: 45px;
}
input {
  font-size: 18px;
  padding: 10px 0px 10px 0px;
  display: block;
  width: 100%;
  border: none;
}
input:focus {
  outline: none;
}

/* LABEL ======================================= */
label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

/* active state */
input:valid ~ label,
input:focus ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264ae;
}

/* BOTTOM BARS ================================= */
.bar {
  position: relative;
  display: block;
  width: 100%;
  border: none;
  height: 1px;
  background-color: #757575;
}
.bar:before,
.bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #5264ae;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
@-moz-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
@keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
</style>
