import axios from "axios";
import { userUserStore } from "@/stores";
import router from "@/router";


const baseURL = 'http://localhost:8080'                                //需要改成http://localhost:8080

const instance =axios.create({
  baseURL,
  timeout:10000
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
    //验证用户是否登录
    const useStore = userUserStore()
    if(useStore.token){
      config.headers.Authorization = useStore.token //在请求头中加入token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    //失败,抛出错误
    ElMessage.error(response.data.message || '服务异常')
    return Promise.reject(response.data)
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    //401
    if (error.response.status === 401) {
      router.push('/login')
    }
    ElMessage.error(error.response.data.message || '服务异常')
    return Promise.reject(error);
  });

//全局前置守卫
router.beforeEach((to) => {
  const useStore =userUserStore()
  if(!useStore.token&&to.path!=='/login'){
    return '/login'
  }
})

  export default instance
  export {baseURL}