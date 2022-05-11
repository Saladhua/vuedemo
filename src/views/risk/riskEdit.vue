<template>
    <div class="casualtiesEdit">
        <div class="position_form">
            <div class="scroll-content" @scroll="onScroll" :style="'overflow-x: hidden; overflow-y: auto;height:' +contentStyleObj.height">
                <div class="scroll-item">
                    <!-- <div class="casualties_title">风险管控</div> -->
                    <el-form :inline="true" :rules="rules" ref="ruleForm1" :model="formInline" id="form_table" label-width="180px">
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="安全风险业务:" prop="srbNo">
                                    <el-select v-model="formInline.srbNo" clearable placeholder="" @change="selectRsb(formInline.srbNo)">
                                        <el-option v-for="item in srbNameArr" :key="item.srbNo" :label="item.srbName" :value="item.srbNo">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="工作任务:" prop="task">
                                    <el-select v-model="formInline.task" clearable placeholder="" @change="selectFn(formInline.task)">
                                        <el-option v-for="item in taskArr" :key="item.value" :label="item.text" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="工序名称:" prop="procedure">
                                    <el-select v-model="formInline.procedure" clearable placeholder="">
                                        <el-option v-for="item in procedureArr" :key="item.value" :label="item.text" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="地点:" prop="areaName">
                                    <el-select v-model="formInline.area" clearable placeholder="">
                                        <el-option v-for="item in areaNameArr" :key="item.value" :label="item.text" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="专业:" prop="specialty">
                                    <el-select v-model="formInline.specialty" clearable placeholder="">
                                        <el-option v-for="item in specialtyArr" :key="item.value" :label="item.text" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="风险及其后果描述:" prop="description">
                                    <el-input type="textarea" v-model="formInline.description" placeholder="">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="12">
                                <el-form-item label="风险等级:" prop="grade">
                                    <!-- <el-select v-model="formInline.grade" clearable placeholder="">
                                        <el-option v-for="item in gradeArr" :key="item.value" :label="item.text" :value="item.value">
                                        </el-option>
                                    </el-select> -->
                                    <el-input v-model="formInline.grade" @click.native='checkLEC' placeholder="">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="管理对象:" prop="managementTarget">
                                    <el-input v-model="formInline.managementTarget" placeholder="" maxlength="12">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="风险类型:" prop="type">
                                    <el-select v-model="formInline.type" clearable placeholder="">
                                        <el-option v-for="item in typeArr" :key="item.value" :label="item.text" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="事故类型:" prop="accidentType">
                                    <el-select v-model="formInline.accidentType" clearable placeholder="">
                                        <el-option v-for="item in accidentTypeArr" :key="item.value" :label="item.text" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="危险源/危险因素:" prop="hazard">
                                    <el-input type="textarea" v-model="formInline.hazard" maxlength="200">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="管理标准:" prop="managementStandard">
                                    <el-input type="textarea" v-model="formInline.managementStandard" maxlength="200">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="主要责任人:" prop="dept">
                                    <el-col :span="12">
                                        <el-form-item prop="dutyDept">
                                            <el-input v-model="formInline.dutyDept" maxlength="200" placeholder="请选择部门" @click.native="Department">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item prop="dutyRole">
                                            <el-input v-model="formInline.dutyRole" maxlength="200" placeholder="请选择岗位" @click.native="station">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <!-- <div class="casualties_title">管控措施</div> -->
                  <div class="title-card" style="margin-top: 10px;width: 100%; border: inherit">
                    <div slot="header" class="header clearfix">
                      <span class="header-title">管控措施</span> <el-button style="position: absolute; right: 30px;" type="primary" @click="addMeasure">新增</el-button>
                    </div>
                    <el-form :inline="true" :rules="rules" ref="ruleForm1" :model="formInline" id="form_table" label-width="180px">
                        <el-row v-for="(item,index) in formInline.rspRiskMeasureAttrList" :key="index">
                            <el-row type="flex" class="row-bg edit_form">
                                <el-col :span="24">
                                    <el-form-item label="管控措施:" :prop="`rspRiskMeasureAttrList.${index}.measure`" :rules="rspRiskMeasureAttrListRules.measure">
                                        <!-- {{rspRiskMeasureAttrList}} -->  <!-- measure 因为后端接收的管控措施是number不是measure -->
<!--                                      后端上传到集团时要用measure字段，应该改后端而不是改前端！-->
                                        <el-input type="textarea" v-model="item.measure" placeholder="" maxlength="12">
                                        </el-input>
                                        <!-- {{formInline.rspRiskMeasureAttrList}} -->
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg edit_form">
                                <el-col :span="12">
                                    <el-form-item label="责任部门:" :prop="`rspRiskMeasureAttrList.${index}.responsibleDept`" :rules="rspRiskMeasureAttrListRules.responsibleDept">
                                        <el-input v-model="item.responsibleDept" placeholder="请选择部门" maxlength="12" @click.native="Departmentlist('responsibleDept',index)">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="直接管理人:" :prop="`rspRiskMeasureAttrList.${index}.administrator`" :rules="rspRiskMeasureAttrListRules.administrator">
                                        <el-input v-model="item.administrator" placeholder="请选择岗位" maxlength="12" @click.native="stationlist('administrator',index)">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg edit_form">
                                <el-col :span="12">
                                    <el-form-item label="监督部门:" prop="supervisionDept">
                                        <el-input v-model="item.supervisionDept" placeholder="请选择部门" maxlength="12" @click.native="Departmentlist('supervisionDept',index)">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="监督管理人:" prop="supervisor">
                                        <el-input v-model="item.supervisor" placeholder="请选择岗位" maxlength="12" @click.native="stationlist('supervisor',index)">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg edit_form">
                                <el-col :span="12">
                                    <el-form-item label="周期:" prop="period">
                                        <el-col :span="12">
                                            <el-form-item>
                                                <el-input v-model="item.period" maxlength="200">
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item>
                                                <el-select v-model="item.unit" clearable placeholder="">
                                                    <el-option v-for="item in unitArr" :key="item.value" :label="item.text" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="检查类型:" :prop="`rspRiskMeasureAttrList.${index}.checkType`" :rules="rspRiskMeasureAttrListRules.checkType">
                                        <el-col>
                                            <el-select v-model="item.checkType" clearable placeholder="">
                                                <el-option v-for="item in checkTypeArr" :key="item.value" :label="item.text" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                          <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                              <div style="padding: 5px"><el-button type="danger" v-if="formInline.rspRiskMeasureAttrList.length > 1" @click="removeRow(index)" style="margin-left:45%">删除</el-button></div>
                            </el-col>
                          </el-row>
                        </el-row>
                    </el-form>
                  </div>
                </div>
            </div>
        </div>
        <div class="edit_btn el-fomr position_btn">
          <el-button type="primary" :loading="btnLoading" @click="save">提交</el-button>
            <el-button type="primary" class="btn_close" @click="cancel">关闭</el-button>
        </div>

    </div>

</template>
<script>
import Cookies from "js-cookie";
import moment from "moment";
import { postrspRisk, putrspRisk, getrspRiskDetail, getSecurityRiskList, getAreas } from "@/api/risk.js";
import { getConfigCategory } from "@/api/configApi.js";
export default {
    data() {
        return {
            reload: true,
            tabIndex: "0",
            contentStyleObj: {
                height: "630",
            },
            rules: {
                srbNo: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "change",
                    },
                ],
                area: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "change",
                    },
                ],
                description: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "change",
                    },
                ],
                grade: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "change",
                    },
                ],
                type: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "change",
                    },
                ],
                accidentType: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "change",
                    },
                ],
                dutyDept: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "change",
                    },
                ],
                dutyRole: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "change",
                    },
                ],
                dept: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "change",
                    },
                ],
            },
            rspRiskMeasureAttrListRules: {
                measure: [{ required: true, message: '请填写', trigger: 'change' }],
                administrator: [{ required: true, message: '请填写', trigger: 'change' }],
                responsibleDept: [{ required: true, message: '请填写', trigger: 'change' }],
                checkType: [{ required: true, message: '请填写', trigger: 'change' }],
            },
            formInline: {
                infoName: "",
                srbNo: "",
                areaName: "",
                area: "",
                grade:"",
                infoTime: "",
                infoPerson: "",
                dutyDept: "",
                dutyRole: "",
                remark: "",
                uploadFile: "",
                rspRiskMeasureAttrList: [
                    {
                        measure: '',
                        responsibleDept: '',
                        administrator: '',
                        supervisionDept: '',
                        supervisor: '',
                        unit: '',
                        checkType: ''
                    }
                ],
            },
            tableForm: [
                {
                    user: "",
                    region: "",
                },
            ],
            pickerOptions: {
                disabledDate(time) {
                    const date = new Date();
                    date.setTime(date.getTime());
                    return time.getTime() > date;
                },
            },
            srbNameArr: [],
            taskArr: [],
            procedureArr: [],
            areaNameArr: [],
            specialtyArr: [],
            typeArr: [],
            gradeArr: [],
            accidentTypeArr: [],
            unitArr: [
                { value: "天", text: "天" },
                { value: "月", text: "月" },
                { value: "年", text: "年" },
            ],
            checkTypeArr: [],
            btnLoading: false,
            loading: false
        };
    },
    mounted() {

        this.config("风险专业", 1);
        this.config("风险类型", 2);
        this.config("事故类型", 3);
        this.config("管控措施检查类型", 4);
        this.config("风险等级", 6);
        this.config("工作任务", 7);
        getSecurityRiskList().then((res) => {
            this.srbNameArr = res.data;
            if (this.publicFun.GetQueryString("id")) {
                getrspRiskDetail(this.publicFun.GetQueryString("id")).then((res) => {
                    this.formInline = res.data;
                    this.formInline.rspRiskMeasureAttrList = res.data.rspRiskMeasures
                    this.selectRsb(this.formInline.srbNo);
                });
            }
            else {
                //填报日期默认当前时间
                var nowDate = moment().format("YYYY-MM-DD");
                var nowYear = moment().format("YYYY");
                this.$set(this.formInline, "infoTime", nowDate);
            }
        })
    },
    methods: {
        edasda(index) {
            console.log('this.formInline.rspRiskMeasureAttrList', this.formInline.rspRiskMeasureAttrList)
            this.formInline.rspRiskMeasureAttrList.splice(index, 1)
        },
        //图片删除
        imgDel(file, index, type) {
            let files = JSON.parse(file);
            files.splice(index, 1);
            if (files.length > 0) {
                files = JSON.stringify(files);
            }
            else {
                files = '';
            }
            if (type == 1) {
                this.formInline.uploadFile = files;
            }
        },
        //select选择数据获取绑定
        config(text, type) {
            getConfigCategory(text).then((res) => {
                if (type == 1) {
                    this.specialtyArr = res.data;
                }
                if (type == 2) {
                    this.typeArr = res.data;
                }
                if (type == 3) {
                    this.accidentTypeArr = res.data;
                }
                if (type == 4) {
                    this.checkTypeArr = res.data;
                }
                if (type == 5) {
                          if (res.data) {
                   this.procedureArr = res.data;
                    var procedures = [];
                    this.procedureArr.forEach((item) => {
                        procedures.push(item.value);
                    });
                    if (procedures.indexOf(this.formInline.procedure) == -1) {
                        this.$set(this.formInline, "procedure", "");
                    }
                }
                else {
                    this.$set(this.formInline, "procedure", "");
                }


                }
                if (type == 6) {
                    this.gradeArr = res.data;
                }
                if (type == 7) {
                    this.taskArr = res.data;
                }
            });
        },
        //附件上传
        uploadFile1() {
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
                        self.formInline.uploadFile = [];
                        for (let i = 0; i < res.length; i++) {
                            // res[i].FilePath = res[i].FilePath
                            self.formInline.uploadFile.push(res[i]);
                        }
                        self.formInline.uploadFile = JSON.stringify(self.formInline.uploadFile);
                    }
                }
            );
        },
        selectFn(e) {
            this.config(e, 5);
        },
        selectRsb(e) {
            getAreas({ srbNo: e }).then((res) => {
                this.areaNameArr = res.data;
                this.$set(this.formInline, "area", this.formInline.area);
            })
        },
        // 滚动条滚动
        onScroll(e) {
            let scrollItems = document.querySelectorAll(".scroll-item");
            for (let i = scrollItems.length - 1; i >= 0; i--) {
                // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
                let judge =
                    e.target.scrollTop >=
                    scrollItems[i].offsetTop - scrollItems[0].offsetTop - 100;
                if (judge) {
                    this.tabIndex = i.toString();
                    break;
                }
            }
        },
        cancel() {
            window.parent._closeDialog({
                success: "关闭",
            });
        },
        //保存
        save() {
            this.btnLoading = true;
            this.$refs["ruleForm1"].validate((valid) => {
                if (valid) {
                    debugger
                    this.formInline.MeasureBaseDto = this.formInline.rspRiskMeasureAttrList;
                    //地点下拉框处理
                    this.formInline.areaName = this.areaNameArr.filter(x => x.value == this.formInline.area)[0].text;
                    if (this.publicFun.GetQueryString("id")) {
                        debugger
                        putrspRisk(this.formInline, this.publicFun.GetQueryString("id")).then((res) => {
                            console.log(res);
                            this.btnLoading = false;
                            if (res.code == 1) {
                                window.parent._closeDialog({ code: 1, });
                            } else {
                                self.$notify({ title: "警告", message: res.message, type: "warning", });
                            }
                        });
                    } else {
                        postrspRisk(this.formInline).then((res) => {
                            console.log("12312312312323", res);
                            this.btnLoading = false;
                            if (res.code == 1) {
                                window.parent._closeDialog({ code: 1, });
                            } else {
                                self.$notify({ title: "警告", message: res.message, type: "warning", });
                            }
                        });
                    }
                } else {
                    this.btnLoading = false;
                    return false;
                }
            });
        },
        Department() { //选择部门
            let self = this
            openDialog({
                url: DepartmentSelectTreeUrl + "?type=r&lv=",
                title: "选择部门信息"
            }, function (retCode) {
                if (retCode) {
                    self.formInline.dutyDeptid = retCode[0].id
                    self.formInline.dutyDept = retCode[0].name
                } else {
                    self.formInline.dutyDeptid = ""
                    self.formInline.dutyDept = ""
                }
            });
        },
        Departmentlist(text, index) { //选择部门
            let self = this
            openDialog({
                url: DepartmentSelectTreeUrl + "?type=r&lv=",
                title: "选择部门信息"
            }, function (retCode) {
                if (text == "responsibleDept") {
                    if (retCode) {
                        self.formInline.rspRiskMeasureAttrList[index].responsibleDeptid = retCode[0].id
                        self.formInline.rspRiskMeasureAttrList[index].responsibleDept = retCode[0].name
                    } else {
                        self.formInline.rspRiskMeasureAttrList[index].responsibleDeptid = ""
                        self.formInline.rspRiskMeasureAttrList[index].responsibleDept = ""
                    }
                }
                if (text == "supervisionDept") {
                    if (retCode) {
                        self.formInline.rspRiskMeasureAttrList[index].supervisionDeptid = retCode[0].id
                        self.formInline.rspRiskMeasureAttrList[index].supervisionDept = retCode[0].name
                    } else {
                        self.formInline.rspRiskMeasureAttrList[index].supervisionDeptid = ""
                        self.formInline.rspRiskMeasureAttrList[index].supervisionDept = ""
                    }
                }
            });
        },
        station() { //选择岗位
            let self = this;
            openDialog({
                url: RoleSelectTreeUrl + "?type=r",
                title: "选择岗位信息"
            }, function (retCode) {
                //选择成功后处理过程
                self.formInline.dutyRole = retCode[0].name;
            });
        },
        stationlist(text, index) { //选择岗位
            let self = this;
            openDialog({
                url: RoleSelectTreeUrl + "?type=r",
                title: "选择岗位信息"
            }, function (retCode) {
                //选择成功后处理过程
                if (text == "administrator")
                    self.formInline.rspRiskMeasureAttrList[index].administrator = retCode[0].name;
                if (text == "supervisor")
                    self.formInline.rspRiskMeasureAttrList[index].supervisor = retCode[0].name;
            });
        },
        //新增一条风险管控
        addMeasure() {
            // this.loading = true
            this.$forceUpdate(this.formInline.rspRiskMeasureAttrList.push({
                measure: '',
                responsibleDept: '',
                administrator: '',
                supervisionDept: '',
                supervisor: '',
                unit: '',
                checkType: ''
            })
            )
            // this.loading = false
        },
        // 删除属性列
        removeRow(index) {
            this.$forceUpdate(this.formInline.rspRiskMeasureAttrList.splice(index, 1))
        },
        getyear(mdate) {
            this.formInline.year = mdate.toString("yyyy")
        },
        //详情
        checkLEC(row) {
            let self = this;
            openDialog(
                {
                    url: window.rootUrl + "riskLec?id=" + row.id,
                    title: "风险等级",
                    height: 500,
                    width: 600,
                },
                function (risklevel) {
                    if (risklevel) {
                        // debugger
                        self.formInline.grade = risklevel.risklevel;
                        // console.log("12312321321", self.formInline.grade )
                    }
                }
            );
        },
    },
    // created() {
    //   this.getHight()
    //   window.addEventListener('resize', this.getHight)
    // },
    // destroyed() {
    //   window.removeEventListener('resize', this.getHight)
    // }
};
</script>
<style scoped>
.casualties_box {
    margin-bottom: 20px;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
}

.hhlable {
    text-align: left;
}

.casualties_box:first-child {
    /* margin-bottom: 0; */
    border-top: none;
    /* border-bottom: none; */
}

.casualties_box:last-child {
    margin-bottom: 0;
    /* border-top: none; */
    border-bottom: none;
}

.casualties_user {
    width: 1060px;
    float: left;
    /* border-bottom: 1px solid #dddddd; */
}

.casualties_user_del {
    float: left;
    height: 122px;
    width: 95px;
    /* line-height: 122px; */
    text-align: center;
    border: 1px solid #dddddd;
    border-top: none;
    border-bottom: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.del_btn {
    width: 52px;
    height: 27px;
    background-color: #d9534f;
    color: #ffffff;
    font-size: 14px;
    line-height: 27px;
    border-radius: 4px;
    cursor: pointer;
}

.casualties_box #form_table {
    margin-bottom: 0;
}

.casualties_title {
    position: relative;
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
}

.casualties_title::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 20px;
    background-color: #3c92cf;
    position: absolute;
    left: 0;
    top: 10px;
}

/* .casualties_add{
      text-align: right;
  } */
.import_file_content {
    display: inline-block;
    /* width: calc(100% - 90px); */
}

.file_img_span {
    display: inline-block;
    position: relative;
}

/* .file_img_span a {
    display: inline-block;
    max-width: 150px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  } */

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
<style scoped>
.casualtiesEdit .el-tabs__item:hover {
    color: #333;
}

.casualtiesEdit .el-tabs__item.is-active {
    background-color: #3c92cf;
    color: #ffffff;
}

.casualtiesEdit .el-checkbox__label {
    line-height: 30px !important;
    font-size: 15px;
    color: #666666 !important;
    font-weight: bold;
}

.el-date-picker .el-picker-panel__footer .is-plain {
    border: none !important;
}

/* .el-tabs__item.is-active:hover{
        background-color: #ffffff;
        color: #3C92CF;
        border: 1px solid #3C92CF;
    } */
.el-loading-mask {
    background-color: transparent !important;
}
</style>
