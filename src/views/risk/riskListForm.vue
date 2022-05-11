<template>
    <div>
        <el-form :inline="true" ref="getheight" :model="formInline" class="search-form-inline">
            <el-form-item label="风险描述:">
                <el-input v-model="formInline.Description" clearable class="el-form-item-width">
                </el-input>
            </el-form-item>
            <el-form-item label="危险源/因素:">
                <el-input v-model="formInline.Hazard" clearable class="el-form-item-width">
                </el-input>
            </el-form-item>
            <el-form-item label="地点:">
                <!-- <el-select v-model="formInline.AreaName" clearable placeholder="">
                    <el-option v-for="item in areaNameArr" :key="item.value" :label="item.text" :value="item.value">
                    </el-option>
                </el-select> -->
                <el-input v-model="formInline.AreaName" clearable @click.native='showArea' placeholder="">
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
                    <el-option v-for="item in StateArr" :key="item.value" :label="item.text" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核状态:">
                <el-select v-model="formInline.auditState" clearable class="el-form-item-width" placeholder="">
                    <el-option v-for="item in AuditStateArr" :key="item.value" :label="item.text" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="btnLoading" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="add" v-if="添加">添加</el-button>
                <el-button type="primary" @click="delall" v-if="删除">删除</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border ref="tableRef" style="width: 100%" :height="tableHeight" :header-cell-style="headerStyle" :cell-style="headerCellStyle" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="index" label="序号" align="center" width="60">
            </el-table-column>
            <el-table-column prop="areaName" label="地点" :show-overflow-tooltip="true" align="left">
                <template slot-scope="scope">
                    <span class="check_span" @click="check(scope.row)">{{scope.row.areaName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="grade" label="风险等级" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="accidentType" label="事故类型" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="description" label="风险描述" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="dutyDept" label="主要责任人部门" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="dutyRole" label="主要责任人岗位" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="sort,test" label="管控措施" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{scope.row.sort}}{{test}}
                </template>
            </el-table-column>
            <el-table-column prop="state" label="状态" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="auditState" label="审核状态"  :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <audit-status :data="scope.row" stateField="auditState" reasonField="rejectReason"></audit-status>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300" v-if="编辑 || 删除" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-button style="color: #6a9dca" icon="el-icon-edit-outline" type="text" size="small" @click="editType(scope.row)" v-if="编辑">编辑</el-button>
                    <el-popover :ref="scope.row.id" placement="top" width="180" v-show="删除 && scope.row.auditState == '审核不通过'">
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
        <el-pagination @size-change="handleSizeChange" background :pager-count="5" @current-change="handleCurrentChange" :current-page="formInline.Page" :page-sizes="[10, 20, 30, 40]" :page-size="formInline.PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>

<script>
import {
    getrspRiskList,
    deleterspRisk,
} from "@/api/risk.js";
import { getConfigCategory } from "@/api/configApi.js";
export default {
    data() {
        return {
            formInline: {
                TarName: "",
                Hazard: "",
                AreaName: "",
                DutyRole: "",
                DutyDept: "",
                Specialty: "",
                Grade: "",
                AccidentType: "",
                auditState: "",
                State: "",
                Page: 1,
                PageSize: 20,
            },
            tableData: [],
            total: 0,
            test: "条",
            btnLoading: true,
            tableHeight: 680,
            authorArr: ["浏览", "添加", "编辑", "删除"],
            浏览: true,
            删除: true,
            编辑: true,
            添加: true,
            置顶: true,
            AuditStateArr: [
                { value: "未审核", text: "未审核" },
                { value: "审核通过", text: "审核通过" },
                { value: "审核不通过", text: "审核不通过" },
            ],
            StateArr: [
                { value: "正常", text: "正常" },
                { value: "停用", text: "停用" },
            ],
            SpecialtyArr: [],
            GradeArr: [],
            AccidentTypeArr: [],
            multipleSelection: [],
        };
    },
    mounted() {
        var status = this.publicFun.GetQueryString("status");//页面参数，数据对接页面审核状态传参
        if (status) {
            this.$set(this.formInline, "auditState", status);
        }
        this.initPage();
        this.getHeight();
        window.addEventListener("resize", this.getHeight);
        //获取按钮权限
        let menus = this.publicFun.menusQX("/riskListForm");
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
                if (item.auditState === "审核不通过") {
                    console.log(index);
                    that.$refs.tableRef.toggleRowSelection(item, true);
                } else {
                    that.$refs.tableRef.toggleRowSelection(item, false);
                }
            });
            const list = that.multipleSelection.filter(
                (item) => item.auditState === "审核不通过"
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
            getrspRiskList(this.formInline).then((res) => {
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
                    url: window.rootUrl + "riskDetail?id=" + row.id,
                    title: "风险管控",
                    height: 800,
                    width: 1200,
                },
                function (retCode) { }
            );
        },
        //添加
        add() {
            let self = this;
            openDialog(
                {
                    url: window.rootUrl + "riskEdit",
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
                    url: window.rootUrl + "riskEdit?id=" + row.id,
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
        showArea() {
            let self = this
            openDialog({
                url: AreaSelectTreeUrl,
                title: "选择网格点"
            }, function (retCode) {
                if (retCode) {
                    var arrayid = []
                    var arrayname = []
                    retCode.forEach(j => {
                        arrayid.push(j.id);
                        arrayname.push(j.name);
                    })
                    debugger
                    //self.formInline.Area = arrayid.join(",")
                    self.formInline.AreaName = arrayname.join(",")
                } else {
                    //self.formInline.Area = ""
                    self.formInline.AreaName = ""
                }
            });
        },
        //删除
        delType(row) {
            deleterspRisk(row.id).then((res) => {
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
                            deleterspRisk(ids).then((res) => {
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
        areaClick() {
            //地点
            let self = this;
            openDialog(
                {
                    url: AreaSelectTreeUrl + "?type=r",
                    title: "选择地点信息",
                },
                function (retCode) {
                    if (retCode) {
                        self.formInline.AreaName = retCode[0].name;
                    } else {
                        self.formInline.AreaName = "";
                    }
                }
            );
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
        station() { //选择岗位
            let self = this;
            openDialog({
                url: RoleSelectTreeUrl + "?type=r",
                title: "选择岗位信息"
            }, function (retCode) {
                //选择成功后处理过程
                if (retCode) {
                    self.formInline.DutyRole = retCode[0].name;
                } else {
                    self.formInline.DutyRole = ""
                }
            });
        },
    },
};
</script>
