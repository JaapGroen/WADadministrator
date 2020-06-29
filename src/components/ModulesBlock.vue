<template>
    <router-link to="/modules" class="block" tag="div">
        <div class="item_title bgc0">Modules & Configs</div>
  
        <div v-if="loaded" class="item_content">
            Overview of current installed modules and configs
        </div> 
  
        <div v-if="!loaded" class="item_content">
            <i class="fas fa-sun fa-2x fa-spin"></i>
        </div>

        <div class="item_footer">
            {{modules.length}} modules installed
        </div>
    </router-link>
</template>


<script>
 import {HTTP} from '../main'



 export default {
    data(){
        return {
            loaded:false,
            modules:[],
        }
    },
    mounted(){
        this.updateModules()
    },
    methods:{
        updateModules(){
            HTTP.get(this.apiURL+'/modules').then(resp =>{
                this.modules=resp.data.modules
                this.loaded=true
            })
        }
    },
    components:{},
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
    },
}
</script>

<style scoped>
.block{
  height:250px;
  width:250px;
  margin: 20px;
  display:flex;
  flex-direction:column;
}

.item_title{
  height:40px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding-left: 15px;
  padding-right: 15px;
  display:flex;
  align-items:center;
}

.item_content{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around;
  height:190px;
  background:#141a26;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
}

.item_footer{
  display:flex;
  align-items:center;
  padding-left:20px;
  padding-right:20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background:#323b47;
  height:30px;
  font-size:12px;
}
</style>