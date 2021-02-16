<template>
  <div>
    <el-row :gutter="15">
      <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px">
        <el-col :span="12">
          <el-form-item label="住院号" prop="field108">
            <el-input v-model="formData.field108" placeholder="请输入住院号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="科室" prop="field101">
            <el-select v-model="formData.field101" placeholder="请选择下拉选择科室" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in field101Options" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="病房" prop="field103">
            <el-select v-model="formData.field103" placeholder="请选择病房" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in field103Options" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="病床号" prop="field113">
            <el-input v-model="formData.field113" placeholder="请输入病床号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预交费" prop="field113">
            <el-input v-model="formData.field1111" placeholder="请输入金额" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="pay-button-group">
      <el-button @click="handlePrev">上一步</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">
        提交
      </el-button>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    props: [],
    data() {
      return {
        loading: false,
        formData: {
          field108: undefined,
          field101: 2,
          field103: 2,
          field113: undefined,
          field114: null,
          field1111: 0,
        },
        rules: {
          field108: [{
            required: true,
            message: '请输入住院号',
            trigger: 'blur'
          }],
          field101: [{
            required: true,
            message: '请选择下拉选择科室',
            trigger: 'change'
          }],
          field103: [{
            required: true,
            message: '请选择病房',
            trigger: 'change'
          }],
          field113: [{
            required: true,
            message: '请输入病床号',
            trigger: 'blur'
          }],
          field114: [{
            required: true,
            message: '请输入医嘱',
            trigger: 'blur'
          }],
          field1111: [{
            required: true,
            message: '请输入金额',
            trigger: 'blur'
          }],
        },
        field101Options: [{
          "label": "选项一",
          "value": 1
        }, {
          "label": "选项二",
          "value": 2
        }],
        field103Options: [{
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
      handleSubmit() {
        this.loading = true
        setTimeout(() => {
          this.$emit('change-step', 3)
          this.loading = false
        }, 2000)
      },
      handlePrev() {
        this.$emit('change-step', 1)
      },
    },
  }

</script>
<style lang="scss" scoped>
  .pay-button-group {
    display: block;
    margin: 20px auto;
    text-align: center;
  }
</style>
