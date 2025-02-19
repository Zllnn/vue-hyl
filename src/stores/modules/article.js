import { defineStore } from "pinia";
import { ref } from "vue";

export const articleStore =defineStore(
'hyl-article',
()=>{
  //store
  const article =ref([
    {
      id: 1,
      articleName: '',
      articleContent: '',
      articleGroup: '',
      articleAuthor: ''
}
  ])
  const getArticle =()=>{

  }
  

  return{
    article,
    getArticle,

  }

},{
  persist:true
}











)