<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
import jwt_decode from "jwt-decode";
import { isEmpty } from "./common/js/util";
export default {
  name: "app",
  created() {
    if (localStorage.eleToken) {
      const decode = jwt_decode(localStorage.eleToken);
      this.$store.dispatch("setAuthenticated", !isEmpty(decode));
      this.$store.dispatch("setUser", decode);
    }
  },
  methods: {}
};
</script>
<style lang="stylus" scoped>
    #app
        width 100%
        height 100%
        overflow hidden
        font-family 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
</style>
