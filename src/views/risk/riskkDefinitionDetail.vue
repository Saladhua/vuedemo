<template>
    <div class="timeline_block">
    <el-form :inline="true" :model="formInline" class="search-form-inline" id="form_table" label-width="180px">
          <el-row type="flex" class="row-bg edit_form">
            <el-col :span="8">
              <el-form-item label="工作任务:">
                {{formInline.task}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工序名称:">
                {{formInline.procedure}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="专业:">
                {{formInline.specialty}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg edit_form">
            <el-col :span="8">
              <el-form-item label="风险等级:">
                {{formInline.grade}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="风险类型:">
                {{formInline.type}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="事故类型:">
                  {{formInline.accidentType}}
                </el-form-item>
              </el-col>
          </el-row>
		  <el-row type="flex" class="row-bg edit_form">
		    <el-col :span="8">
		      <el-form-item label="管理对象:">
                  {{formInline.managementTarget}}
		      </el-form-item>
		    </el-col>
            </el-row>
            <el-row type="flex" class="row-bg edit_form">
		    <el-col :span="8">
		      <el-form-item label="危险源/因素:">
                  {{formInline.hazard}}
		      </el-form-item>
		    </el-col>
            </el-row>
            <el-row type="flex" class="row-bg edit_form">
		    <el-col :span="8">
		       <el-form-item label="风险及其后果描述:">
                  {{formInline.description}}
		       </el-form-item>
		      </el-col>
		  </el-row>
		  <el-row type="flex" class="row-bg edit_form">
		    <el-col :span="8">
		      <el-form-item label="管理标准:">
		        {{formInline.managementStandard}}
		      </el-form-item>
		    </el-col>
		  </el-row>
		  <el-row type="flex" class="row-bg edit_form">
		    <el-col :span="8">
		      <el-form-item label="主要负责人:">
		        {{formInline.dutyRole}}
		      </el-form-item>
		    </el-col>
		  </el-row>
      </el-form>
    <el-collapse v-model="name">
      <el-collapse-item title="管控措施" name="1">
        <div v-for="(item,index) in formInline.rspRiskMeasureAttrList" :key="index">
          <div class="clearfloat casualties_box">
            <el-form :inline="true" :model="item" class="search-form-inline casualties_user" id="form_table"
              label-width="100px">
              <el-row type="flex" class="row-bg edit_form">
                <el-col :span="6">
                  <el-form-item label="管控措施:">
                    {{item.number}}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="直接管理人:">
                    {{item.administrator}}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="责任部门:">
                    {{item.responsibleDept}}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="监督管理人:">
                    {{item.supervisor}}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="监督部门:">
                    {{item.supervisionDept}}
                  </el-form-item>
                </el-col>
               <el-col :span="6">
                  <el-form-item label="周期:">
                    {{item.period}}{{item.unit}}
                  </el-form-item>
                </el-col>             
              </el-row>
            </el-form>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    </div>
</template>
<script>
import{
    getrspRiskDefinitionDetail
} from "@/api/riskDefinition.js";
export default{
    data(){
        return{
            formInline: {
                "infoName": "",
                "infoTypeP": "",
                "infoTime": "",
                "infoPerson": "",
                "dutyDept": "",
                "dutyRole": "",
                "dutyRole": "",                   
                "remark": "",
                "srbName": "",                
                "task": "",
                "specialty": "",   
                "grade": "",   
                "accidentType": "",
                "managementTarget": "",   
                "hazard": "", 
                "description":"",    
                "managementStandard":"",   
                "dutyRole":"", 
                "rspRiskMeasureAttrList": [{
                    "number": '',
                    "responsibleDept": '',
                    "administrator": '',
                    "supervisionDept": '',
                    "supervisor": '',
                    "unit": '',
                    "period":'',
                    "checkType": ''
                }
                ],
            },
        };
    },
    mounted(){
        console.log(this.publicFun.GetQueryString("id"))
        getrspRiskDefinitionDetail(this.publicFun.GetQueryString("id")).then(res=>{
            console.log(res)
            this.formInline=res.data;
            this.formInline.rspRiskMeasureAttrList=res.data.rspRiskDefinitionMeasures;
        })
    },
    methods:{

    }
}
</script>
<style scoped>
    .timeline_block .el-collapse-item{
        margin-bottom: 20px;
    }
  .timeline_block .el-collapse-item__header {
    border-bottom: none;
    background-color: #c7c7c7;
    padding-left: 10px;
  }
  .timeline_block .el-collapse{
        border: none;
    }
    .timeline_block .el-collapse-item__wrap{
        border: none;
    }
    .enter_operator .el-collapse-item__arrow{
        display: none;
    }
</style>
<style scoped>
  .import_file_content {
    display: inline-block;
  }
  .file_img_span {
    display: inline-block;
    position: relative;
  }
</style>

