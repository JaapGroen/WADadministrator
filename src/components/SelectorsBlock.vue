<template>
  <div>
    <div class="block" @click="openList">
      <div class="item_title">Selectors</div>
    
      <div v-if="!loading" class="item_content">
        {{selectors.length}} selectors
      </div>
    
      <div v-if="loading" class="item_content">
        <i class="fas fa-sun fa-2x fa-spin"></i>
      </div>
    
      <div class="item_footer">
        footer      
      </div>
    </div>
    <transition name="fade">
      <SelectorsList v-if="showList" v-on:closePopup="closePopup"  v-bind:selectors="selectors" v-on:openImport="openImport" v-on:updateSelectors="updateSelectors"></SelectorsList>
      <SelectorsImport v-if="showImport" v-on:closePopup="closePopup" v-on:openList="openList" v-on:updateSelectors="updateSelectors"></SelectorsImport>
    </transition>
  </div>
</template>


<script>
 import {HTTP} from '../main'
 import SelectorsList from '@/components/SelectorsList'
 import SelectorsImport from '@/components/SelectorsImport'

 export default {
  data(){
      return {
        apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
        loading:true,
        showList:false,
        showImport:false,
        selectors:[],
      }
  },
  created(){
    this.updateSelectors()
  },
  methods:{
    forceRerender(){
      this.componentKey += 1;
    },
    openList(){
        this.showList=true
        this.showImport=false
    },
    openImport(){
        this.showList=false
        this.showImport=true
    },
    closePopup(){
        this.showList=false
        this.showImport=false
    },
    updateSelectors(){
        HTTP.get(this.apiURL+'/selectors').then(resp =>{
            this.selectors=resp.data.selectors
            this.selectors.forEach((selector)=>{
                selector.selected=false;
            })
            this.loading=false
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
      SelectorsList,
      SelectorsImport,
  }
}
</script>

<style>
</style>