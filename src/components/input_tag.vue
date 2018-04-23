
<template>
  <div @click="focusNewTag()" :class="{'read-only': readOnly}" class="vue-input-tag-wrapper group">
    <span v-for="(tag, index) in innerTags" :key="index" class="input-tag">
      <span >{{ tag }}</span>
      <a v-if="!readOnly" @click.prevent.stop="remove(index)" class="remove"></a>
    </span>
    <input id="input" required
      ref                      = "inputtag"
      :placeholder             = "placeholder"
      type                     = "text"
      v-model                  = "newTag"
      v-on:keydown.delete.stop = "removeLastTag"
      v-on:keydown             = "addNew"
      v-on:blur                = "addNew"
      class                    = "new-tag"
    />
      <span class="highlight"></span>
      <span class="bar"></span>
    <label :class="{'read-only': readOnly}">{{title}}</label>
  </div>
</template>

<script>
/*eslint-disable*/
const validators = {
  email: new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
  url: new RegExp(
    /^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i
  ),
  text: new RegExp(/^[a-zA-Z]+$/),
  digits: new RegExp(/^[\d() \.\:\-\+#]+$/),
  isodate: new RegExp(
    /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
  )
};
/*eslint-enable*/

export default {
  props: {
    title: {
      type: String,
      default: "tags"
    },
    tags: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ""
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    validate: {
      type: String | Object,
      default: ""
    },
    addTagOnKeys: {
      type: Array,
      default: function() {
        return [
          13, // Return
          188, // Comma ','
          9 // Tab
        ];
      }
    },
    addTagOnBlur: {
      type: Boolean,
      default: false
    },
    limit: {
      default: -1
    }
  },

  data() {
    return {
      newTag: "",
      isrequired:"required",
      isshow:true,
      innerTags: [...this.tags]
    };
  },

  watch: {
    tags() {
      this.innerTags = [...this.tags];
      let inputbox=this.$el.querySelector("#input")
      if(this.innerTags.length!=0){
        inputbox.removeAttribute("required")
      }else{
        if (inputbox!=null){
        inputbox.setAttribute("required","required")
        }
      }
       if (this.readOnly||this.isLimit){
         inputbox.style.display="none"
       }else{
         inputbox.style.display=""
       }
    }
  },

  computed: {
    isLimit: function() {
      return this.limit > 0 && Number(this.limit) === this.innerTags.length;
    }
  },
  mounted(){
    console.log(this.tags)
  },
  methods: {
    focusNewTag() {
      if (this.readOnly || !this.$el.querySelector(".new-tag")) {
        return;
      }
      this.$el.querySelector(".new-tag").focus();
    },

    addNew(e) {
      // Do nothing if the current key code is
      // not within those defined within the addTagOnKeys prop array.
      if (
        (e &&
          this.addTagOnKeys.indexOf(e.keyCode) === -1 &&
          (e.type !== "blur" || !this.addTagOnBlur)) ||
        this.isLimit
      ) {
        return;
      }

      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }

      if (
        this.newTag &&
        this.innerTags.indexOf(this.newTag) === -1 &&
        this.validateIfNeeded(this.newTag)
      ) {
        this.innerTags.push(this.newTag);
        this.newTag = "";
        this.tagChange();
      }
    },

    validateIfNeeded(tagValue) {
      if (this.validate === "" || this.validate === undefined) {
        return true;
      } else if (
        typeof this.validate === "string" &&
        Object.keys(validators).indexOf(this.validate) > -1
      ) {
        return validators[this.validate].test(tagValue);
      } else if (
        typeof this.validate === "object" &&
        this.validate.test !== undefined
      ) {
        return this.validate.test(tagValue);
      }
      return true;
    },

    remove(index) {
      this.innerTags.splice(index, 1);
      this.tagChange();
    },

    removeLastTag() {
      if (this.newTag) {
        return;
      }
      this.innerTags.pop();
      this.tagChange();
    },

    tagChange() {
      this.$emit("update:tags", this.innerTags);
    }
  }
};
</script>



<style scoped>
/* .vue-input-tag-wrapper {
  background-color: #fff;
  border: 0px solid #ccc;
  overflow: hidden;
  padding-left: 4px;
  padding-top: 4px;
  cursor: text;
  text-align: left;
  -webkit-appearance: textfield;
  display: flex;
  flex-wrap: wrap;
} */
label.read-only{
  top:-30px;
}
.group {
  position: relative;
  margin-bottom: 40px;
  text-align: left;
}


.vue-input-tag-wrapper .input-tag {
  background-color: #373a3a;
  border-radius: 2px;
  border: 1px solid #09a8e7;
  color: #86b9e2;
  display: inline-block;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 4px;
  margin-right: 4px;
  padding: 3px;
}

.vue-input-tag-wrapper .input-tag .remove {
  cursor: pointer;
  font-weight: bold;
  color: #638421;
}

.vue-input-tag-wrapper .input-tag .remove:hover {
  text-decoration: none;
}

.vue-input-tag-wrapper .input-tag .remove::before {
  content: "X";
  /* fa fa-times */
  margin-left: 10px;
  color: rgb(255, 255, 255);
}

.vue-input-tag-wrapper .new-tag {
  background: transparent;
  border: 0;
  color: #777;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 6px;
  margin-top: 1px;
  outline: none;
  padding: 4px;
  padding-left: 0;
  flex-grow: 1;
}
input {
  /* font-size: 18px; */
  /* padding: 10px 0px 10px 0px; */
  /* display: block; */
  /* width: 100%; */
  /* border: none; */
}
input:focus {
  outline: none;
}

.vue-input-tag-wrapper.read-only {
  cursor: default;
}

h2 {
  text-align: center;
  margin-bottom: 50px;
}
h2 small {
  font-weight: normal;
  color: #888;
  display: block;
}

/* LABEL ======================================= */
label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  /* top: 10px; */
  top:0px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

/* active state */
input:focus ~ label,
input:valid ~ label {
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
