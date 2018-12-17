<template>
    <section>
        <el-col :sapn="24" class="bg-gray" typeof="flex" justify="center">
            <el-form :inline="true">
                <el-form-item>
                    <el-date-picker
                            v-model="startTime"
                            type="date"
                            placeholder="开始日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                            v-model="endTime"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        label="标题"
                        width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="内容"
                        width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.content }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="作者"
                        width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.author }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="日期"
                        width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="点赞"
                        width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.start }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="是否原创"
                        width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.type }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="备注"
                        width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.remark }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-dialog title="添加" :visible.sync="dialogFormVisible">
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
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addArt('addArticle')">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
export default {
  name: "article-edit",
  data() {
    return {
      startTime: "",
      endTime: "",
      tableData: [],
      dialogFormVisible: false,
      addArticle: {
        title: "",
        content: "",
        author: "",
        type: "",
        remark: ""
      },
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
  mounted() {
    this.getProfileAll();
  },
  methods: {
    getProfileAll() {
      this.$axios
        .get("/api/profile/")
        .then(res => {
          const { data } = res;
          this.tableData = data;
        })
        .catch(e => console.loh(e));
    },
    addArt(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/profile/add", this.addArticle)
            .then(res => {
              console.log(res);
            })
            .catch(e => console.log(e));
          this.dialogFormVisible = !this.dialogFormVisible;
        } else {
          return false;
        }
      });
    },
    handleEdit() {},
    handleDelete(index, row) {
      this.$axios
        .delete(`/api/profile/delete/${row._id}`)
        .then(res => {
          this.getProfileAll();
          console.log(res);
        }).catch(e=> console.log(e));
      console.log(index, row);
    }
  }
};
// https://taylorchen709.github.io/vue-admin/#/table
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
