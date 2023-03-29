<template>
  <div class="app">
    <router-view />
  </div>
</template>
<script setup lang="ts">
import useDraw from '@/utils/useDraw'
import { onMounted } from 'vue'
const { setRem } = useDraw()
onMounted(() => {
  setRem()
  window.onresize = () => {
    setRem()
  }
})

</script>
<style lang="scss">
.pionto {
  width: 15px;
  background-image: url('./assets/pointTo.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

//前处理
.pretreatment {
  position: relative;
  background-image: url('./assets/pretreatment.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.pretreatment.active {
  background-image: url('./assets/pretreatment_blue1.png');
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

.aoi {
  position: relative;
  background-color: #a5a5a5;
  margin: 20px 0;
}

.app {
  min-width: 1000px;
  width: 100vw;
  height: 100vh;
  background-color: #FFFFFF;
  // min-width: 1300px !important;
}
.border-red{
  border: 2px solid #c00000;
}
html,body,#app{
  width: 100%;
  height: 100%;
}

//scale适配
// #app {
//   width: 1920px;
//   display: flex;
//   justify-content: left;
//   overflow: hidden;
//   position: fixed;
//   top: 0;
//   left: 50%;
//   right: 0;
//   bottom: 0;
// }
</style>