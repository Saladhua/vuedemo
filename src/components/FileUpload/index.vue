<template>
  <div style="display: flex">
    <el-button type="primary" @click="uploadFile" style="margin-right: 10px">附件上传</el-button>
    <div class="import_file_content" v-if="formInline[fieldName]">
    <span v-for="(item, index) in JSON.parse(formInline[fieldName])" :key="item.index" class="file_img_span" style="margin-right: 10px">
  <!--                                            <a :href="'/fileupload' + item.FilePath" :download="item.FileName" :title="item.FileName">{{ item.FileName }}</a>-->
        <span v-on:click.stop="showFile(item.FilePath)" :title="item.FileName" style="color: #009bff; cursor: pointer">{{ item.FileName }}</span>
        <span v-on:click.stop="imgDel(formInline[fieldName], index,1)" class="file_img_del"></span>
    </span>
    </div>
  </div>
</template>

<script>
// import { officeWeburl, fileUrl } from "@/api/static-url";
export default {
  props: { formInline: {
      type: Object,
      default: () => ({})
    }, fieldName: {
      type: String,
      default: 'uploadFile'
    } },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {

    uploadFile() {
      let self = this;
      openDialog(
        {
          url: this.publicFun.filesUrl(2),
          title: "上传附件",
          width: 850,
          height: 500,
        },
        function (res) {
          if (res.length === 0) {
            return;
          }
          if (res) {
            self.formInline[self.fieldName] = [];
            for (let i = 0; i < res.length; i++) {
              // res[i].FilePath = res[i].FilePath
              self.formInline[self.fieldName].push(res[i]);
            }
            self.formInline[self.fieldName] = JSON.stringify(self.formInline[self.fieldName]);
          }
        }
      );
    },
    imgDel(file, index) {
      //图片删除
      let files = JSON.parse(file);
      files.splice(index, 1);
      if (files.length > 0) {
        files = JSON.stringify(files);
      } else {
        files = "";
      }
      this.formInline[this.fieldName] = files;
    },
    showFile(filePath) {
      console.log('filepath', filePath)
      openDialog(
        {
          url: SingleFilePreview + '?src=' + filePath,
          title: "查看附件",
          width: 1050,
          height: 680
        },
        function(res) {}
      );
    },
  }
};
</script>

<style scoped>
.a_upload {
  text-decoration-line: none;
  color: #337ab7;
}
.adisabled{
  text-decoration-line: none;
  color:gray;
  cursor:pointer;
}
.file_img_span .file_img_del {
  cursor: pointer;
}

.file_img_span .file_img_del {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: contain;
  background: url("../../assets/images/del.png") no-repeat;
  vertical-align: super;
}
</style>
