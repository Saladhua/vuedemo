<template>
  <div style="text-align: center;">
    <el-button v-if="showUrl" type="text" size="small" @click="showFile" title="查看">
      <img data-v-11567291="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABIklEQVQ4y5WT0U3DQBBE3yH/Jx2EDuISroOUECJdAaYC6AD/5yRMB6SCOB04HRwd2BUsH4whHLZkVvLHrW/GM7Nrx9FKoAVWLK83CzwAOI7Wq9ktBK+BLfBogbrQly8W8EvQLuKBs4gospdroJzBJgukvFlk51bypmpw8S95TlDDVzgT1UlBAtwcwbsuzEr+j4VRci9lHtgAJ6C2QAtwN2HhoqcROAF7gQF2wNnFnz2wuTG6SCPwFfAW6F2kAl6AAbjPx9jJwqBxjqTeAj2ABWpZ2wPlnIVGAW4E6rN73+dfBBZoLOAtUKl1krIqW7Zx1GnM4EOh5RNBazuSJYFXtxkcgFfgKQ/RAs8ucpC13e1WiqR1ZoZCWc/tfvaPJGXQAttPN5lvCbboEmQAAAAASUVORK5CYII=">
    </el-button>
    <a class="a_upload" v-if="uploadUrl" :href="uploadUrl" :download="fileName" target="_blank" style="margin-left: 10px;" title="下载">
      <img data-v-11567291="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAPCAYAAADphp8SAAAACXBIWXMAAAsSAAALEgHS3X78AAABUklEQVQ4y42T0U0DMRBEn0/8EzpIKshRAaYC0kEOyQWECjg6gG8s3aWDUAGXCvBVQNJBUsHywVpazCExP5bG6/HsrO1EhBIuMgOegRVwqfQRaCXQMwFXCrnIHEgqcAQOunWj61YCTSlUTYj3KrKVwFwCXgIeWAAjsHbxt9APRy5SAx/AXg9Puf0ERgnUk440l41x9QsSOAB7YFm6qlSk0SzWyh/MBV6dluhcJKkBKi3qNJcn4EoCgznwrhPMrjxwDbwBS/iuvTBF93+NdqLFBKxcZAfcuUhT6VjH/4oUaHVd5bBTMZ02917wjc1LnQHMslBti4FHYLBiynfArngOAKfKjNPrLT2wtUHqRR1w1m+TkfPdOV7F62TOwCZn5SK9eQ7ovpdAUiet7o8SqJ2IWNsZtxIYjJgVGcy/G4FGAqky7SyAF231pHyjnDfBJq15sPwXIUuK0ahUjroAAAAASUVORK5CYII=">
    </a>
    <!-- <a v-if="showUrl" title="点击查看" @click="showFile"><img class="imgymsearch"/></a>
    <a v-else class="adisabled" target="_blank" disabled="disabled"><img class="imgymsearch"/></a>
    <a v-if="uploadUrl" :href="uploadUrl" title="点击下载" :download="fileName" target="_blank">
      <img class="imgymdownload" />
    </a>
    <a v-else class="adisabled" target="_blank" disabled="disabled"><img class="imgymdownload" /></a> -->
  </div>
</template>

<script>
// import { officeWeburl, fileUrl } from "@/api/static-url";
export default {
  props: { files: String },
  data() {
    return {
      uploadUrl: "",//a标签附件下载地址
      fileName: "",//附件名称
      showUrl: ""//附件预览地址office365
    };
  },
  watch: {
    files: {
      deep: true,  // 深度监听
      handler(newVal,oldVal) {
         //console.log("newVal:",newVal);
         //console.log("oldVal:",oldVal);
         //console.log("files:",this.files);
         this.setFileData();
      }
    }
  },
  created() {
   this.setFileData();
  },
  methods: {
    showFile() {
      console.log("查看附件url:",this.showUrl);
      openDialog(
        {
          url: this.showUrl,
          title: "查看附件",
          width: 1050,
          height: 680
        },
        function(res) {}
      );
    },
    setFileData(){
      if (!this.files){
        this.uploadUrl = "";
        this.fileName = "";
        this.showUrl = "";
      }
      else{
        let fileObj = JSON.parse(this.files);
        this.uploadUrl = "/fileupload" + fileObj[0].FilePath;
        this.fileName = fileObj[0].FileName;
        this.showUrl = SingleFilePreview + '?src=' + fileObj[0].FilePath;
      }
    }
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
</style>
