<template>
    <div class="iamge-wrap">
        <el-row>
            <el-col :span="24">
                <el-upload ref="uploadImg"
                        :action="actionUrl"
                        list-type="picture-card"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%"  alt="">
                </el-dialog>
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
    uploadFile(file) {
      const formData = new FormData(file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$axios
        .post(this.actionUrl, formData, config)
        .then(() => {})
        .catch(e => console.log(e));
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview() {}
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
