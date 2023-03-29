<template>
  <div class="d-flex flex-row h-12 process_step">
    <div class="w-20">
      <div class="d-flex flex-row jc-between ai-center h-100 m-1">
        <span class="pretreatment w-45 h-80" :class="{ active: state.type == 1 }" @click="processTap(1)"></span>
        <span class="pionto w-8 h-100"></span>
        <span class="padpasting w-45 h-80" :class="{ active: state.type == 2 }" @click="processTap(2)"></span>
      </div>
    </div>

    <slot></slot>

    <div class="w-115">
      <div class="d-flex flex-row ai-center h-100 m-1">
        <span class="exposure w-100 h-80" @click="processTap"></span>
      </div>
    </div>

    <slot></slot>

    <div class="w-20">
      <div class="d-flex flex-row jc-between ai-center h-100 m-1">
        <span class="peel w-45 h-50" @click="processTap"></span>
        <span class="pionto w-8 h-100"></span>
        <span class="develop w-45 h-80" @click="processTap"></span>
      </div>
    </div>

    <slot></slot>

    <div class="w-115 ">
      <div class="d-flex flex-row ai-center h-100 m-1">
        <span class="electroplate w-100 h-80" @click="processTap"></span>
      </div>
    </div>

    <slot></slot>

    <div class="w-115 ">
      <div class="d-flex flex-row ai-center h-100 m-1">
        <span class="defilm w-100 h-50" @click="processTap"></span>
      </div>
    </div>

    <slot></slot>

    <div class="w-115">
      <div class="d-flex flex-row ai-center h-100 m-1">
        <span class="etch w-100 h-80" @click="processTap"></span>
      </div>
    </div>

    <slot></slot>

    <div class="w-115">
      <div class="d-flex flex-row ai-center h-100 m-1">
        <span class="aoi w-100 h-80"></span>
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
  defineEmits
} from 'vue'
const state = reactive({
  type: 0
})
const emit = defineEmits(['clickTap'])
const processTap = (type:number) => {
  if (!type) return
  state.type = state.type == type ? 0 : type
  emit('clickTap',type)
}
</script>

<style lang="scss" scoped>
.process_step {
  color: #FFFFFF;
  font-weight: bold;
  font-size: 24px;
}
.padpasting.active,
.exposure.active,
.peel.active,
.develop.active,
.electroplate.active,
.defilm.active,
.etch.active,
.aoi.active {
  background-image: linear-gradient(#5b80cb, #3063bc);
}

.pretreatment::after {
  content: '前处理';
}

//贴膜
.padpasting,
.exposure,
.peel,
.develop,
.electroplate,
.defilm,
.etch,
.aoi {
  position: relative;
  background-color: #a5a5a5;
  margin: 20px 0;
}

.pretreatment::after,
.padpasting::after,
.exposure::after,
.peel::after,
.develop::after,
.electroplate::after,
.defilm::after,
.etch::after,
.aoi::after {
  position: absolute;
  width: 100%;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.padpasting::after {
  content: '贴膜';
}

//曝光
.exposure::after {
  content: '曝光';
}

//撕膜
.peel::after {
  content: '撕膜';
}

//显影
.develop::after {
  content: '显影';
}

//电镀
.electroplate::after {
  content: '电镀';
}

//退膜
.defilm::after {
  content: '退膜';
}

//蚀刻
.etch::after {
  content: '蚀刻';
}

.aoi::after {
  content: 'AOI';
}
</style>