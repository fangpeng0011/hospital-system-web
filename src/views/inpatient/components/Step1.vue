<template>
  <div>
    <el-row :gutter="15">
      <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px">
        <el-col :span="24">
          <el-form-item label="是否在院" prop="field101">
            <el-radio-group v-model="formData.field101" size="medium">
              <el-radio v-for="(item, index) in field101Options" :key="index" :label="item.value"
                        :disabled="item.disabled">{{item.label}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="field104">
            <el-input v-model="formData.field104" placeholder="请输入姓名" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="field111">
            <el-radio-group v-model="formData.field111" size="medium">
              <el-radio v-for="(item, index) in field111Options" :key="index" :label="item.value"
                        :disabled="item.disabled">{{item.label}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生年月" prop="field108">
            <el-date-picker v-model="formData.field108" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            :style="{width: '100%'}" placeholder="请选择出生年月" clearable></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="民族" prop="field110">
            <el-select v-model="formData.field110" placeholder="请选择民族" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in field110Options" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="籍贯" prop="field105">
            <el-input v-model="formData.field105" placeholder="请输入籍贯" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="婚姻" prop="field124">
            <el-radio-group v-model="formData.field124" size="medium">
              <el-radio v-for="(item, index) in field124Options" :key="index" :label="item.value"
                        :disabled="item.disabled">{{item.label}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="家庭住址" prop="field114">
            <el-input v-model="formData.field114" placeholder="请输入家庭住址" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作单位" prop="field118">
            <el-input v-model="formData.field118" placeholder="请输入工作单位" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="field116">
            <el-input v-model="formData.field116" placeholder="请输入身份证号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="社保账号" prop="field117">
            <el-input v-model="formData.field117" placeholder="请输入社保账号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="门诊医师" prop="field126">
            <el-select v-model="formData.field126" placeholder="请选择门诊医师" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in field126Options" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入院级别" prop="field127">
            <el-input v-model="formData.field127" placeholder="请输入入院级别" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="门诊情况" prop="field128">
            <el-input v-model="formData.field128" type="textarea" placeholder="请输入门诊情况"
                      :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="pay-button-group">
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="handleSubmit">下一步</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    props: [],
    data() {
      return {
        formData: {
          field101: 0,
          field104: undefined,
          field111: undefined,
          field108: "2021-02-17",
          field110: 1,
          field105: undefined,
          field124: undefined,
          field114: "",
          field118: undefined,
          field116: undefined,
          field117: undefined,
          field126: 1,
          field127: undefined,
          field128: undefined,
        },
        rules: {
          field101: [{
            required: true,
            message: '是否在院不能为空',
            trigger: 'change'
          }],
          field104: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          field111: [{
            required: true,
            message: '性别不能为空',
            trigger: 'change'
          }],
          field108: [{
            required: true,
            message: '请选择出生年月',
            trigger: 'change'
          }],
          field110: [{
            required: true,
            message: '请选择民族',
            trigger: 'change'
          }],
          field105: [{
            required: true,
            message: '请输入籍贯',
            trigger: 'blur'
          }],
          field124: [{
            required: true,
            message: '婚姻不能为空',
            trigger: 'change'
          }],
          field114: [{
            required: true,
            message: '请输入家庭住址',
            trigger: 'blur'
          }],
          field118: [{
            required: true,
            message: '请输入工作单位',
            trigger: 'blur'
          }],
          field116: [{
            required: true,
            message: '请输入身份证号',
            trigger: 'blur'
          }],
          field117: [{
            required: true,
            message: '请输入社保账号',
            trigger: 'blur'
          }],
          field126: [{
            required: true,
            message: '请选择门诊医师',
            trigger: 'change'
          }],
          field127: [{
            required: true,
            message: '请输入入院级别',
            trigger: 'blur'
          }],
          field128: [{
            required: true,
            message: '请输入门诊情况',
            trigger: 'blur'
          }],
        },
        field101Options: [{
          "label": "在院",
          "value": 0
        }, {
          "label": "当日",
          "value": 1
        }],
        field111Options: [{
          "label": "男",
          "value": 0
        }, {
          "label": "女",
          "value": 1
        }],
        field110Options: [{
          "label": "选项一",
          "value": 1
        }, {
          "label": "选项二",
          "value": 2
        }],
        field124Options: [{
          "label": "是",
          "value": 1
        }, {
          "label": "否",
          "value": 2
        }],
        field126Options: [{
          "label": "选项一",
          "value": 1
        }, {
          "label": "选项二",
          "value": 2
        }],
      }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {
      resetForm() {
        this.$refs['elForm'].resetFields()
      },
      handleSubmit() {
        this.$emit('change-step', 2, this.form)
      },
    }
  }

</script>
<style>
</style>

<style lang="scss" scoped>
  .pay-button-group {
    display: block;
    margin: 20px auto;
    text-align: center;
  }
</style>


