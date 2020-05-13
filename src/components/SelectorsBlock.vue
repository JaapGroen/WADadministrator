<template>
    <div>
        <div class="block" @click="openView('listView')">
            <div class="item_title bgc0">Selectors</div>
    
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
            <template>
                <SelectorsList v-if="show.listView" v-bind:selectors="selectors" :key=1
                    v-on:openView="openView"               
                    v-on:updateSelectors="updateSelectors"
                    v-on:toggleSelector="toggleSelector">
                </SelectorsList>
                <SelectorsImport v-if="show.importView" 
                    v-on:openView="openView" 
                    v-on:updateSelectors="updateSelectors">
                </SelectorsImport>
                <SelectorsAdd v-if="show.addView" 
                    v-on:openView="openView" 
                    v-on:updateSelectors="updateSelectors">
                </SelectorsAdd>
                <SelectorsMeta v-if="show.metaView" v-bind:selector="activeSelector" :key="activeSelector.id"
                    v-on:openView="openView">
                </SelectorsMeta>
                <SelectorsConfig v-if="show.configView" v-bind:selector="activeSelector" :key="activeSelector.id"
                    v-on:openView="openView">
                </SelectorsConfig>
            </template>
        </transition>
    </div>
</template>


<script>
 import {HTTP} from '../main'
 import SelectorsList from '@/components/SelectorsList'
 import SelectorsImport from '@/components/SelectorsImport'
 import SelectorsMeta from '@/components/SelectorsMeta'
 import SelectorsConfig from '@/components/SelectorsConfig'
 import SelectorsAdd from '@/components/SelectorsAdd'

 export default {
  data(){
      return {
        loading:true,
        show:{listView:false,importView:false,metaView:false,configView:false,addView:false},
        selectors:[],
        activeSelector:''
      }
  },
  created(){
    this.updateSelectors()
  },
  methods:{
    forceRerender(){
      this.componentKey += 1;
    },
    openView(View,selector){
        this.activeSelector = selector
        Object.keys(this.show).forEach((view)=>{
            if (view == View){
                this.show[view] = true
            } else {
                this.show[view] = false
            }
        })
    },
    updateSelectors(){
        HTTP.get(this.apiURL+'/selectors').then(resp =>{
            this.selectors=resp.data.selectors
            this.selectors.forEach((selector)=>{
                selector.selected=false;
            })
            this.loading=false
        })
    },
    toggleSelector(selector){
        for (let i=0;i<this.selectors.length;i++){
            if(this.selectors[i].id == selector.id){
                selector.selected = !selector.selected
                this.selectors.splice(i,1,selector)
            }
        }
    }
  },
    computed:{
        bgc_class: function(){
            return 'bgc'+this.test.status
        },
        c_class: function(){
            return 'c'+this.test.status
        },
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
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
      SelectorsList,
      SelectorsImport,
      SelectorsMeta,
      SelectorsConfig,
      SelectorsAdd
  }
}
</script>

<style>
</style>