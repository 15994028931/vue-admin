<template>
    <div class="bg-wrap">
        <div class="form-wrap">
            <el-form ref="form" :model="form" :rules="rule" status-icon label-width="80px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkpass">
                    <el-input type="password" v-model="form.checkpass"></el-input>
                </el-form-item>
                <el-form-item label="选择身份" prop="identity">
                    <el-select v-model="form.identity" placeholder="请选择身份">
                        <el-option label="管理员" value="manager"></el-option>
                        <el-option label="普通员工" value="employee"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">注册</el-button>
                    <el-button type="success"><router-link to="/login" tag="span">登陆</router-link></el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var checkPass = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        email: "",
        password: "",
        checkpass: "",
        identity: ""
      },
      rule: {
        name: [
          {
            required: true,
            trigger: "blur",
            message: "用户名不能为空"
          },
          {
            min: 3,
            max: 20,
            message: "用户名长度必须在3到20个字符"
          }
        ],
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
        ],
        checkpass: [
          {
            required: true,
            trigger: "blur",
            validator: checkPass
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
            .post(`${this.baseUrl}/api/user/register`, this.form)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  message: "注册成功",
                  type: "success"
                });
                this.$router.push("/login");
              }
            })
            .catch(err => console.log(err));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
