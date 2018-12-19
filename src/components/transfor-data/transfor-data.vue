<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Profile" name="profile">
                <el-row>
                    <el-col :span="24">
                        <com-table :table-data="profileData"
                                   :is-operator="operator"
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
                        <com-table :table-data="articleData"></com-table>
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
      operator: true
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
          console.log(this.profileData);
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleClick () {
      this.getAllData();
    },
    buttonEdit(data) {
      console.log(data[1]);
    },
    buttonDelete(data) {
      console.log(data);
    },
    buttonUpdate(data) {
      console.log(data);
      this.updateOne(data[1]);
    },
    updateOne(data) {
      this.$axios
        .post(`${this.baseUrl}/api/trasfor/single/${data._id}`,{
          data
        })
        .then(res => {
          console.log(res);
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
