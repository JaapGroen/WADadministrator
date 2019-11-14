<template>
    <div>
        <div class="block" @click="openList">
            <div class="item_title bgc0">Processes</div>
    
            <div v-if="!loading" class="item_content">
                {{processes.length}} processes
            </div>
    
            <div v-if="loading" class="item_content">
                <i class="fas fa-sun fa-2x fa-spin"></i>
            </div>
    
            <div class="item_footer">
                footer      
            </div>
        </div>
        <transition name="fade">
            <ProcessesList v-if="showList" v-bind:processes="processes" :key=1
                v-on:closePopup="closePopup"
                v-on:openResults="openResults"
                v-on:updateProcesses="updateProcesses"
                v-on:toggleProcess="toggleProcess">
            </ProcessesList>
        </transition>
    </div>
</template>


<script>
 import {HTTP} from '../main'
 import ProcessesList from '@/components/ProcessesList'

 export default {
  data(){
      return {
        apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
        loading:true,
        showList:false,
        showResults:false,
        processes:[],
        selectedProcess:{},
      }
  },
  created(){
    this.updateProcesses()
  },
  methods:{
    forceRerender(){
      this.componentKey += 1;
    },
    openList(){
        this.closePopup()
        this.showList=true
    },
    openResults(){
        this.showResults = true
    },
    closePopup(){
        this.showList=false
        this.showResults=false
    },
    updateProcesses(){
        HTTP.get(this.apiURL+'/processes').then(resp =>{
            this.processes=resp.data.processes
            this.processes.forEach((process)=>{
                process.selected=false;
            })
            this.loading=false
        })
    },
    toggleProcess(process){
        for (let i=0;i<this.processes.length;i++){
            if(this.processes[i].id==process.id){
                this.processes[i].selected=process.selected
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
      ProcessesList,
  }
}
</script>

<style>
</style>