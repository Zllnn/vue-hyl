import { defineStore } from "pinia";
import { ref } from "vue";
import { getArticle } from '@/api/article'

export const articleStore = defineStore(
  'hyl-article',
  () => {
    //store
    const total = ref(1)
    const article = ref([
      {
        data: '',
        id: 1,
        articleName: '',
        articleContent: '',
        articleAuthor: '',
        articleGroup: ''
      }
    ])
    const getArticles = async (curentPage, size) => {
      // 获取文章数据
      const pageBean = await getArticle(curentPage, size)
      article.value = pageBean.data.data.rows
      total.value = pageBean.data.data.total
      return pageBean.data.data.rows
    }
    const setArticleName = (newArticleName) => {
      article.value.articleName = newArticleName
    }
    const getTotal = () => {
      return total.value
    }

    return {
      article,
      getArticles,
      setArticleName,
      getTotal
    }

  }, {
  persist: true
}
)