<script setup lang="ts">
import { ref, reactive, defineAsyncComponent, onMounted } from "vue";
import { Camera } from "@element-plus/icons-vue";
import { getLaminationInfo, getLaminationCheck, LaminationUse } from '@/api/index'
import { ElMessage } from 'element-plus'

import ScanQrcode from '@/components/scan/index.vue'

import { useRouter, useRoute } from 'vue-router'
const HandleDialog = defineAsyncComponent(() => import('@/components/dialog/handle_dialog.vue'));

const route = useRoute()
const suggesteddryfilm: any = ref({});
const dialogTableVisible = ref(false);
const childDialogVis = ref(false);
const padPastingData = reactive({
  batchNumber: "",
  model: "",
  size: "",
  manufacturingDate: "",
  effectiveDate: "",
  effectiveTime: "",
});
const fcradData = ref({
  type: "JOB-001",
  batch: "60个",
  expiry: "D1A3312",
  remain: "0203",
});
const updatefcradData = ref({
  type: "JOB-001",
  batch: "60个",
  expiry: "D1A3312",
  remain: "0203",
});
const otherData = ref<{
  pass: boolean,
  error: string
}>({ pass: false, error: '' })


const showScan = ref(false)

onMounted(() => {
  let film = sessionStorage.getItem('suggesteddryfilm')
  if (typeof film === 'string') {
    suggesteddryfilm.value = JSON.parse(film)
  }

})
const scanCode = () => {
  showScan.value = !showScan.value
}
const inputFocus = () =>{
  window.scrollTo(0,0)
}
const resultChange = (res: any) => {
  if (res) {
    padPastingData.batchNumber = res
  }
  showScan.value = !showScan.value
  scanEnter()
}
//扫码 - 更换干膜信息
const scanEnter = async () => {
  if (!padPastingData.batchNumber) {
    return
  }
  getLaminationInfo({ id: padPastingData.batchNumber }).then((res: any) => {
    if (res && res.batch) {
      padPastingData.batchNumber = res.batch
      padPastingData.model = res.model
      padPastingData.size = res.width + res.width_unit + ' x ' + res.length + res.length_unit
      padPastingData.manufacturingDate = res.manufactured
      padPastingData.effectiveDate = res.expiry
      padPastingData.effectiveTime = res.valid_time
    }
  })
}

//更换干膜检查
const laminationCheck = async () => {
  if (!padPastingData.batchNumber) {
    return
  }
  let line = route.query.line
  let job = route.query.job
  if (typeof line === 'string') {
    line = decodeURIComponent(line)
  }
  if (typeof job === 'string') {
    job = decodeURIComponent(job)
  }
  getLaminationCheck({ id: padPastingData.batchNumber, line: line, job: job }).then((res: any) => {
    if (res) {
      fcradData.value = res.lamination_current
      updatefcradData.value = res.lamination_new
      otherData.value = {
        pass: res.pass,
        error: res.error
      }
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
  let job = route.query.job
  if (typeof line === 'string') {
    line = decodeURIComponent(line)
  }
  if (typeof job === 'string') {
    job = decodeURIComponent(job)
  }
  let params = { id: padPastingData.batchNumber, line: line, job: job }
  let data = {
    email: force ? email : " "
  }
  LaminationUse(params, data).then((res: any) => {
    if (res.status == 'OK') {
      ElMessage.success(`${force ? '强制启动' : '启动'}成功！`)
      dialogTableVisible.value = false
      childDialogVis.value = false
      for (let i in padPastingData) {
        padPastingData[i] = ''
      }
    }
  })
}

</script>
<template>
  <div class="app_d" v-if="!showScan">
    <div style="width: 100%">
      <div class="d-flex header">
        <el-text tag="b" class="padpasting active"></el-text>
      </div>
      <div class="container">
        <div class="container_item p-3">
          <el-text tag="b">请优先使用
            <el-text tag="b" style="color: #C00000">{{ suggesteddryfilm.type }} (批号：{{ suggesteddryfilm.batch
            }})</el-text></el-text>
        </div>
        <el-text tag="b" class="d-flex jc-center m-2" style="margin:10px 0">更换干膜，请扫描干膜二维码 </el-text>
      </div>
      <div class="footer">
        <el-form label-position="right" size="large" :model="padPastingData" label-width="130px"
          style="width: 80%; margin: auto">
          <el-form-item label="干膜批号：">
            <el-input v-model="padPastingData.batchNumber" class="input_size workorder_scan" @change="scanEnter" @focus="inputFocus">
              <template #append>
                <el-button :icon="Camera" @click="scanCode" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="干膜型号：">
            <el-input v-model="padPastingData.model" class="input_size" disabled />
          </el-form-item>
          <el-form-item label="干膜尺码：">
            <el-input v-model="padPastingData.size" class="input_size" disabled />
          </el-form-item>
          <el-form-item label="制造日期：">
            <el-input v-model="padPastingData.manufacturingDate" class="input_size" disabled />
          </el-form-item>
          <el-form-item label="有效日期：">
            <el-input v-model="padPastingData.effectiveDate" class="input_size" disabled />
          </el-form-item>
          <el-form-item label="有效时间：">
            <el-input v-model="padPastingData.effectiveTime" class="input_size" disabled />
          </el-form-item>
          <el-form-item style="float: right">
            <el-button color="#203864" @click="laminationCheck">确定</el-button>
            <el-button color="#203864" style="margin-left: 37px">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogTableVisible" class="dialog-w">
    <el-space fill wrap :fill-ratio="90" direction="vertical" style="width: 100%" :size="40">
      <el-card class="box-card public-card form-item--text">
        <div class="card-header">
          <el-text tag="b" class="d-flex jc-center card-title">贴膜机生产信息</el-text>
          <div class="card-body ">
            <el-form label-position="right" label-width="50%" :model="fcradData">
              <el-form-item label="干膜类型：">
                <span class="el-form-item__label form-item-content_red">{{ fcradData.type }}</span>
              </el-form-item>
              <el-form-item label="干膜批号：">
                <span class="el-form-item__label form-item-content_red">{{ fcradData.batch }}</span>
              </el-form-item>
              <el-form-item label="有效时间：">
                <span class="el-form-item__label form-item-content_red">{{ fcradData.expiry }}</span>
              </el-form-item>
              <el-form-item label="剩下用量：">
                <span class="el-form-item__label form-item-content_red">{{ fcradData.remain }}</span>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
      <el-card class="box-card public-card form-item--text">
        <div class="card-header">
          <el-text tag="b" class="d-flex jc-center card-title">更新干膜信息</el-text>
          <div class="card-body">
            <el-form label-position="right" label-width="50%" :model="updatefcradData">
              <el-form-item label="干膜类型：">
                <span class="el-form-item__label form-item-content_red ">{{ updatefcradData.type }}</span>
              </el-form-item>
              <el-form-item label="干膜批号：">
                <span class="el-form-item__label form-item-content_red">{{ updatefcradData.batch }}</span>
              </el-form-item>
              <el-form-item label="有效时间：">
                <span class="el-form-item__label form-item-content_red">{{ updatefcradData.expiry }}</span>
              </el-form-item>
              <el-form-item label="剩下用量：">
                <span class="el-form-item__label form-item-content_red">{{ updatefcradData.remain }}</span>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
    </el-space>
    <div class="dialog_footer my-3">
      <el-text tag="b" v-if="!otherData.pass">干膜类型错误，</el-text>
      <el-text tag="b">请优先使用 <el-text tag="b" style="color: #C00000">{{ suggesteddryfilm.type }} (批号：{{
        suggesteddryfilm.batch }})</el-text></el-text>
      <div class="my-3">
        <el-button color="#7F7F7F" size="large" @click="start(true)">强制启动</el-button>
        <el-button color="#203864" size="large" @click="start(false)" style="margin-left: 37px">启动</el-button>
      </div>
    </div>
  </el-dialog>
  <HandleDialog v-model="childDialogVis" />

  <ScanQrcode v-if="showScan" @result-change="resultChange" />
</template>
<style>
@import url('./index.scss');
</style>
<style scoped>
.padpasting {
  width: 12rem;
  height: 8rem;
  margin: 0 auto;
  color: #ffffff;
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
  padding: 30px 0 0 0;
}

.container_item {
  width: 450px;
  background-color: #fbe5d6;
  margin: 0 auto;
  box-shadow: 0 0 6px #a09e9e;
}

.main_txt {
  color: #ffffff;
  line-height: 175px;
  font-weight: 600;
}

.app {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog_footer {
  font-size: 16px;
}
</style>