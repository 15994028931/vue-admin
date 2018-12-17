<template >
    <div class="dialog">
        <el-dialog :title="dialog.title"
                   :visible.sync="dialog.show"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :modal-append-to-body="false"

        >
            <el-form label-width="80px" :model="addArticle" ref="addArticle" :rules="articleRule" status-icon>
                <el-form-item label="标题" prop="title">
                    <el-input autocomplete="off" v-model="addArticle.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input autocomplete="off" v-model="addArticle.content"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input autocomplete="off" v-model="addArticle.author"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input autocomplete="off" v-model="addArticle.remark"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select placeholder="文章类型" v-model="addArticle.type">
                        <el-option label="原创" value="original"></el-option>
                        <el-option label="借鉴" value="example-by"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="addArt('addArticle')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: "dialog",
  props: {
    dialog: {
      type: Object
    },
    addArticle: {
      type: Object
    }
  },
  data() {
    return {
      articleRule: {
        title: [
          {
            required: true,
            trigger: "blur",
            message: "标题不能为空"
          },
          {
            min: 1,
            max: 60,
            message: "标题太长"
          }
        ],
        content: [
          {
            required: true,
            trigger: "blur",
            message: "内容不能为空"
          }
        ],
        author: [
          {
            required: true,
            trigger: "blur",
            message: "作者不能为空"
          },
          {
            min: 1,
            max: 60,
            message: "用户名太长"
          }
        ],
        type: [
          {
            required: true,
            trigger: "blur",
            message: "类型不能为空"
          }
        ]
      }
    };
  },
  methods: {
    addArt(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const flag =
            this.dialog.option === "add" ? "add" : `edit/${this.addArticle.id}`;
          this.$axios
            .post(`/api/profile/${flag}`, this.addArticle)
            .then(() => {
              if (flag === "add") {
                this.$message({
                  type: "success",
                  message: "添加博客成功"
                });
              } else {
                this.$message({
                  type: "success",
                  message: "信息修改成功"
                });
              }

              this.$emit("updated");
            })
            .catch(e => console.log(e));
          this.dialog.show = false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
