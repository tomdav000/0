<script setup>
import {onMounted,ref} from 'vue'
import {useGirlStore} from '@/stores/girls'
import {useRouter} from 'vue-router'
const file = ref(null)
const img = import.meta.env.VITE_PHOTO
const girlStore = useGirlStore()
const router = useRouter()
const newGirl = {
  name:'',
  race:'',
  image:''
}

const fileUpload = (event) =>{
  file.value = event.target.files[0]
  newGirl.image = file.value;
}

const addGirl = (girl) =>{
  girlStore.addNewGirl(girl)
  newGirl.name='';
  newGirl.race='';
  router.go()
}

const rmvGirl = (id) =>{
  girlStore.removeGirl(id)
  router.go()
}

onMounted(()=>{
  girlStore.getGirls()
})
</script>

<template>
<div class="container">
  <form align="center">
    <div class='row row-cols-4'>
    <input type="text" v-model='newGirl.name' placeholder="Enter Girl Name">
    <input type="text" v-model='newGirl.race' placeholder="Enter Girl Race">
    <input type="file" @change="fileUpload">
    <input type="submit" @click.prevent="addGirl(newGirl)">
    </div>
  </form>
</div>
<hr/>
<div class="container">
  <div class="row row-cols-3 g-1">
    <div v-for="(girl,ind) in girlStore.girls" :key="girl.id">
      <div class="card h-100">
        <header class="card-header text-center"><RouterLink :to=" `${girl.id}` ">{{girl.name}}</RouterLink></header>
        <p class="card-body"><RouterLink :to=" `${girl.id}` "><img class="card-img-top img-fluid" :src=" `${img}/${girl.image}` "></RouterLink></p>
        <footer class="card-footer text-center" @click='rmvGirl(girl.id)'>{{girl.race}}</footer>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
  .card-img-top {
    width: 100%;
    height: 20vw;
    object-fit: cover;
}
</style>
