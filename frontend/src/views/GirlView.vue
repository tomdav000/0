<script setup>
import {onMounted,ref} from 'vue'
import {useGirlStore} from '@/stores/girls'
import {useRouter,useRoute} from 'vue-router'
const file = ref(null)
const img = import.meta.env.VITE_PHOTO
const girlStore = useGirlStore()
const router = useRouter()
const route = useRoute()
const updGirl = {
  id: route.params.id,
  name:'',
  race:'',
  image:''
}

const fileUpload = (event) =>{
  file.value = event.target.files[0]
  updGirl.image = file.value;
}

const updGirlInfo = (girl) =>{
  girlStore.updateGirl(girl)
  updGirl.name='';
  updGirl.race='';
  girlStore.getGirls();
  router.push('/')
}

onMounted(()=>{
  girlStore.getGirl(route.params.id)
  console.log(route.params.id)
})
</script>

<template>
<div class="container">
  <form align="center">
    <div class='row row-cols-4'>
    <input type="hidden" value="route.params.id">
    <input type="text" v-model='updGirl.name' placeholder="Update Girl Name">
    <input type="text" v-model='updGirl.race' placeholder="Update Girl Race">
    <input type="file" @change="fileUpload">
    <input type="submit" @click.prevent="updGirlInfo(updGirl)">
    </div>
  </form>
</div>
<hr/>
<div class="container">
  <div class="row">
      <div class="border">
        <header class="card-header fs-2 text-center">{{girlStore.girl.name}}</header>
        <p class="card-body text-center"><img class="img-fluid" :src=" `${img}/${girlStore.girl.image}` "></p>
        <footer class="card-footer text-center">{{girlStore.girl.race}}</footer>
      </div>
  </div>
</div>
<div><RouterLink to='/'><h1 class="fs-1 text-center mt-4">Go home</h1></RouterLink></div>
</template>