<template>
    <div class="page-scan">
        <!-- 扫码区域 -->
        <div class="QrCode">
            <video ref="video" height="100%" width="100%" id="video" autoplay></video>
        </div>
        <!-- 扫码样式一 -->
        <div class="Qr_scanner">
            <div class="box">
                <div class="line_row">
                    <div class="line"></div>
                </div>
                <div class="angle"></div>
            </div>
        </div>

    </div>
</template>
  
<script lang="ts" setup>
// WebRTC适配器 只需要引入就ok
import 'webrtc-adapter'
import { BrowserMultiFormatReader } from '@zxing/library'
import { ref, onMounted, defineEmits } from 'vue'

import { showLoading, hideLoading } from '@/utils/index'
const codeReader: any = ref(null)

const emit = defineEmits(['resultChange'])
const openScan = () => {
    
    codeReader.value
        .listVideoInputDevices()
        .then((videoInputDevices: any) => {
            // 默认获取最后一个摄像头设备id，不确定是不是后置摄像头
            let firstDeviceId = videoInputDevices[videoInputDevices.length - 1].deviceId
            // 获取第一个摄像头设备的名称
            const videoInputDeviceslablestr = JSON.stringify(
                videoInputDevices[videoInputDevices.length - 1].label
            )
            if (videoInputDevices.length > 1) {
                // 判断是否后置摄像头
                if (videoInputDeviceslablestr.indexOf('back') > -1) {
                    firstDeviceId = videoInputDevices[videoInputDevices.length - 1].deviceId
                } else {
                    firstDeviceId = videoInputDevices[videoInputDevices.length - 1].deviceId
                }
            }
            codeReader.value && codeReader.value.reset() // 重置
            decodeFromInputVideoFunc(firstDeviceId)
        })
        .catch((err: any) => {
            console.error(err)
        })
}

const decodeFromInputVideoFunc = (firstDeviceId:any) => {
    let that = this
    hideLoading()
    codeReader.value.decodeFromInputVideoDeviceContinuously(
        firstDeviceId,
        'video',
        (result:any, err:any) => {
            if (result) {
                // alert(result)
                // if (result.text) {
                //     this.clickIndexLeft(result.text)
                // }
                emit('resultChange', result)
            }
            if (err && !err) {
                console.error(err)
            }
        }
    )
}
// 停止扫描，并返回上一页
const clickIndexLeft = (result:any) => {
    codeReader.value && codeReader.value.reset()
    codeReader.value = null
}
onMounted(() => {
    showLoading()
    codeReader.value = new BrowserMultiFormatReader()
    openScan()
})

</script>
  
<style lang="scss" scope>
.QrCode {
    width: 100vw;
    height: 100vh;
    position: relative;

    #video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.Qr_scanner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.Qr_scanner .box {
    width: 75vw;
    height: 75vh;
    max-height: 75vh;
    max-width: 75vw;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgb(43, 113, 254);

    .line_row {
        width: 100%;
        overflow: hidden;
        background-image: linear-gradient(0deg,
                transparent 24%,
                rgba(136, 176, 255, 0.1) 25%,
                rgba(136, 176, 255, 0.1) 26%,
                transparent 27%,
                transparent 74%,
                rgba(136, 176, 255, 0.1) 75%,
                rgba(136, 176, 255, 0.1) 76%,
                transparent 77%,
                transparent),
            linear-gradient(90deg,
                transparent 24%,
                rgba(136, 176, 255, 0.1) 25%,
                rgba(136, 176, 255, 0.1) 26%,
                transparent 27%,
                transparent 74%,
                rgba(136, 176, 255, 0.1) 75%,
                rgba(136, 176, 255, 0.1) 76%,
                transparent 77%,
                transparent);
        background-size: 3rem 3rem;
        background-position: -1rem -1rem;
        animation: Heightchange 2s infinite;
        animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
        animation-delay: 1.4s;
        border-bottom: 1px solid rgba(136, 176, 255, 0.1);
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
}

.Qr_scanner .line {
    width: 100%;
    height: 3px;
    background: #2b71fe;
    // opacity: 0.58;
    filter: blur(4px);
}

.Qr_scanner .box:after,
.Qr_scanner .box:before,
.Qr_scanner .angle:after,
.Qr_scanner .angle:before {
    content: '';
    display: block;
    position: absolute;
    width: 78px;
    height: 78px;
    border: 0.3rem solid transparent;
}

.Qr_scanner .box:after,
.Qr_scanner .box:before {
    top: -7px;
    border-top-color: #2b71fe;
}

.Qr_scanner .angle:after,
.Qr_scanner .angle:before {
    bottom: -7px;
    border-bottom-color: #2b71fe;
}

.Qr_scanner .box:before,
.Qr_scanner .angle:before {
    left: -7px;
    border-left-color: #2b71fe;
}

.Qr_scanner .box:after,
.Qr_scanner .angle:after {
    right: -7px;
    border-right-color: #2b71fe;
}

@keyframes radar-beam {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes Heightchange {
    0% {
        height: 0;
    }

    100% {
        height: 100%;
    }
}

#video {
    -webkit-filter: brightness(100%);
    filter: brightness(100%);
}</style>
