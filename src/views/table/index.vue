<template>
  <el-container>
    <el-main class="vs-workbench-main-scoped">
      <el-card shadow="never" class="vs-workbench-card-scoped">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item style="float: left">
            <label>医生姓名:</label>
            <el-input
              prefix-icon="el-icon-search"
              placeholder="请输入内容"
              v-model="selectByname"
              style="width: 180px"
              clearable
            ></el-input>
            <el-button
              icon="el-icon-search"
              type="primary"
              @click="selectAll()"
            >搜索
            </el-button
            >
          </el-form-item>
          <el-form-item style="float: right">
            <el-button
              @click="removeDataByIds"
              type="primary"
              icon="el-icon-delete"
            >批量删除
            </el-button
            >
            <el-button @click="addView()" plain icon="el-icon-plus" type="warning"
            >新增
            </el-button
            >
          </el-form-item>
        </el-form>
        <div style="margin-top: 10px">
          <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%; margin-top: 5px"
            tooltip-effect="dark"
            height="calc(100vh - 355px)"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              type="index"
              :index="indexMethod"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="doctorNumber"
              label="工号"
              min-width="160"
              header-align="center"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="doctorName"
              label="姓名"
              min-width="200"
              header-align="center"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="doctorSex"
              label="性别"
              min-width="200"
              header-align="center"
              align="left"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.doctorSex == '1'">男</span>
                <span v-if="scope.row.doctorSex == '0'">女</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="doctorBirthday"
              label="出生日期"
              min-width="180"
              column-key="date"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="doctorPosition"
              label="职称"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                <el-tag :type="scope.row.doctorPosition === '医生'?'':'success'">
                  {{scope.row.doctorPosition}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              min-width="250"
            >
              <template slot-scope="scope">
                <!-- 修改 -->
                <el-button
                  type="text"
                  style="border: none"
                  size="mini"
                  @click="handleEdit(scope.row)"
                >
                  [修改]
                </el-button>
                <el-button
                  type="text"
                  style="border: none"
                  size="mini"
                  @click="removeDataById(scope.row.id)"
                >[删除]
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--分页区域-->
        <el-row class="container-table">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </el-row>
      </el-card>
    </el-main>

    <!--加载修改面试信息弹窗-->
    <el-dialog
      :visible="ViewDialogFormVisible"
      top="20vh"
      width="700px"
      @close="closeEditDialog"
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="updateForm">
        <el-form-item label="姓名:" style="margin-left: 100px" prop="name">
          <el-input v-model="form.doctorName" autocomplete="off" style="width: 300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别:" style="margin-left: 100px" prop="sex">
          <el-select v-model="form.doctorSex" placeholder="请选择活动区域" clearable>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职称:" style="margin-left: 100px" prop="position">
          <el-select v-model="form.doctorPosition" placeholder="请选择活动区域" clearable>
            <el-option label="医师" value="医师"></el-option>
            <el-option label="医生" value="医生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期:" style="margin-left: 100px" prop="birthday">
          <el-date-picker
            v-model="form.doctorBirthday"
            type="date"
            placeholder="选择日期"
            clearable>
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="updateForm">确 定</el-button>
      </div>
    </el-dialog>


    <!--加载修改面试信息弹窗-->
    <el-dialog
      :visible="DialogFormVisible"
      top="20vh"
      width="700px"
      @close="closeAddDialog"
      :close-on-click-modal="false"
    >
      <el-form :model="addForm" :rules="rules" ref="addsForm">
        <el-form-item label="姓名:" style="margin-left: 100px" prop="name">
          <el-input v-model="addForm.doctorName" autocomplete="off" style="width: 300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别:" style="margin-left: 100px" prop="sex">
          <el-select v-model="addForm.doctorSex" placeholder="请选择活动区域" clearable>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职称:" style="margin-left: 100px" prop="position">
          <el-select v-model="addForm.doctorPosition" placeholder="请选择活动区域" clearable>
            <el-option label="医师" value="医师"></el-option>
            <el-option label="医生" value="医生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期:" style="margin-left: 100px" prop="birthday">
          <el-date-picker
            v-model="addForm.doctorBirthday"
            type="date"
            placeholder="选择日期"
            clearable>
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="saveDoctor">确 定</el-button>
      </div>
    </el-dialog>


  </el-container>
</template>

<script>
  import axios from 'axios'
  import {getDoctorList, updateDoctorInfo, deleteTeacherId, deleteDoctorIds, addDoctor} from '../../api/table'

  export default {
    name: "index",
    data() {
      return {
        selectByname: "", //姓名查询条件
        //分页
        total: 0, //总条数
        currentPage: 1, //当前页码数
        pageSize: 5, //当前选择得每页条数
        //列表得参数存储集合
        tableData: [], //显示各行数据数组
        //多选数组
        multipleSelection: [],
        ViewDialogFormVisible: false,
        DialogFormVisible: false,
        ids: [],
        //数据库传值
        viewIds: [],
        //父子组件传参
        editId: "",
        postTypeDic: [],
        statusTypeDic: [],
        operaTypeDic: [],
        formInline: [],
        form: {
          id: "",
          doctorName: "",
          doctorSex: "",
          doctorPosition: "",
          doctorBirthday: ""
        },
        addForm: {
          id: "",
          doctorName: "",
          doctorSex: "",
          doctorPosition: "",
          doctorBirthday: ""
        },
        rules: {
          doctorName: [{required: true, message: "姓名不能为空", trigger: "blur"}],
          doctorSex: [{required: true, message: "性别不能为空", trigger: "change"}],
          doctorPosition: [{required: true, message: "职位不能为空", trigger: "change"}],
          doctorBirthday: [{required: true, message: "出生日期不能为空", trigger: "blur"}]
        }
      };
    },
    methods: {
      /**
       * 页面数据条数改变时
       */
      handleSizeChange(val) {
        this.pageSize = val;
        this.selectAll();
      },
      /**
       * 翻页 页数发生改变时触发
       */
      handleCurrentChange(val) {
        this.currentPage = val;
        this.selectAll();
      },
      /**
       * 编辑弹窗
       */
      handleEdit(row) {
        this.form.doctorName = row.doctorName
        this.form.doctorSex = row.doctorSex
        this.form.doctorBirthday = new Date(row.doctorBirthday)
        this.form.doctorPosition = row.doctorPosition
        this.form.id = row.id
        this.editId = row.id;
        console.log(row)
        this.ViewDialogFormVisible = true;
      },

      addView() {
        this.DialogFormVisible = true;
      },
      removeDataById(id) {
        console.log(id)
        let _this = this
        this.$confirm('此操作将永久删除医生记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {  //点击确定，执行then方法
          //调用删除的方法
          deleteTeacherId(id)
            .then(response => {//删除成功
              //提示信息
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              _this.selectAll()
            })
        }) //点击取消，执行catch方法
      },
      removeDataByIds() {
        let _this = this
        this.$confirm('此操作将永久删除医生记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {  //点击确定，执行then方法
          //调用删除的方法
          deleteDoctorIds(this.multipleSelection)
            .then(response => {//删除成功
              //提示信息
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              _this.selectAll()
            })
        }) //点击取消，执行catch方法
      },

      handleSelectionChange(val) {
        val.forEach(datas => {
          this.multipleSelection.push(datas.id)
        })
      },

      //查询全部
      selectAll() {
        let param = {
          page: this.currentPage,
          rows: this.pageSize,
          doctorName: this.selectByname,
        };
        getDoctorList(param)
          .then((response) => {
            this.tableData = response.data.rows;
            console.log(this.tableData);
            this.total = response.data.total;
          });
      },
      updateForm() {
        let _this = this
        let params = {
          doctorNumber: this.form.id,
          doctorName: this.form.doctorName,
          doctorSex: this.form.doctorSex,
          doctorBirthday: this.form.doctorBirthday.toISOString().substring(0, 10),
          doctorPosition: this.form.doctorPosition
        }
        updateDoctorInfo(params).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.ViewDialogFormVisible = false
          _this.selectAll()
        }).catch((response) => {
          // console.log(response)
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        })
      },
      //添加讲师的方法
      saveDoctor() {
        let params = {
          doctorName: this.addForm.doctorName,
          doctorSex: this.addForm.doctorSex,
          doctorBirthday: this.addForm.doctorBirthday.toISOString().substring(0, 10),
          doctorPosition: this.addForm.doctorPosition
        }
        addDoctor(params)
          .then(response => {
            //提示信息
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.closeAddDialog()
            this.selectAll()
          })
      },
      /**
       * 序号
       */
      indexMethod(index) {
        return index + this.pageSize * (this.currentPage - 1) + 1;
      },
      closeEditDialog() {
        this.$refs['updateForm'].resetFields()
        this.ViewDialogFormVisible = false;
      },
      closeAddDialog() {
        this.$refs['addsForm'].resetFields()
        this.DialogFormVisible = false
      }
    },
    created() {
      this.selectAll()
    }
  };
</script>

<style scoped>
</style>
