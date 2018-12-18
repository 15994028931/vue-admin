<template>
    <div>
        <el-row class="container">
            <el-col :span="24" class="header">
                <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">{{collapsed?'':sysName}}</el-col>
                <el-col :span="10">
                    <div class="tools" @click.prevent="collapse">
                        <i class="el-icon-menu"></i>
                    </div>
                </el-col>
                <el-col :span="4" class="userinfo">
                    <el-dropdown @command="clickCommand" trigger="click">
                      <span class="el-dropdown-link userinfo-inner">
                        <img :src="user.avatar" alt="">{{user.name}}
                      </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="user-info">个人信息</el-dropdown-item>
                            <el-dropdown-item command="settings">设置</el-dropdown-item>
                            <el-dropdown-item command="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-col>
            <el-col :span="24" class="main">
                <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                    <!--导航菜单-->
                    <el-menu
                            default-active="0"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose">
                            <router-link v-for="nav in userInfo()" :to="nav.path" tag="div" :key="nav.index">
                                <el-submenu :index="nav.index">
                                    <template slot="title">
                                        <i :class="nav.icon"></i>
                                        <span>{{nav.title}}</span>
                                    </template>
                                </el-submenu>
                            </router-link>
                    </el-menu>
                </aside>
                <section class="content-container">
                    <div class="grid-content bg-purple-light">
                        <el-col :span="24" class="breadcrumb-container">
                            <strong class="title"></strong>
                            <el-breadcrumb separator="/" class="breadcrumb-inner">
                                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">

                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                        <el-col :span="24" class="content-wrapper">
                            <transition name="fade" mode="out-in">
                                <router-view></router-view>
                            </transition>
                        </el-col>
                    </div>
                </section>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { navMenu } from "../common/js/nav";
export default {
  name: "home",
  data() {
    return {
      sysName: "VUEADMIN",
      collapsed: false,
      Menu: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    clickCommand(command) {
      switch (command) {
        case "user-info":
          this.userInfo();
          break;
        case "settings":
          this.settings();
          break;
        case "logout":
          this.userLogout();
          break;
      }
    },

    userInfo() {
      this.Menu = navMenu;
      return this.Menu;
    },
    settings() {},
    userLogout() {
      localStorage.removeItem("eleToken");
      this.$store.dispatch("clearCurrentState");
      this.$router.push("/login");
    },
    collapse() {
      this.collapsed = !this.collapsed;
    },
    handleOpen() {},
    handleClose() {},
    handleSelect() {}
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../common/style/variable.styl"
    .container
        position absolute
        top 0
        bottom 0
        width 100%
        .header
            height 60px
            line-height 60px
            background $color-primary
            color #fff
            .userinfo
                text-align right
                padding-right 35px
                float right
                .userinfo-inner
                    cursor pointer
                    color #fff
                    img
                        width 40px
                        height 40px
                        border-radius 20px
                        margin 10px 0 10px 10px
                        float right

            .logo
                height 60px
                font-size 22px
                padding-left 20px
                padding-right 20px
                border-color rgba(238,241,146,.3)
                border-right-width 1px
                border-right-style solid
                img
                    width 40px
                    float left
                    margin 10px 10px 10px 18px
                .txt
                    color #fff

            .logo-width
                width 230px
            .logo-collapse-width
                width 60px
            .tools
                padding 0 23px
                width 14px
                height 60px
                line-height 60px
                cursor pointer
        .main
            display flex
            position absolute
            top 60px
            bottom 0
            overflow hidden
            aside
                flex 0 0 230px
                width 230px
                .el-menu
                    height 100%
                .collapsed
                    width 60px
                    .item
                        position relative
                    .submenu
                        position absolute
                        top 0
                        left 60px
                        z-index 9999
                        height auto
                        display none
            .menu-collapsed
                flex 0 0 60px
                width 60px
            .menu-expanded
                flex 0 0 230px
                width 230px
            .content-container
                flex 1
                overflow-y scroll
                padding 20px
                .breadcrump-container
                    .title
                        width 200px
                        float left
                        color: #475669
                    .breadcrump-inner
                        float right
                .content-wrapper
                    background #fff
                    box-sizing border-box

</style>
