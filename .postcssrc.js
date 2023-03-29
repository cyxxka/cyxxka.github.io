module.exports = {
    "plugins": {
        "postcss-aspect-ratio-mini": {}, 
        // "postcss-px-to-viewport": {
        //     viewportWidth: 1920,      // (Number) The width of the viewport.
        //     viewportHeight: 1080,    // (Number) The height of the viewport.
        //     unitPrecision: 3,        // (Number) The decimal numbers to allow the REM units to grow to.
        //     viewportUnit: 'vw',      // (String) Expected units.
        //     selectorBlackList: ['.ignore', '.hairlines'],  // (Array) The selectors to ignore and leave as px.
        //     minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
        //     mediaQuery: false       // (Boolean) Allow px to be converted in media queries.
        // }, 
        // "postcss-px-to-viewport-opt": {
        //     viewportWidth: 1920,     //  视窗的宽度，对应的是我们设计稿的宽度，移动端一般是750，如果是pc端那就是类似1920这样的尺寸
        //     viewportHeight: 1080,    // 视窗的高度，移动端一般指定1334，也可以不配置
        //     unitPrecision: 4,       // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
        //     viewportUnit: 'vw',    // 指定需要转换成的视窗单位，建议使用vw
        //     selectorBlackList: ['.ignore', '.hairlines'],  // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
        //     minPixelValue: 1,      // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        //     mediaQuery: false,      // 允许在媒体查询中转换`px`
        //     exclude: /(\/|\\)(node_modules)(\/|\\)/ 
        // },
        "postcss-viewport-units":{},
    }
}