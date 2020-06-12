<template>
    <div>
        <div class="block" @click="openView('listView')">
            <div class="item_title" v-bind:class="bgc_class">Selectors</div>
    
            <div v-if="!loading" class="item_content">
                Overview of all selectors
            </div>
    
            <div v-if="loading" class="item_content">
                <i class="fas fa-sun fa-2x fa-spin"></i>
            </div>
    
            <div class="item_footer">
                {{upSelectors.length}} active selectors, {{downSelectors.length}} sleeping
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
                <SelectorsRules v-if="show.rulesView" v-bind:selector="activeSelector" :key="activeSelector.id"
                    v-on:openView="openView">
                </SelectorsRules>
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
 import SelectorsRules from '@/components/SelectorsRules'

 export default {
  data(){
      return {
        loading:true,
        show:{listView:false,importView:false,metaView:false,configView:false,addView:false,rulesView:false},
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
                this.$set(selector, 'selected', false)
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
            if (this.downSelectors.length == 0){
                return 'bgc1'
            } else if (this.downSelectors.length == 1){
                return 'bgc2'
            } else {
                return 'bgc3'
            }
        },
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        upSelectors(){
            return _.filter(this.selectors, {isactive:true})
        },
        downSelectors(){
            return _.filter(this.selectors, {isactive:false})
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
      SelectorsMeta,
      SelectorsConfig,
      SelectorsAdd,
      SelectorsRules
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