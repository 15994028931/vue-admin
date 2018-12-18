<template>
    <div class="iamge-wrap">
        <el-row>
            <el-col :span="24">
                <!--<el-upload ref="uploadImg"
                        :action="actionUrl"
                        list-type="picture-card"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%"  alt="">
                </el-dialog>-->
                <input type="file" ref="file"><button @click="uploadFile">add </button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  name: "image-manage",
  data() {
    return {
      actionUrl: `${this.baseUrl}/api/img/upload`,
      dialogVisible: false
    };
  },
  methods: {
    uploadFile() {
        let file = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('file',file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$axios
        .post(this.actionUrl, formData, config)
        .then(() => {})
        .catch(e => console.log(e));
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
