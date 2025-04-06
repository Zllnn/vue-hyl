//pinia独立维护
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate' //pinia持久化插件引入
const pinia = createPinia()
pinia.use(persist)


//仓库统一导出
export * from './modules/user'
//相当于
// import { userUserStore } from './modules/user'
// export {userUserStore}

export * from './modules/article'

export default pinia

