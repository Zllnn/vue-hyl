import { changeUserPasswordService, getUserDataService, uploadUserAvatar } from "@/api/user";
import { use } from "echarts";
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

    //退出登录删除pinia中的信息
    const removeUserData = () => {
      user.value = {
        id: 1,
        userName: '',
        loginName: '',
        password: '',
        email: '',
        code: '',
        studentId: '',
        imageUrl: ''
      }
      imageUrl.value = ''
      removeToken()
    }
    //用户头像
    const imageUrl = ref('')
    const setImageUrl = async (imageurl) => {
      imageUrl.value = imageurl
      user.value.imageUrl = imageurl
      //存入数据库
      await uploadUserAvatar(imageurl, user.value.id)
    }
    const getImageUrl = () => {
      return user.value.imageUrl
    }
    //用户信息
    const user = ref({
      id: 1,
      userName: 'test',
      loginName: 'test',
      password: '123456',
      email: '3247004241@qq.com',
      code: '1234567',
      studentId: '202321xxxx',
      imageUrl: ''
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
      console.log(userData);
      user.value = userData.data.data
      // imageUrl.value = user.value.imageUrl
    }
    //获取到存储的用户信息并使用
    const getUserData = async () => {
      await setUserData(user.value.id)
      return user.value
    }
    const getUserData_test = () => {
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
      removeUserData,
      user,
      imageUrl,
      changePassword,
      getPassword,
      getUserData,
      getUserData_test,
      setUserData,
      setImageUrl,
      getImageUrl
    }
  }, {
  persist: true
}
)