
<script setup lang="ts">
import { ref, reactive, defineAsyncComponent } from "vue";
import { Camera } from "@element-plus/icons-vue";
import { getStartInfo, getStartCheck, Start } from '@/api/index'
import ScanQrcode from '@/components/scan/index.vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from "element-plus";
const HandleDialog = defineAsyncComponent(() => import('@/components/dialog/handle_dialog.vue'));


const dialogTableVisible = ref(false);
const childDialogVis = ref(false);
const form = reactive({
  orderNumber: "",
  materialNumber: "",
  materialCount: "",
  mc: "",
});
const route = useRoute()
const feData: EmptyObjectType = ref({
  "job": "job-002",
  "material": "D1A3312",
  "quantity": 60,
  "tier": "0203",
  "param": [{
    "param": "线速",
    "l": 9,
    "u": 10,
    "value": 9.414845807068316,
    "pass": true,
    "error": ""
  }, {
    "param": "喷淋上压力",
    "l": 5,
    "u": 6,
    "value": 4.829695457954586,
    "pass": false,
    "error": "警告：喷淋上压力超标，无法上板开始工单"
  }, {
    "param": "喷淋上压力",
    "l": 5,
    "u": 6,
    "value": 5.933565860406057,
    "pass": true,
    "error": ""
  }, {
    "param": "烘干温度",
    "l": 50,
    "u": 55,
    "value": 51.85089764944923,
    "pass": true,
    "error": ""
  }],
  "pass": false
})

const showScan = ref(false)

const scanCode = () => {
  showScan.value = !showScan.value
}
const resultChange = (res: any) => {
  if (res) {
    form.orderNumber = res
  }
  showScan.value = !showScan.value
  scanEnter()
}
//扫码 - 前处理上板信息
const scanEnter = async () => {
  if (!form.orderNumber) {
    for (let i in form) {
      form[i] = ''
    }
    return
  }
  getStartInfo({ job: form.orderNumber }).then((res: any) => {
    if (res) {
      form.materialNumber = res.material
      form.materialCount = res.quantity
      form.mc = res.tier
    }
  })
}

//前处理上板检查
const startCheck = async () => {
  if (!form.orderNumber) {
    return
  }
  getStartCheck({ line: route.query.line, job: form.orderNumber }).then((res: any) => {
    if (res && res.job) {
      const warningData = res.param.filter((item: any) => item.error)
      if (warningData.length > 0) { res.error = warningData[0].error }
      feData.value = res
      dialogTableVisible.value = true
    }
  })
}

// 启动/强制启动
const start = async (force: boolean, email?: any) => {
  let tp = force && !email ? true : false
  if (tp) {
    childDialogVis.value = tp
    return
  }
  
  let line = route.query.line

  if (typeof line === 'string') {
    line = decodeURIComponent(line)
  }
  let params = { line: line, job: form.orderNumber }
  let data = {
    email: force ? email : " "
  }
  // ElMessageBox.confirm(
  //   '是否进行'+force?'强制启动':'启动'+'操作？',
  //   '温馨提示',
  //   {
  //     confirmButtonText: 'OK',
  //     cancelButtonText: 'Cancel',
  //     type: 'warning',
  //   }
  // )
  //   .then(() => {

  //   })
  //   .catch(() => {

  //   })
  Start(params, data).then((res: any) => {
    if (res.status == 'OK') {
      ElMessage.success(`${force ? '强制启动' : '启动'}成功！`)
      dialogTableVisible.value = false
      childDialogVis.value = false
      for (let i in form) {
        form[i] = ''
      }
    }
  })
}

</script>
<template>
  <div class="app_d" v-if="!showScan">
    <div style="width: 100%">
      <div class="d-flex header">
        <span class="pretreatment active"></span>
      </div>
      <div class="container m-4">
        <el-text tag="b">前处理上板，请扫描工单二维码</el-text>
      </div>
      <div class="footer">
        <el-form label-position="right" size="large" :model="form" label-width="130px" style="width: 80%; margin: auto">
          <el-form-item label="工单号：">
            <el-input v-model="form.orderNumber" class="input_size workorder_scan" @change="scanEnter">
              <template #append>
                <el-button :icon="Camera" @click="scanCode" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="料号：">
            <el-input v-model="form.materialNumber" class="input_size" disabled />
          </el-form-item>
          <el-form-item label="数量：">
            <el-input v-model="form.materialCount" class="input_size" disabled />
          </el-form-item>
          <el-form-item label="面次：">
            <el-input v-model="form.mc" class="input_size" disabled />
          </el-form-item>
          <el-form-item style="float: right">
            <el-button color="#203864" @click="startCheck">确定</el-button>
            <el-button color="#203864" style="margin-left: 37px">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogTableVisible" class="dialog-w">
    <el-space fill wrap fill-ratio="90" direction="vertical" style="width: 100%" :size="40">
      <el-card class="box-card public-card form-item--text">
        <div class="card-header">
          <el-text tag="b" class="d-flex jc-center card-title">工单上板信息</el-text>
          <div class="d-flex jc-center card-body">
            <el-form label-position="left" label-width="140px" :model="feData">
              <el-form-item label="工单号：">
                <span class="el-form-item__label card-desc">{{ feData.job }}</span>
              </el-form-item>
              <el-form-item label="生产数量：">
                <span class="el-form-item__label card-desc">{{ feData.quantity }}</span>
              </el-form-item>
              <el-form-item label="料号：">
                <span class="el-form-item__label card-desc">{{ feData.material }}</span>
              </el-form-item>
              <el-form-item label="面次：">
                <span class="el-form-item__label card-desc">{{ feData.tier }}</span>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
      <el-card class="box-card public-card form-item--text" style="background-color: #DEEBF7;">
        <div class="d-flex jc-between card-title--header">
          <el-text tag="b" class="card-title" style="text-align: left;">工艺参数</el-text>
          <el-text tag="b" class="card-title" style="text-align: right;">实际参数</el-text>
        </div>
        <div class="card-header">
          <el-form label-position="left" label-width="50%" :model="feData">
            <el-form-item v-for="(item, index) in feData.param" :key="index" :label="item.param + '：'">
              <span class="el-form-item__label card-desc" :class="item.error.length > 0 ? 'text-red' : ''">{{ item.value
              }}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-space>
    <div class="dialog_footer">
      <el-text class="mx-1 el-text_wraning text-red">{{ feData.error }}</el-text>
      <div class="my-3">
        <el-button color="#7F7F7F" size="large" @click="start(true)">强制启动</el-button>
        <el-button color="#203864" size="large" @click="start(false)" style="margin-left: 37px">启动</el-button>
      </div>
    </div>
  </el-dialog>

  <HandleDialog v-model="childDialogVis" @login="start" />

  <ScanQrcode v-if="showScan" @result-change="resultChange" />
</template>

<style >
@import url(./index.scss);
</style>

<style scoped>
.pretreatment {
  width: 12rem;
  height: 8rem;
  margin: 0 auto;
}


.app_d {
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


.container {
  text-align: center;
  flex-direction: column;
}

.container_item {
  line-height: 90px;
  width: 70%;
  background-color: #fbe5d6;
  margin: 0 auto;
  box-shadow: 0 0 6px #a09e9e;
}

.main_txt {
  color: #ffffff;
  line-height: 175px;
  font-weight: 600;
}

.header {
  color: #FFFFFF;
  font-weight: bold;
}

.app {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>