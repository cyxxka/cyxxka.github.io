import axios, { AxiosInstance } from 'axios';
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';
// import { Session } from '/@/utils/storage';
import qs from 'qs';
console.log(import.meta.env)
const Eloading = () => {
	return ElLoading.service({
	lock: true,
	text: "Loading",
	background: "rgba(0, 0, 0, 0)",
});
};
const showLoading = () => {
	Eloading();	
};
const hideLoading = () => {
	Eloading().close();
};
// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_NODE_ENV == 'production'? import.meta.env.VITE_APP_API_URL as any :  'serverapi/',
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
	paramsSerializer: {
		serialize(params) {
			return qs.stringify(params, { allowDots: true });
		},
	},
});

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么 token
		// if (Session.get('token')) {
		// 	config.headers!['Authorization'] = `${Session.get('token')}`;
		// }
		showLoading()
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		hideLoading()
		// 对响应数据做点什么
		const res = response.data;
		if (res.status == 'Error') {
			ElMessage.error(res.errmsg)
		} else {
			return response.data;
		}
	},
	(error) => {
		hideLoading()
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			if (error.response.data) ElMessage.error(error.response.statusText);
			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
