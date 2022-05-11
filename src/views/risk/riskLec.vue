<template>
    <div class="casualtiesEdit">
        <div class="position_form">
            <div class="scroll-content" @scroll="onScroll" :style="'overflow-x: hidden; overflow-y: auto;height:' +contentStyleObj.height">
                <div class="scroll-item">
                    <el-form :inline="true" :rules="rules" ref="ruleForm1" :model="formInline" id="form_table" label-width="260px">
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="事故发生的可能性（L）:" prop="lrisk">
                                    <el-select v-model="formInline.lrisk" clearable placeholder="" @change="sum(formInline.lrisk,formInline.erisk,formInline.crisk)">
                                        <el-option v-for="item in lriskArr" :key="item.value" :label="item.text" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="暴露于危险环境的频繁程度（E）:" prop="erisk">
                                    <el-select v-model="formInline.erisk" clearable placeholder="" @change="sum(formInline.lrisk,formInline.erisk,formInline.crisk)">
                                        <el-option v-for="item in eriskArr" :key="item.value" :label="item.text" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="发生事故产生的后果（C）:" prop="crisk">
                                    <el-select v-model="formInline.crisk" clearable placeholder="" @change="sum(formInline.lrisk,formInline.erisk,formInline.crisk)">
                                        <el-option v-for="item in criskArr" :key="item.value" :label="item.text" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="评估风险等级">
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="D值:">
                                    {{formInline.grode}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg edit_form">
                            <el-col :span="24">
                                <el-form-item label="评估等级:">
                                    {{formInline.risklevel}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
            <div class="edit_btn el-fomr position_btn">
              <el-button type="primary" :loading="btnLoading" @click="save">提交</el-button>
                <el-button type="primary" class="btn_close" @click="cancel">关闭</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from "js-cookie";
import moment from "moment";
// import { postrspRisk, putrspRisk, getrspRiskDetail, getSecurityRiskList, getAreas } from "@/api/risk.js";
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
                lrisk: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "change",
                    },
                ],
                crisk: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "change",
                    },
                ],
                erisk: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "change",
                    },
                ],
            },
            formInline: {
                id: "",
                grode: "",
                lrisk: "",
                erisk: "",
                crisk: "",
                risklevel: ""
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
            lriskArr: [],
            eriskArr: [],
            criskArr: [],
            retcode: {
                name: ''
            },
            btnLoading: false,
            loading: false
        };
    },
    mounted() {
        this.config("L", 1);
        this.config("E", 2);
        this.config("C", 3);
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
                    this.lriskArr = res.data;
                }
                if (type == 2) {
                    this.eriskArr = res.data;
                }
                if (type == 3) {
                    this.criskArr = res.data;
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
        save() {
            window.parent._closeDialog({
                success: "关闭",
                risklevel:this.formInline.risklevel
            });
        },
        //保存
        // save() {
        //     this.btnLoading = true;
        //     this.$refs["ruleForm1"].validate((valid) => {
        //         if (valid) {
        //             this.formInline.MeasureBaseDto = this.formInline.rspRiskMeasureAttrList;
        //             //地点下拉框处理
        //             this.formInline.areaName = this.areaNameArr.filter(x => x.value == this.formInline.area)[0].text;
        //             if (this.publicFun.GetQueryString("id")) {
        //                 putrspRisk(this.formInline, this.publicFun.GetQueryString("id")).then((res) => {
        //                     console.log(res);
        //                     this.btnLoading = false;
        //                     if (res.code == 1) {
        //                         window.parent._closeDialog({ code: 1, });
        //                     } else {
        //                         self.$notify({ title: "警告", message: res.message, type: "warning", });
        //                     }
        //                 });
        //             } else {
        //                 postrspRisk(this.formInline).then((res) => {
        //                     console.log("12312312312323", res);
        //                     this.btnLoading = false;
        //                     if (res.code == 1) {
        //                         window.parent._closeDialog({ code: 1, });
        //                     } else {
        //                         self.$notify({ title: "警告", message: res.message, type: "warning", });
        //                     }
        //                 });
        //             }
        //         } else {
        //             this.btnLoading = false;
        //             return false;
        //         }
        //     });
        // },
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
        //计算
        sum(q, w, e) {
            var q = (Number(q) * Number(w) * Number(e)).toFixed(2)
            var r = ""
            if (q <= 100) {
                r = "低风险"
            }
            else if (q <= 180) {
                r = "一般风险"
            }
            else if (q <= 400) {
                r = "较大风险"
            }
            else {
                r = "重大风险"
            }
            this.$set(this.formInline.grode = q, this.formInline.risklevel = r)
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
                    url: window.rootUrl + "riskLec",
                    title: "风险管控",
                    height: 800,
                    width: 1200,
                },
                function (retCode) { }
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
