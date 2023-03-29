<script setup lang='ts'>
import { reactive, ref, defineEmits } from "vue";
import { WarningFilled } from "@element-plus/icons-vue";
import { login } from '@/api/index'
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from 'element-plus'
interface Props {
  dialogVisible: boolean
}
const props = withDefaults(defineProps<Props>(), {
  dialogVisible: true
})

const emit = defineEmits(['login'])
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  email: [
    { required: true, message: '请输入邮箱' }
  ],
  password: [
    { required: true, message: '请输入密码' }
  ],
})
const formData = reactive({
  email: '',
  password: ''
})
const loginForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
  })
  login(formData).then((res: any) => {
    if (res.status == 'OK') {
      emit('login', true, formData.email)
    }
  })
}
</script>
<template>
  <el-dialog :modelValue="dialogVisible" width="350px" align-center>
    <template #title>
      <span class="login-title">
        <WarningFilled style="color:red ;width: 1em; height: 1em; margin-right: 8px" />请输入管理员信息继续执行
      </span>
    </template>
    <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-position="right" label-width="45%" class="login-form">
      <el-form-item label="用户名称：" prop="email" >
        <el-input v-model="formData.email" class="login-text" />
      </el-form-item>
      <el-form-item label="密码：" prop="password" >
        <el-input v-model="formData.password" class="login-text" />
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button color="#203864" size="large" @click="loginForm(ruleFormRef)">确定</el-button>
        <el-button color="#203864" size="large">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>
.login-title,
.login-form {
  font-size: 18px;
  font-weight: 600;
}
.login-text {
  font-size: 18px;
}
.login-title {
  font-size: 20px;
}

.el-dialog__footer {
  text-align: center !important;
}
.el-form-item{
  margin-bottom: 20px !important;
}
.el-form-item__label {
  display: inline-flex !important;
}</style>