import { ref } from 'vue'

export default function useDraw() {
  // * 指向最外层容器
  const appRef = ref()
  // * 定时函数
  const timer = ref(0)
  // * 默认缩放值
  const scale = {
    width: '1',
    height: '1',
  }
  // * 设计稿尺寸（px）
  const baseWidth = 1920
  const baseHeight = 1080

  // * 需保持的比例（默认1.77778）
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
  const calcRate = () => {
    // 当前宽高比
    const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))
    if (appRef.value) {
      if (currentRate > baseProportion) {
        // 表示更宽
        scale.width = ((window.innerHeight * baseProportion) / baseWidth).toFixed(5)
        scale.height = (window.innerHeight / baseHeight).toFixed(5)
        appRef.value.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
      } else {
        // 表示更高
        scale.height = ((window.innerWidth / baseProportion) / baseHeight).toFixed(5)
        scale.width = (window.innerWidth / baseWidth).toFixed(5)
        appRef.value.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
      }
    }
  }

  const baseSize = 16
  // 设置 rem 函数
  const setRem = (clientWidth?) => {
    // console.log('设置',document.documentElement.clientWidth,document.documentElement.clientWidth / (clientWidth || 1920))
    // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / (clientWidth || 1920)
    // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'

    // let baseWidth = document.documentElement.clientWidth;
    // let baseHeight = document.documentElement.clientHeight;
    // let screenWidth = screen.width
    // let screenHeight = screen.height
    
    // let appStyle = document.getElementById('app').style;
    // let realRatio = baseWidth/baseHeight
    // let designRatio = 16/9
    // console.log(realRatio,designRatio)  
    // console.log('baseWidth=',baseWidth,'baseHeight=',baseHeight,'screenWidth=',screenWidth,'screenHeight=',screenHeight)
    // let scaleRate =  baseWidth/baseWidth

    // scaleRate = realRatio>designRatio ? 1 : 1

    // if(baseWidth<screenWidth){
    //   scaleRate = realRatio>designRatio ? baseHeight/1080 : baseWidth/1920
    // }
    // appStyle.transformOrigin = 'left top';
    // appStyle.transform=`scale(${scaleRate}) translateX(-50%)`;
    // appStyle.width = `${baseWidth/scaleRate}px`
    // appStyle.height = `${baseHeight/scaleRate}px`
  }

  const resize = () => {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      calcRate()
    }, 200)
  }

  // 改变窗口大小重新绘制
  const windowDraw = () => {
    window.addEventListener('resize', resize)
  }

  // 改变窗口大小重新绘制
  const unWindowDraw = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    appRef,
    calcRate,
    windowDraw,
    unWindowDraw,
    setRem
  }
}
