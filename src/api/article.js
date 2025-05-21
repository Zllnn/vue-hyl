import { userUserStore } from '@/stores'
import request from '@/utils/request'


//获取文章
export const getArticle = (page, size) => {
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

//获取文章数量
export const getArticleCount = () => {
  const data = userUserStore()
  const token = data.token
  return request.get('/Articles/Count',
    {
      headers: {
        // Authorization: `Bearer ${token}` // 根据具体需求，可能是Bearer或者其他前缀
        'taken': token,
      }
    }
  )
}

//向数据库中传入文章
export const uploadArticle = (article) => {
  const data = userUserStore()
  const token = data.token
  return request.post('/Articles/upload', article,
    {
      headers: {
        // Authorization: `Bearer ${token}` // 根据具体需求，可能是Bearer或者其他前缀
        'taken': token,
      }
    }
  )
}

//编辑文章
export const editArticle = (article) => {
  const data = userUserStore()
  const token = data.token
  return request.put('/Articles/edit', article,
    {
      headers: {
        // Authorization: `Bearer ${token}` // 根据具体需求，可能是Bearer或者其他前缀
        'taken': token,
      }
    }
  )
}

//删除文章
export const deleteArticle = (id) => {
  const data = userUserStore()
  const token = data.token
  return request.delete(`/Articles/delete/${id}`,
    {
      headers: {
        // Authorization: `Bearer ${token}` // 根据具体需求，可能是Bearer或者其他前缀
        'taken': token,
      }
    }
  )
}