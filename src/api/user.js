import { userUserStore } from '@/stores'
import request from '@/utils/request'


//注册
export const userRegisterService = ({username,password,repassword})=>{
  const data = userUserStore()
  const token = data.token
  const loginName=username
  return request.post('/Users/reg',{loginName,password},
    {
      headers: {
        // Authorization: `Bearer ${token}` // 根据具体需求，可能是Bearer或者其他前缀
        'taken': token,
      }
    }
  )
}

//登录
export const userLoginService =({username,password})=>{
  const loginName =username
  return request.post('/login', { loginName,password})
}

//通过用户名获取用户id
export const getUserIdByToken=(loginName)=>{
  const data = userUserStore()
  const token = data.token
  return request.get(`/Users/getUserInfoByToken/${loginName}`,{
      headers: {
        // Authorization: `Bearer ${token}` // 根据具体需求，可能是Bearer或者其他前缀
      'taken': token, 
      }
  })
}

//用户信息获取
export const getUserDataService =(id)=>{
  const data = userUserStore()
  const token = data.token
  return request.get(`/Users/getUserData/${id}`,
    {
      headers: {
        // Authorization: `Bearer ${token}` // 根据具体需求，可能是Bearer或者其他前缀
        'taken': token,
      }
    }
  )
}

//用户信息修改的存入
export const upUserDataService =({id,userName,loginName,email,code,studentId})=>{
  //存入的请求
  return request.post('/Users/updateInfo',{id,userName,loginName,code,studentId,email,})
}

//修改密码
export const changeUserPasswordService = (password,id)=>{
  return request.post('/Users/updateUser',{password,id})
}
