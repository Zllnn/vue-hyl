import { changeUserPasswordService, getUserDataService } from "@/api/user";
// import { useData } from "element-plus/es/components/table-v2/src/composables";
import { defineStore } from "pinia";
import { ref } from 'vue'

//用户模块
export const userUserStore = defineStore(
  'hyl-user',//name
  () => {
    //store,
    const token = ref('')
    const password = ref('123456')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    //用户头像
    const imageUrl = ref('')
    const setImageUrl = (imageurl) => {
      imageUrl.value = imageurl
    }
    const getImageUrl = () => {
      return imageUrl.value
    }
    //用户信息
    const user = ref({
      id: 1,
      userName: 'test',
      loginName: 'test',
      password: '123456',
      email: '3247004241@qq.com',
      code: '1234567',
      studentId: '202321xxxx'
    })

    // const getUser=async ()=>{
    //   const userData = await getUserDataService(user.value.verificationCode)
    //  user.value=userData.data.data

    // //  const psd = await getUserPasswordService(password)
    // //  password.value=psd
    // }
    //将用户信息存储到本地
    const setUserData = async (id) => {
      const userData = await getUserDataService(id)
      user.value = userData.data.data
    }
    //获取到存储的用户信息并使用
    const getUserData = () => {
      return user.value
    }
    const changePassword = async (newPassword, id) => {
      await changeUserPasswordService(newPassword, id)
      password.value = newPassword
    }
    const getPassword = () => {
      return user.value.password
    }
    //导出
    return {
      token,
      setToken,
      removeToken,
      user,
      changePassword,
      getPassword,
      getUserData,
      setUserData,
      setImageUrl,
      getImageUrl
    }
  }, {
  persist: true
}
)