<template>
  <div>
    <el-form :inline="true" ref="getheight" :model="formInline" class="search-form-inline">
      <el-form-item label="风险描述:">
        <el-input v-model="formInline.Description " clearable class="el-form-item-width">
        </el-input>
      </el-form-item>
      <el-form-item label="危险源/因素:">
        <el-input v-model="formInline.Hazard" clearable class="el-form-item-width">
        </el-input>
      </el-form-item>
      <el-form-item label="主要责任人部门:">
        <el-input v-model="formInline.DutyDept" clearable class="el-form-item-width" @click.native="Department"></el-input>
      </el-form-item>
      <el-form-item label="主要责任人岗位:">
        <el-input v-model=" formInline.DutyRole" clearable @click.native="station" placeholder="">
        </el-input>
      </el-form-item>
      <el-form-item label="专业:">
        <el-select v-model="formInline.Specialty" clearable class="el-form-item-width" placeholder="">
          <el-option v-for="item in SpecialtyArr" :key="item.value" :label="item.text" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="风险等级:">
        <el-select v-model="formInline.Grade" clearable class="el-form-item-width" placeholder="">
          <el-option v-for="item in GradeArr" :key="item.value" :label="item.text" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="事故类型:">
        <el-select v-model="formInline.AccidentType" clearable class="el-form-item-width" placeholder="">
          <el-option v-for="item in AccidentTypeArr" :key="item.value" :label="item.text" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="formInline.State" clearable class="el-form-item-width" placeholder="">
          <el-option v-for="item in StateArr" :key="item.value" :label="item.text"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="btnLoading" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="add" v-if="添加">添加</el-button>
        <el-button type="primary" @click="delall" v-if="删除">删除</el-button>
				<el-button type="primary" @click="exports" v-if="导出">导出</el-button>
				<el-button type="primary" @click="downloadfiel" v-if="导入">下载模板</el-button>
				<el-button style="border:0px;">
				<el-upload  action="api/file/ImportData?fileType=2" :show-file-list="false"	:on-preview="handlePreview"
				:on-remove="handleRemove" :before-remove="beforeRemove"
				:on-exceed="handleExceed" :on-success="uploadSuccess"
				:file-list="fileList" v-if="导入">
				<el-button size="small" type="primary">导入</el-button>
				</el-upload>
				</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border ref="tableRef" style="width: 100%" :height="tableHeight"
      :header-cell-style="headerStyle" :cell-style="headerCellStyle" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column type="index" label="序号" align="center" fixed="left" width="100">
      </el-table-column>
      <el-table-column prop="description" label="风险描述"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="check_span" @click="check(scope.row)">{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="grade" label="风险等级" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="accidentType" label="事故类型"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="dutyDept" label="主要责任人部门"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="dutyRole" label="主要责任人岗位" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column prop="sort,test" label="管控措施" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{scope.row.sort}}{{test}}
                </template>
            </el-table-column>
      <el-table-column prop="state" label="状态"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" fixed="right" width="300" v-if="编辑 || 删除" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-button style="color: #6a9dca" icon="el-icon-edit-outline" type="text" size="small" @click="editType(scope.row)" v-if="编辑">编辑</el-button>
          <el-popover :ref="scope.row.id" placement="top" width="180" v-show="删除">
            <p>确认删除此项?</p>
            <div style="text-align: right; margin: 0" class="el-form">
              <el-button type="primary" v-on:click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button type="primary" v-on:click=" $refs[scope.row.id].doClose(); delType(scope.row);">确定</el-button>
            </div>
            <el-button slot="reference" type="text" size="small" class="el-icon-delete">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange" background :pager-count="5"
      @current-change="handleCurrentChange" :current-page="formInline.Page"
      :page-sizes="[10, 20, 30, 40]" :page-size="formInline.PageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  getrspRiskDefinitionList,
  deleterspRiskDefinition,
} from "@/api/riskDefinition.js";
import { getConfigCategory } from "@/api/configApi.js";
import{getExportProject,getDownloadfile} from "@/api/common.js";
export default {
  data() {
    return {
      formInline: {
        TarName: "",
        Hazard:"",
        AreaName: "",
        DutyDept:"",
        DutyRole: "",
        Specialty:"",
        Grade: "",
        AccidentType:"",
        State:"",
        Page: 1,
        PageSize: 20,
      },
      tableData: [],
      total: 0,
      btnLoading: true,
      tableHeight: 680,
      authorArr: ["浏览","添加", "编辑", "删除","导入","导出"],
      浏览:true,
      删除: true,
      编辑: true,
      添加: true,
      置顶: true,
      导入:true,
      导出:true,
      StateArr: [
          { value: "正常", text: "正常"},
          { value: "停用", text: "停用"},
      ],
      SpecialtyArr:[],
      GradeArr:[],
      AccidentTypeArr:[],
      multipleSelection: [],
      fileList:"",
    };
  },
  mounted() {
    this.initPage();
    this.getHeight();
    window.addEventListener("resize", this.getHeight);
    //获取按钮权限
    let menus = this.publicFun.menusQX("/riskListDefinitionForm");
    this.config("风险专业", 1);
    this.config("风险等级", 2);
    this.config("事故类型", 3);
    console.log(menus);
    let operations = menus.operations;
    if (menus && operations.length > 0) {
      for (let i = 0; i < operations.length; i++) {
        if (this.authorArr.indexOf(operations[i].displayName) > -1) {
          let aa = operations[i].identification;
          this[aa] = true;
        }
      }
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  methods: {
    //计算table高度
    getHeight() {
      this.$nextTick(() => {
        this.tableHeight =
          window.innerHeight - 80 - this.$refs.getheight.$el.offsetHeight;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      //每页的个数
      let self = this;
      self.formInline.PageSize = val;
      self.initPage();
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let self = this;
      self.formInline.Page = val;
      self.initPage();
    },
    handleSelectionChange(val) {
      let that = this;
      that.multipleSelection = val;
      that.multipleSelection.forEach(function (item, index) {
        if (item.Grade !==null) {
          console.log(index);
          that.$refs.tableRef.toggleRowSelection(item, true);
        } else {
          that.$refs.tableRef.toggleRowSelection(item, false);
        }
      });
      const list = that.multipleSelection.filter(
        (item) => item.Grade !==null
      );
      that.multipleSelection = list;
      console.log(that.multipleSelection);
    },
    //获取查询条件中的业务行业、业务等级
    config(text, type) {
      getConfigCategory(text).then((res) => {
        if (type == 1) {
          this.SpecialtyArr = res.data;
        }
        if (type == 2) {
          this.GradeArr = res.data;
        }
        if (type == 3) {
          this.AccidentTypeArr = res.data;
        }
      });
    },
    initPage() {
      getrspRiskDefinitionList(this.formInline).then((res) => {
        this.btnLoading = false;
        this.tableData = res.data.data;
        this.total = res.data.count;
        this.$nextTick(() => {
          this.$refs.tableRef.doLayout();
        });
      });
    },
    //表头和行的样式
    headerStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center; /";
    },
    //表头和行的样式
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 3) {
        return "text-align:left;";
      } else {
        return "text-align:center;";
      }
    },
    //查询
    onSubmit() {
      this.btnLoading = !this.btnLoading;
      this.initPage();
    },
    //详情
    check(row) {
      let self = this;
      openDialog(
        {
          url: window.rootUrl + "riskkDefinitionDetail?id=" + row.id,
          title: "风险管控",
          height: 800,
          width: 1200,
        },
        function (retCode) {}
      );
    },
    //添加
    add() {
      let self = this;
      openDialog(
        {
          url: window.rootUrl + "riskkDefinitionEdit",
          title: "新建风险",
          height: 900,
          width: 850,
        },
        function (retCode) {
          self.initPage();
          if (retCode.code == 1) {
            self.$notify({
              title: "成功",
              message: "添加成功",
              type: "success",
            });
          }
        }
      );
    },
    //编辑
    editType(row) {
      let self = this;
      openDialog(
        {
          url: window.rootUrl + "riskkDefinitionEdit?id=" + row.id,
          title: "编辑风险管控",
          height: 800,
          width: 850,
        },
        function (retCode) {
          self.initPage();
          // console.log(retCode,"关闭")
          if (retCode.code == 1) {
            self.$notify({
              title: "成功",
              message: "编辑成功",
              type: "success",
            });
          }
        }
      );
    },
    //删除
    delType(row) {
      deleterspRiskDefinition(row.id).then((res) => {
        console.log(res);
        this.initPage();
        if (res.code == 1) {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$notify({
            title: "警告",
            message: res.message,
            type: "warning",
          });
        }
      });
    },
    //批量删除
    delall() {
      if (this.multipleSelection.length <= 0) {
        this.$notify({
          title: "警告",
          message: "请选择记录后删除",
          type: "warning",
        });
      } else {
        this.$msgbox({
          title: "提示",
          message: "确定删除所选项？",
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          beforeClose: (action, instance, done) => {
            done();
            if (action === "confirm") {
              var ids = "";
              this.multipleSelection.forEach(function (item, index) {
                ids += item.id + ",";
              });
              ids = ids.substring(0, ids.length - 1);
              deleterspRiskDefinition(ids).then((res) => {
                this.initPage();
                if (res.code == 1) {
                  this.$notify({
                    title: "成功",
                    message: "删除成功",
                    type: "success",
                  });

                } else {
                  this.$notify({
                    title: "警告",
                    message: res.message,
                    type: "warning",
                  });
                }
              });
            }
          },
        }).then((action) => {
        });
      }
    },
    Department() { //选择部门
        let self = this
        openDialog({
          url: DepartmentSelectTreeUrl + "?type=r&lv=",
          title: "选择部门信息"
        }, function (retCode) {
          if (retCode) {
            self.formInline.DutyDept = retCode[0].name
          } else {
            self.formInline.DutyDept = ""
          }
        });
    },
    station(){ //选择岗位
      let self = this;
      openDialog({
			url: RoleSelectTreeUrl + "?type=r",
			title: "选择岗位信息"
		  }, function (retCode) {
			//选择成功后处理过程
        if(retCode){
          self.formInline.DutyRole = retCode[0].name;
        }else{
          self.formInline.DutyRole=""
        }
		  });
    },
    //导出
    exports(){
      getExportProject({fileType:"1",request:this.formInline}).then((res)=>{
        let blob = new Blob([res]);
        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = `风险基元.xlsx`; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      });
    },
    //下载模板
    downloadfiel(){
      //1是安全资格证导入模板，2是风险基元库导入模板
      getDownloadfile({fileType:"2"}).then((res)=>{
        let blob = new Blob([res]);
        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = `风险基元.xlsx`; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      });
    },
    uploadSuccess(res, file, filelist){
      if (res.message == null) {
        this.initPage();
        this.$notify({
          title: '成功',
          message: '成功',
          type: 'success'
        });
      }
      else {
        this.$notify({
          title: '失败',
          message: res.message,
          type: 'warning'
        });
      }
    },
  },
};
</script>
