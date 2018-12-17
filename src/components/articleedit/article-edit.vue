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
                    <el-button type="primary" @click="filterDate">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogShow">添加</el-button>
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
                        <span style="margin-left: 10px">{{ scope.row.date | formatDate }}</span>
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
            <Dialog :dialog="dialog" :addArticle="addArticle" @updated="getProfileAll"></Dialog>
        </el-col>
        <el-col>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.curPage"
                    :page-sizes="pagination.pageSizes"
                    :page-size="pagination.pageSize"
                    :layout="pagination.layout"
                    :total="pagination.total">
            </el-pagination>
        </el-col>
    </section>
</template>
<script>
import Dialog from "../../components/dialog/dialog";
export default {
  name: "article-edit",
  data() {
    return {
      startTime: "",
      endTime: "",
      timeTable: [],
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      addArticle: {
        title: "",
        content: "",
        author: "",
        type: "",
        remark: ""
      },
      pagination: {
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        curPage: 1,
        pageSizes: [5, 10, 20],
        pageSize: 5
      }
    };
  },
  mounted() {
    this.getProfileAll();
  },
  filters: {
    formatDate: function(value) {
      if (!value) return;
      let index = value.indexOf("T");
      let val = value
        .split("")
        .splice(0, index)
        .join("");
      return val;
    }
  },
  components: {
    Dialog
  },
  methods: {
    getProfileAll() {
      this.$axios
        .get("/api/profile/")
        .then(res => {
          const { data } = res;
          this.tableData = data;
          this.timeTable = data;
        })
        .catch(e => console.log(e));
    },
    dialogShow() {
      this.dialog = {
        show: true,
        title: "添加博客",
        option: "add"
      };
      this.addArticle = {
        title: "",
        content: "",
        author: "",
        type: "",
        remark: ""
      };
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "修改当前信息",
        option: "edit"
      };
      this.addArticle = {
        title: row.title,
        content: row.content,
        author: row.author,
        type: row.type,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(index, row) {
      this.$axios
        .delete(`/api/profile/delete/${row._id}`)
        .then(res => {
          this.getProfileAll();
          this.$message({
            type: "success",
            message: "删除成功"
          });
          console.log(res);
        })
        .catch(e => console.log(e));
      console.log(index, row);
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    filterDate() {
      if (!this.startTime || !this.endTime) {
        this.$message({
          type: "warning",
          message: "日期不能为空"
        });
        return;
      }
      const sT = new Date(this.startTime).getTime();
      const eT = new Date(this.endTime).getTime();
      this.tableData = this.timeTable.filter(item => {
        return (
          new Date(item.date).getTime() >= sT &&
          new Date(item.date).getTime() <= eT
        );
      });
    }
  }
};
// https://taylorchen709.github.io/vue-admin/#/table
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
