import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useGirlStore = defineStore({
  id:'girl',
  state:()=>({
    girls:[],
    girl:{}
  }),
  actions:{
    async getGirls(){
      try{
        const res = await axios.get('/api/girls')
        this.girls = res.data
      }catch(error){
        console.log(error)
      }
    },
    async getGirl(id){
      try{
        const res = await axios.get(`/api/girls/${id}`)
        this.girl = res.data;
      }catch(error){
        alert(error)
        console.log(error)
      }
    },
    async addNewGirl(girl){
      const config = {headers:{'Content-Type':'multipart/form-data'}}
      try{
        await axios.post('/api/girls',girl,config)
        this.getGirls()
      }catch(error){
        alert(error)
        console.log(error)
      }
    },
    async updateGirl(girl){
      const config = {headers:{'Content-Type':'multipart/form-data'}}
      try{
        const res = await axios.put(`/api/girls/${girl.id}`,girl,config)
        console.log(res.data)
        this.getGirls()
      }catch(error){
        console.log(error)
      }
    },
    async removeGirl(id){
      try{
        await axios.delete(`/api/girls/${id}`)
        this.getGirls()
      }catch(error){
        console.log(error)
      }
    }
  },
  getters:{
    allGirls(state){
      return state.girls
    },
    oneGirl(state){
      return state.girl
    }
  }
})
