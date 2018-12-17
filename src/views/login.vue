<template>
    <div class="bg-wrap">
        <div class="form-wrap">
            <el-form ref="form" :model="form" :rules="rule" status-icon label-width="80px">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">登陆</el-button>
                    <el-button type="success">
                        <router-link to="/register" tag="span">注册</router-link>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "register",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      rule: {
        email: [
          {
            type: "email",
            required: true,
            trigger: "blur",
            message: "邮箱格式正确"
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "密码不能为空"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/user/login", this.form)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  message: "登陆成功",
                  type: "success"
                });
                const { token } = res.data;
                localStorage.setItem("eleToken", token);
                // 解析token
                const decode = jwt_decode(token);
                console.log(decode);
                // token存贮到vuex中
                this.$store.dispatch("setAuthenticated", !this.isEmpty(decode));
                this.$store.dispatch("setUser", decode);
                this.$router.push("/");
              }
            })
            .catch(err => console.log(err));
        } else {
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
    .bg-wrap
        width 100%
        height 100%
        background url("../assets/bg.jpg")
        background-size auto

        .form-wrap
            width 20%
            color #fff
            height auto
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
</style>
