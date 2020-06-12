<template>
    <div>
        <div class="block" @click="openList">
            <div class="item_title bgc0">Modules</div>
      
            <div v-if="loaded" class="item_content">
                Overview of current installed modules
            </div> 
      
            <div v-if="!loaded" class="item_content">
                <i class="fas fa-sun fa-2x fa-spin"></i>
            </div>
    
            <div class="item_footer">
                {{modules.length}} modules installed
            </div>
        </div>
        <transition name="fade">
            <ModulesList v-if="showList" v-on:closePopup="closePopup" v-bind:modules="modules" :key="1" v-on:updateModules="updateModules" v-on:openAdd="openAdd"></ModulesList>
            <ModulesAdd v-if="showAdd" v-on:closePopup="closePopup" v-bind:modules="modules" :key="1" v-on:updateModules="updateModules" v-on:openList="openList"></ModulesAdd>
        </transition>
    </div>
</template>


<script>
 import {HTTP} from '../main'
 import ModulesList from '@/components/ModulesList'
 import ModulesAdd from '@/components/ModulesAdd'

 export default {
    data(){
        return {
            apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
            loaded:false,
            modules:[],
            showList:false,
            showAdd:false,
        }
    },
    mounted(){
        this.updateModules()
    },
    methods:{
        forceRerender(){
            this.componentKey += 1;
        },
        openList(){
            this.updateModules()
            this.showList=true;
            this.showAdd = false
        },
        openAdd(){
            this.showList = false;
            this.showAdd = true;
        },
        closePopup(){
            this.showList = false;
            this.showAdd = false;
        },
        updateModules(){
            HTTP.get(this.apiURL+'/modules').then(resp =>{
                this.modules=resp.data.modules
                this.loaded=true
            })
        }
    },
  filters:{
    prettydate: timestamp =>{
      let currentDate = new Date();
      let toFormat = new Date(timestamp);
      if(!timestamp){
        return '?'
      }
      if(toFormat.getDate() == currentDate.getDate() && toFormat.getMonth() == currentDate.getMonth() && toFormat.getFullYear() == currentDate.getFullYear() ) {
        return 'Today'
      }
      if(toFormat.getDate() == (currentDate.getDate() - 1) && toFormat.getMonth() == currentDate.getMonth() && toFormat.getFullYear() == currentDate.getFullYear()) {
        return 'Yesterday'
      }
      let time_diff = Math.abs(toFormat.getTime() - currentDate.getTime());
      let diff_days = Math.ceil(time_diff / (1000 * 3600 * 24));
      return diff_days + ' days ago'
    },
    decimals: value =>{
        return Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2);
    },
    isodate: timestamp =>{
        let d = new Date(timestamp);
        return d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear()
    },
    msdate: timestamp =>{
        let d = new Date(timestamp);
        return d.getTime()
    }
  },
  components:{
    ModulesList,
    ModulesAdd,
  }
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