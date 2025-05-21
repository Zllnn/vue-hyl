import { userUserStore } from '@/stores'
import request from '@/utils/request'


//注册
export const userRegisterService = ({ username, password, repassword }) => {
  const data = userUserStore()
  const token = data.token
  const loginName = username
  return request.post('/Users/reg', { loginName, password },
    {
      headers: {
        // Authorization: `Bearer ${token}` // 根据具体需求，可能是Bearer或者其他前缀
        'taken': token,
      }
    }
  )
}

//登录
export const userLoginService = ({ username, password }) => {
  const loginName = username
  return request.post('/login', { loginName, password })
}

//通过用户名获取用户id  /*此处的loginName传不传都不影响，主要通过请求头中的token获取id*/
export const getUserIdByToken = (loginName) => {
  const data = userUserStore()
  const token = data.token
  return request.get(`/Users/getUserInfoByToken/${loginName}`, {
    headers: {
      // Authorization: `Bearer ${token}` // 根据具体需求，可能是Bearer或者其他前缀
      'taken': token,
    }
  })
}

//用户信息获取
export const getUserDataService = (id) => {
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
export const upUserDataService = ({ id, userName, loginName, email, code, studentId }) => {
  const data = userUserStore()
  const token = data.token
  //存入的请求
  return request.post('/Users/updateInfo', { id, userName, loginName, code, studentId, email },
    {
      headers: {
        // Authorization: `Bearer ${token}` // 根据具体需求，可能是Bearer或者其他前缀
        'taken': token,
      }
    }
  )
}

//修改密码
export const changeUserPasswordService = (password, id) => {
  const data = userUserStore()
  const token = data.token
  return request.post('/Users/updateUser', { password, id },
    {
      headers: {
        // Authorization: `Bearer ${token}` // 根据具体需求，可能是Bearer或者其他前缀
        'taken': token,
      }
    }
  )
}


//头像的存储
export const uploadUserAvatar = (imageUrl, id) => {
  const data = userUserStore()
  const token = data.token
  return request.post('/Users/updataImage', { imageUrl, id }, {
    headers: {
      // Authorization: `Bearer ${token}` // 根据具体需求，可能是Bearer或者其他前缀
      'taken': token,
    }
  })
}