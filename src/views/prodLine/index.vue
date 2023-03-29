<template>
  <div id="prodline" class="h-100 m-2 mt-0" ref="prodlineRef">
    <el-select v-model="state.value" class="m-2" placeholder="" @change="selectChange">
      <el-option v-for="(item, index) in state.prodList" :key="index" :label="item" :value="item" />
    </el-select>

    <div class="d-flex flex-row prod-list--wrap h-45">
      <ProdItem :data="state.prodItemData1" :nextData="state.nextprodItemData1" :leftFiled="state.leftFooterFiled1"
        :rightFiled="state.rightFooterFiled1" :width="true" :dark="true" :identify="true"
        className="d-flex flex-column prod-list--item w-20"></ProdItem>

      <ProdItem :data="state.prodItemData2" :leftFiled="state.leftFooterFiled2"
        className="d-flex flex-column prod-list--item borderrs-2 w-115 ml-2"></ProdItem>

      <ProdItem :data="state.prodItemData3" :nextData="state.nextprodItemData3" :leftFiled="state.leftFooterFiled3"
        :rightFiled="state.rightFooterFiled3" :width="true" :dark="true"
        className="d-flex flex-column prod-list--item borderrs-2 w-20 ml-2"></ProdItem>

      <ProdItem :data="state.prodItemData4" :leftFiled="state.leftFooterFiled4"
        className="d-flex flex-column prod-list--item borderrs-2 w-115 ml-2"></ProdItem>

      <ProdItem :data="state.prodItemData5" :leftFiled="state.leftFooterFiled5" :dark="true"
        className="d-flex flex-column prod-list--item borderrs-2 w-115 ml-2"></ProdItem>

      <ProdItem :data="state.prodItemData6" :leftFiled="state.leftFooterFiled6"
        className="d-flex flex-column prod-list--item borderrs-2 w-115 ml-2"></ProdItem>

      <ProdItem :data="state.prodItemData7" :leftFiled="state.leftFooterFiled7" :dark="true"
        className="d-flex flex-column prod-list--item borderrs-2 w-115 ml-2"></ProdItem>

    </div>

    <ProcessTreatment @click-tap="clickProcessing">
      <div class="d-flex flex-row jc-between h-100 m-1">
        <span class="pionto break-pionto"></span>
      </div>
    </ProcessTreatment>

    <div class="d-flex h-38 mt-2 mb-2 text-white">
      <div class="d-flex flex-column dryfilm-list--wrap w-20">
        <div class="d-flex flex-column h-40 bg-darkgray borderrs-2  m-1 p-2 ">
          <div class="d-flex flex-row jc-between mrt-1 dryfilm-header" id="dryfilm-header">
            <div class="text-white w-25 text-center">干膜类型</div>
            <div class="text-white w-25 text-center">干膜批号</div>
            <div class="text-white w-25 text-center">有效时间</div>
            <div class="text-white w-25 text-center">余料量</div>
          </div>
          <vue3-seamless-scroll :list="state.dryfilmList" :step=".1" class="seamless-warp w-100 border-none"
            ref="seamlessScroll" hover="true" hover-stop="true">
            <div v-for="(item, index) in state.dryfilmList" :key="'dryfilm' + index" class="dryfilm-list--item">
              <div class="d-flex jc-between ai-center ">
                <p class="w-25 text-center my-1">{{ item && item.type }}</p>
                <p class="w-25 text-center my-1">{{ item && item.batch }}</p>
                <p class="w-25 text-center my-1">{{ item && item.valid_time }}</p>
                <p class="w-25 text-center my-1">{{ item && item.remain }}</p>
              </div>
            </div>
          </vue3-seamless-scroll>
        </div>

        <div class="d-flex flex-row h-32">
          <div class="d-flex flex-column w-50 bg-darkgray m-1 p-2 jc-around">
            <div class="d-flex jc-between ai-end mb-1">
              <span class="flex-l">干膜批号</span>
              <span class="flex-r">{{ state.suggesteddryfilm.batch }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
              <span class="flex-l">干膜类型</span>
              <span class="flex-r">{{ state.suggesteddryfilm.type }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
              <span class="flex-l">剩下用量</span>
              <span class="flex-r">{{ state.suggesteddryfilm.remain }}</span>
            </div>
          </div>
          <div class="d-flex flex-column ai-center jc-center w-50 m-1 bg-flesh border-red">
            <span class="clean-title text-black">清洁纸</span>
            <span class="clean-num m-1">{{ state.otherData.cleaning_sheet }}</span>
            <span class="clean-tips">请更换清洁纸</span>
          </div>
        </div>

        <div class="d-flex flex-column jc-center ai-center h-20 bg-darkgray m-1 p-2 warning-mark" v-if="state.otherData && state.otherData.warning.length<=0">
          <span style="font-weight:bold;white-space: nowrap;">请优先使用 <span class="text-jaffa">{{
            state.suggesteddryfilm.type }}（批号：{{ state.suggesteddryfilm.batch }}）</span></span>
        </div>
        <div class="d-flex flex-column jc-center ai-center h-20 bg-darkgray m-1 p-2 warning-mark" v-else>
          <span style="font-weight:bold;white-space: nowrap;" class="text-red">{{ state.otherData.warning }}</span>
        </div>
      </div>

      <div class="d-flex flex-column prod-list--item borderrs-2 w-115 ml-2">
        <div class="h-40 m-1 pt-2 pb-2 mt-0">
          <div class="d-flex flex-column ai-center jc-center w-100 h-100 clean-shadow ">
            <span class="clean-title text-black">清洁纸计数器</span>
            <span class="clean-num m-2">{{ state.otherData.cleaning_sheet_counter }}</span>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column w-20 ml-2 ai-center jc-center">
        <span class="tray" :class="state.otherData.tray_color"></span>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {
  defineAsyncComponent,
  ref,
  reactive,
  onMounted,
  onUnmounted,
  PropType
} from 'vue'
import { useRouter } from 'vue-router'
import { getProdList, getProdlineInfo } from '@/api/index'
const ProcessTreatment = defineAsyncComponent(() => import('./ProcessTreatment.vue'));
const ProdItem = defineAsyncComponent(() => import('@/components/prod-item/index.vue'));
import store from '@/store/index'

interface filedDataType {
  filedName: string,
  name: string
}

interface otherDataType {
  cleaning_sheet_counter: number,
  cleaning_sheet: number,
  cleaning_sheet_reminder: string,
  tray_color_name: string,
  tray_color: string,
  warning: string
}
interface stateType {
  prodList: string[],
  value: string,
  prodItemData1: EmptyObjectType,
  prodItemData2: EmptyObjectType,
  prodItemData3: EmptyObjectType,
  prodItemData4: EmptyObjectType,
  prodItemData5: EmptyObjectType,
  prodItemData6: EmptyObjectType,
  prodItemData7: EmptyObjectType,

  nextprodItemData1: EmptyObjectType,
  nextprodItemData3: EmptyObjectType,

  leftFooterFiled1: Array<filedDataType>,
  rightFooterFiled1: Array<filedDataType>,
  leftFooterFiled2: Array<filedDataType>,
  leftFooterFiled3: Array<filedDataType>,
  rightFooterFiled3: Array<filedDataType>,
  leftFooterFiled4: Array<filedDataType>,
  leftFooterFiled5: Array<filedDataType>,
  leftFooterFiled6: Array<filedDataType>,
  leftFooterFiled7: Array<filedDataType>,

  dryfilmList: EmptyArrayType,
  suggesteddryfilm: EmptyObjectType,
  otherData: otherDataType
}
const state = reactive<stateType>({
  prodList: ["生产线1", "生产线2", "生产线3", "生产线4", "生产线5"],
  value: '生产线1',
  prodItemData1: {},
  prodItemData2: {},
  prodItemData3: {},
  prodItemData4: {},
  prodItemData5: {},
  prodItemData6: {},
  prodItemData7: {},

  nextprodItemData1: {},
  nextprodItemData3: {},
  leftFooterFiled1: [
    { filedName: 'speed', name: '线速度' },
    { filedName: 'spray_pressure', name: '喷淋上压力' },
    { filedName: 'spray_down_pressure', name: ' 喷淋下压力' },
    { filedName: 'temp', name: '烘干温度' },
  ],
  rightFooterFiled1: [
    { filedName: 'preheat_temp', name: '预热机温度' },
    { filedName: 'pressure', name: '贴膜压力' },
    { filedName: 'time', name: ' 压着时间' },
    { filedName: 'front_temp', name: '压轴温度(前)' },
    { filedName: 'back_temp', name: '压轴温度(后)' },
  ],
  leftFooterFiled2: [
    { filedName: 'file', name: '资料软件名' },
    { filedName: 'exposure_energy', name: '曝光实际能量' },
    { filedName: 'x_skew', name: ' 补偿参数X' },
    { filedName: 'y_skew', name: '补偿参数Y' },
  ],
  leftFooterFiled3: [
    { filedName: 'orientation', name: '方向' },
  ],
  rightFooterFiled3: [
    { filedName: 'speed', name: '线速度' },
    { filedName: 'pressure', name: '压力' },
    { filedName: 'temp', name: ' 温度' },
  ],
  leftFooterFiled4: [
    { filedName: 'current', name: '电流' },
    { filedName: 'temp', name: '速度' },
  ],
  leftFooterFiled5: [
    { filedName: 'speed', name: '线速度' },
  ],
  leftFooterFiled6: [
    { filedName: 'temp', name: '温度' },
    { filedName: 'speed', name: '线速度' },
    { filedName: 'pressure', name: ' 压力' },
  ],
  leftFooterFiled7: [
    { filedName: 'first_pass_rate', name: '首次通过率' },
    { filedName: 'pass_rate', name: '最终合格率' },
  ],
  dryfilmList: [],
  suggesteddryfilm: {},
  otherData: {
    cleaning_sheet_counter: 0,
    cleaning_sheet: 0,
    cleaning_sheet_reminder: '',
    tray_color_name: '',
    tray_color: '',
    warning: ''
  }
})
const router = useRouter()

const selectChange = () => {
  getprodLineInfo()
}
const getprodList = async () => {
  await getProdList().then((res: any) => {
    if (res && res.length <= 0) return
    state.prodList = res
    state.value = res[0]
    for(let i in res){
      if(res[i] == store.lineStore.line){
        state.value = res[i]
      }
    }
  })
}
const getprodLineInfo = async () => {
  await getProdlineInfo({ line: state.value || '生产线1' }).then((res) => {
    state.prodItemData1 = res.pre_treatment
    state.nextprodItemData1 = res.lamination
    state.prodItemData2 = res.exposure
    state.prodItemData3 = res.tear_film
    state.nextprodItemData3 = res.developing
    state.prodItemData4 = res.plating
    state.prodItemData5 = res.stripping
    state.prodItemData6 = res.etching
    state.prodItemData7 = res.aoi
    state.dryfilmList = res.lamination_stock
    state.suggesteddryfilm = res.lamination_stock_suggested
    state.otherData = {
      cleaning_sheet_counter: res.cleaning_sheet_counter,
      cleaning_sheet: res.cleaning_sheet,
      cleaning_sheet_reminder: res.cleaning_sheet_reminder,
      tray_color_name: res.tray_color_name,
      tray_color: res.tray_color,
      warning: res.warning,
    }
  })
}
const clickProcessing = async (type: any) => {
  if (!type) return
  sessionStorage.setItem('suggesteddryfilm', JSON.stringify(state.suggesteddryfilm)) //建议干膜
  store.lineStore.setLine(state.value)
  let routers = ['', 'firstHandle', 'padPasting']
  let filedData = ['', 'prodItemData1', 'nextprodItemData1']
  if (!routers[type]) return
  setTimeout(() => {
    router.push({
      name: routers[type],
      query: {
        line: encodeURIComponent(state.value),
        job: encodeURIComponent(state[filedData[type]].process.job)
      },
    })
  }, 0);
}
// 生命周期
onMounted(async () => {
  await getprodList()
  await getprodLineInfo()
})

onUnmounted(() => {
})

</script>

<style lang="scss" scoped>
.prod-list--wrap {
  color: #FFFFFF;
  font-size: 10px;
}

.flex-r {
  text-align: right;
  flex: auto;
  word-break: break-all;
}

.prod-list--item {
  height: 100%;
}

.b-l {
  border: 1px solid #000000;
  border-radius: 5px;
}

.clean-shadow {
  // box-shadow: 1px左右 1px下 5px阴影宽度 1px颜色大小 #000000;
  box-shadow: 0px 0px 4px 0px #555454;
}

.tray {
  width: 60%;
  height: 60%;
  background-size: 100%;
  background-repeat: no-repeat;
}

.tray.green {
  background-image: url('../../assets/tray.png');
}

.tray.blue {
  background-image: url('../../assets/tray_blue.png');
}

.tray.red {
  background-image: url('../../assets/tray_red.png');
}

.desc {
  font-size: 16px;
}

.clean-title {
  font-weight: bold;
}

.clean-num,
.clean-tips {
  font-size: 30px;
  font-weight: bold;
  color: red
}

.clean-tips {
  font-size: 14px;
}

.dryfilm-header {
  font-size: 14px;
  text-decoration: underline;
  text-decoration-color: #FFFFFF;
}

.dryfilm-list--item {
  font-size: 14px;
}

.seamless-warp {
  overflow: hidden;
}

.warning-mark {
  font-size: 16px;
}</style>
