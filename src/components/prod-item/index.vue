<template>
    <div :class="className" v-if="width">
        <div class="d-flex flex-column h-40 m-1 p-2 borderrs-2 " :class="dark ? 'bg-darkgray' : 'bg-lightgray'">
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">工单号</span>
                <span class="flex-r">{{ data && data.process && data.process.job }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">料号</span>
                <span class="flex-r">{{ data && data.process && data.process.material }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">数量</span>
                <span class="flex-r">{{ data && data.process && data.process.quantity }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">面次</span>
                <span class="flex-r">{{ data && data.process && data.process.tier }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">开始时间</span>
                <span class="flex-r">{{ formatTime(data && data.process && data.process.start, 'MM-dd HH:mm', true) }}</span>
            </div>
        </div>
        <div class="d-flex flex-column h-20 m-1 p-2 borderrs-2 " :class="dark ? 'bg-darkgray' : 'bg-lightgray'">
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">下个工单</span>
                <span class="flex-r">{{ data && data.next_process && data.next_process.job }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">料号</span>
                <span class="flex-r">{{ data && data.next_process && data.next_process.material }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">数量</span>
                <span class="flex-r">{{ data && data.next_process && data.next_process.quantity }}</span>
            </div>
        </div>
        <div class="d-flex flex-row h-40">
            <div class="d-flex flex-column w-50 m-1 p-2 borderrs-2" :class="dark ? 'bg-darkgray' : 'bg-lightgray'">
                <div class="d-flex jc-between ai-end mb-1" v-for="(item, index) in leftFiled" :key="index">
                    <span class="flex-l">{{ item && item.name }}</span>
                    <span class="flex-r">{{ data[item.filedName] }}</span>
                </div>
            </div>
            <div class="d-flex flex-column w-50 m-1 p-2 borderrs-2"
                :class="[dark ? 'bg-darkgray' : 'bg-lightgray', identify ? 'border-red' : '']">
                <div class="d-flex jc-between ai-end mb-1" v-for="(item, index) in rightFiled" :key="index">
                    <span class="flex-l">{{ item && item.name }}</span>
                    <span class="flex-r">{{ nextData[item.filedName] }}</span>
                </div>
                <p class="d-flex jc-center spotcheck text-jaffa" v-if="identify">请进行点检</p>
            </div>
        </div>
    </div>
    <div :class="className" v-else>
        <div class="d-flex flex-column h-40 m-1 p-2 borderrs-2" :class="dark ? 'bg-darkgray' : 'bg-lightgray'">
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">工单号</span>
                <span class="flex-r">{{ data && data.process && data.process.job }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">料号</span>
                <span class="flex-r">{{ data && data.process && data.process.material }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">数量</span>
                <span class="flex-r">{{ data && data.process && data.process.quantity }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">面次</span>
                <span class="flex-r">{{ data && data.process && data.process.tier }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">开始时间</span>
                <span class="flex-r">{{ formatTime(data && data.process && data.process.start, 'MM-dd HH:mm', true) }}</span>
            </div>
        </div>
        <div class="d-flex flex-column h-20  m-1 p-2 borderrs-2" :class="dark ? 'bg-darkgray' : 'bg-lightgray'">
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">下个工单</span>
                <span class="flex-r">{{ data && data.next_process && data.next_process.job }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">料号</span>
                <span class="flex-r">{{ data && data.next_process && data.next_process.material }}</span>
            </div>
            <div class="d-flex jc-between ai-end mb-1">
                <span class="flex-l">数量</span>
                <span class="flex-r">{{ data && data.next_process && data.next_process.quantity }}</span>
            </div>
        </div>
        <div class="d-flex flex-column h-40">
            <div class="m-1 p-2 borderrs-2 h-100" :class="dark ? 'bg-darkgray' : 'bg-lightgray'">
                <div class="d-flex jc-between ai-end mb-1" v-for="(item, index) in leftFiled" :key="index">
                    <span class="flex-l">{{ item && item.name }}</span>
                    <span class="flex-r">{{ data[item.filedName] }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { formatTime } from '@/utils/index'
import { onMounted } from 'vue';


interface filedData {
    filedName: string,
    name: string
}
// 定义父组件传过来的值
const props = defineProps({
    // 列表内容
    data: {
        type: Object,
        default: {}
    },
    field: {
        type: Array,
        default: () => []
    },
    className: {
        type: String,
        default: ''
    },
    dark: {
        type: Boolean,
        default: false
    },
    width: {
        type: Boolean,
        default: false
    },
    nextData: {
        type: Object,
        default: {}
    },
    leftFiled: {
        type: Array<filedData>,
        default: () => []
    },
    rightFiled: {
        type: Array<filedData>,
        default: () => []
    },
    identify: {
        type: Boolean,
        default: false
    }
})
onMounted(() => {
})
</script>

<style scoped>
.bg-lightgray {
    color: #000000;
}

.flex-r {
    text-align: right;
    flex: auto;
    word-break: break-all;
}
</style>