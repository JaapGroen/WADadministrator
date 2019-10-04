<template>
  <div>
    <div class="block" @click="openView">
      <div class="item_title">Modules</div>
      
      <div v-if="loaded" class="item_content">
        {{modules.length}} modules
      </div> 
      
      <div v-if="!loaded" class="item_content">
        <i class="fas fa-sun fa-2x fa-spin"></i>
      </div>
    
      <div class="item_footer">
        footer      
      </div>
    </div>
    <transition name="fade">
      <ModulesView v-if="showView" v-on:closeView="closeView" v-bind:modules="modules" :key="1" v-on:updateModules="updateModules"></ModulesView>
    </transition>
  </div>
</template>


<script>
 import {HTTP} from '../main'
 import ModulesView from '@/components/ModulesView'

 export default {
  data(){
      return {
        apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
        loaded:false,
        modules:[],
        showView:false,
      }
  },
  mounted(){
    this.updateModules()
  },
  methods:{
    forceRerender(){
      this.componentKey += 1;
    },
    openView(){
      this.showView=true;  
    },
    closeView(){
      this.showView=false;
    },
    updateModules(){
      HTTP.get(this.apiURL+'/modules')
        .then(resp =>{
          this.modules=resp.data.modules
          this.loaded=true
        })
    }
  },
  computed:{
    bgc_class: function(){
      return 'bgc'+this.test.status
    },
    c_class: function(){
      return 'c'+this.test.status
    },
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
    ModulesView
  }
}
</script>

<style>
</style>