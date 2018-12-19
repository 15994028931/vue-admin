<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Profile" name="profile">
                <el-row>
                    <el-col :span="24">
                        <com-table :table-data="profileData"
                                   :is-operator="operator"
                                   :is-edit="isEdits"
                        @buttonEdit="buttonEdit"
                        @buttonDelete="buttonDelete"
                        @buttonUpdate="buttonUpdate"
                        ></com-table>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="Article" name="article">
                <el-row>
                    <el-col :span="24">
                        <com-table :table-data="articleData"
                                   @buttonEdit="buttonEdit"
                                   @buttonDelete="buttonDelete"
                                   @buttonUpdate="buttonUpdate"
                        ></com-table>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import ComTable from "../com-table/com-table";

export default {
  name: "transfor-data",
  data() {
    return {
      profileData: [],
      articleData: [],
      activeName: "profile",
      operator: true,
      isEdits: 1
    };
  },
  components: {
    ComTable
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      this.$axios
        .get(`${this.baseUrl}/api/trasfor/all`)
        .then(res => {
          const { data } = res;
          this.profileData = data.ProfileData;
          this.articleData = data.ArticleData;
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleClick() {
      this.getAllData();
    },
    buttonEdit(data) {
      const [index, row, isEdit] = data;
      console.log(isEdit);
    },
    buttonDelete(data) {
      const [index, row, isEdit] = data;
      switch (isEdit) {
        case 0:
          this.articleDeleteOne(row);
          break;
        case 1:
          break;
      }
    },
    articleDeleteOne(row) {
      this.$axios
        .delete(`${this.baseUrl}/api/article/delete/${row.tokenId}`)
        .then(res => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "数据删除成功"
            });
            this.getAllData();
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    buttonUpdate(data) {
      const [index, row, isEdit] = data;
      this.updateOne(row);
    },
    updateOne(data) {
      this.$axios
        .post(`${this.baseUrl}/api/trasfor/single/${data._id}`, {
          data
        })
        .then(res => {
          if (res.status === 200) {
            const { data } = res;
            switch (data.err_code) {
              case 0:
                this.$message({
                  type: "success",
                  message: "数据同步成功"
                });
                break;
              case 1:
                this.$message({
                  type: "warning",
                  message: "数据已存在目标文档"
                });
                break;
              case 2:
                this.$message({
                  type: "error",
                  message: "出现未知错误"
                });
                break;
            }
          }
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
