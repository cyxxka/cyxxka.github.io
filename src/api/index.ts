import request from './request';


const getProdList = (params?: object) => {
    return request({
        url: 'prodline/list',
        method: 'get',
        params,
    });
}

const getProdlineInfo = (params?: any) => {
    return request({
        url: `prodline/info/${params.line}`,
        method: 'get',
    });
}
//前处理
// job/startinfo/[JOB]  获取信息
// job/startcheck/[LINE]/[JOB] 前处理上板检查
// job/start/[LINE]/[JOB] 前处理上板
const getStartInfo = (params)=>{
    return request({
        url:`job/startinfo/${params.job}`,
        method:'get',
    })
}

const getStartCheck = (params)=>{
    return request({
        url:`job/startcheck/${params.line}/${params.job}`,
        method:'get',
    })
}

const Start = (params,data?:any)=>{
    return request({
        url:`job/start/${params.line}/${params.job}`,
        method:'post',
        data
    })
}


//干膜
// lamination/info/[ID] 获取信息
// job/lamination/usecheck/[JOB]/[LINE]/[ID] 更换干膜检查
// job/lamination/use/[JOB]/[LINE]/[ID] 更换干膜

const getLaminationInfo = (params)=>{
    return request({
        url:`lamination/info/${params.id}`,
        method:'get',
    })
}

const getLaminationCheck = (params)=>{
    return request({
        url:`lamination/usecheck/${params.job}/${params.line}/${params.id}`,
        method:'get',
    })
}

const LaminationUse = (params,data?:any)=>{
    return request({
        url:`lamination/use/${params.job}/${params.line}/${params.id}`,
        method:'post',
        data
    })
}

const login = (data)=>{
    return request({
        url:`logincheck`,
        method:'post',
        data
    })
}

export{
    getProdList,
    getProdlineInfo,
    getStartInfo,
    getStartCheck,
    Start,
    getLaminationInfo,
    getLaminationCheck,
    LaminationUse,
    login
}
