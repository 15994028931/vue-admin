<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%"

                stripe  :border="border"
        >
            <el-table-column
                    label="标题"
                    width="180"
                    :align="align">
                <template slot-scope="scope">
                    <span style="margin-left: 10px" class="nowrap">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    :align="align"
                    label="内容"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px" class="nowrap">{{ scope.row.content }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    :align="align"
                    label="作者"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.author }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    :align="align"
                    label="日期"
                    width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    :align="align"
                    label="点赞"
                    width="180">
                <template slot-scope="scope">
                    <i class="el-icon-star-on"></i>
                    <span style="margin-left: 10px">{{ scope.row.start }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    :align="align"
                    label="是否原创"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.type | changeText }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    :align="align"
                    label="备注"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px" class="nowrap">{{ scope.row.remark }}</span>
                </template>
            </el-table-column>
            <el-table-column  label="操作"   :align="align">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click.prevent="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click.prevent="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button v-if="isOperator"
                            size="mini"
                            type="primary"
                            @click.prevent="handleUpdate(scope.$index, scope.row)">同步
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { formateDate, updateText } from "../../common/js/myFilter";

export default {
  name: "com-table",
  data() {
    return {
      border: true,
      align: "center"
    };
  },
  filters: {
    formatDate(value) {
      return formateDate(value);
    },
    changeText: function(value) {
      return updateText(value);
    }
  },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    isOperator: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Number,
      default: 0
      /*
        * isEdit为0时则操作Article,为1时则操作Profile
        * */
    }
  },
  methods: {
    handleEdit(index, row) {
      this.$emit("buttonEdit", [index, row, this.isEdit]);
    },
    handleDelete(index, row) {
      this.$emit("buttonDelete", [index, row, this.isEdit]);
    },
    handleUpdate(index, row) {
      this.$emit("buttonUpdate", [index, row, this.isEdit]);
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .nowrap
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
</style>
