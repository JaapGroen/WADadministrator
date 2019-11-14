<template>
    <div>
        <div class="block" @click="openStudies">
            <div class="item_title bgc0">Data</div>
    
            <div v-if="!loading" class="item_content">
                Residual data
            </div>
    
            <div v-if="loading" class="item_content">
                <i class="fas fa-sun fa-2x fa-spin"></i>
            </div>
    
            <div class="item_footer">
                footer      
            </div>
        </div>
        <transition name="fade">
            <DataStudies v-if="showStudies" v-bind:studies="studies" :msg="msg" :key=1 
                v-on:closePopup="closePopup">
            </DataStudies>
/*             <DataSeries v-if="showSeries" v-bind:series="series" :key=1
                v-on:closePopup="closePopup"
                v-on:openStudies="openStudies">
            </DataSeries> */
        </transition>
    </div>
</template>


<script>
 import {HTTP} from '../main'
 import DataStudies from '@/components/DataStudies'

 export default {
  data(){
      return {
        apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
        loading:true,
        showStudies:false,
        showSeries:false,
        studies:[],
        msg:''
      }
  },
  created(){
    this.getStudies()
  },
    methods:{
        forceRerender(){
            this.componentKey += 1;
        },
        closePopup(){
            this.showStudies=false
            this.showSeries = false
        },
        openStudies(){
            this.closePopup()
            this.showStudies = true
        },
        getStudies(){
            this.msg = 'Loading dicom information...'
            HTTP.get(this.apiURL+'/datasources/1/data?level=studies&residual=true').then((resp)=>{
                this.studies = resp.data.id_studies
                this.loading=false
                this.msg = ''
            })
        },
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
      DataStudies,
      /* DataSeries */
  }
}
</script>

<style>
</style>