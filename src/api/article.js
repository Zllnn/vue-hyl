import { userUserStore } from '@/stores'
import request from '@/utils/request'


//获取文章
export const getArticle=(page,size)=>{
  const data = userUserStore()
  const token = data.token
  return request.get(`/Articles?page=${page}&size=${size}`,
    {
      headers: {
        // Authorization: `Bearer ${token}` // 根据具体需求，可能是Bearer或者其他前缀
        'taken': token,
      }
    }
  )
}