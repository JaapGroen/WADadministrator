<template>
    <div>
        <div class="block" @click="openProcesses">
            <div class="item_title bgc0">Processes & Results</div>
    
            <div v-if="!loading" class="item_content">
                {{processes.length}} processes loaded
                <br>
                {{results.length}} results loaded
            </div>
    
            <div v-if="loading" class="item_content">
                <i class="fas fa-sun fa-2x fa-spin"></i>
            </div>
    
            <div class="item_footer">
                footer      
            </div>
        </div>
        <transition name="fade">
            <ProcessesList v-if="showProcesses" v-bind:processes="processes" :key=1
                v-on:closePopup="closePopup"
                v-on:openResults="openResults"
                v-on:updateProcesses="updateProcesses">
            </ProcessesList>
            <ResultsList v-if="showResults" v-bind:results="results" :key=1
                v-on:closePopup="closePopup"
                v-on:openProcesses="openProcesses"
                v-on:getMoreResults="getMoreResults"
                v-on:openLog="openLog"
                v-on:toggleResult="toggleResult"
                v-on:refreshResults="refreshResults">
            </ResultsList>
            <LogView v-if="log.show" v-bind:log="log" :key=1
                v-on:closePopup="closePopup"
                v-on:openResults="openResults">
            </LogView>
        </transition>
    </div>
</template>


<script>
 import {HTTP} from '../main'
 import ProcessesList from '@/components/ProcessesList'
 import ResultsList from '@/components/ResultsList'
 import LogView from '@/components/LogView'
 import _ from 'lodash'

 export default {
  data(){
      return {
        loading:true,
        showProcesses:false,
        showResults:false,
        processes:[],
        results:[],
        page:'',
        log:{show:false,text:''}
      }
  },
  created(){
    this.updateProcesses()
    this.getFirstResults()
  },
  methods:{
    forceRerender(){
      this.componentKey += 1;
    },
    openLog(log){
        this.closePopup()
        this.log = log
    },
    openResults(){
        this.closePopup()
        this.showResults = true
    },
    openProcesses(){
        this.closePopup()
        this.showProcesses = true
    },
    closePopup(){
        this.showProcesses = false
        this.showResults = false
        this.log.show = false
    },
    updateProcesses(){
        HTTP.get(this.apiURL+'/processes').then(resp =>{
            this.processes = resp.data.processes
            this.processes.forEach((process)=>{
                process.selected = false;
            })
            this.loading=false
        })
    },
    refreshResults(){
        this.results = []
        this.getFirstResults()
    },
    getFirstResults(){
        this.page = 1
        HTTP.get(this.apiURL+'/results?page=1').then(resp =>{
            resp.data.results.forEach((result)=>{
                result.selected = false;
                this.results.push(result)
            })
            this.page++;
        })
    },
    getMoreResults(){
        HTTP.get(this.apiURL+'/results?page='+this.page).then(resp =>{
            resp.data.results.forEach((result)=>{
                result.selected = false;
                this.results.push(result)
            })
            this.page++;
        })
    },
    toggleResult(result){
        for (let i=0;i<this.results.length;i++){
            if(this.results[i].id == result.id){
                result.selected = !result.selected
                this.results.splice(i,1,result)
            }
        }
    },
    toggleProcess(process){
        for (let i=0;i<this.processes.length;i++){
            if(this.processes[i].id == process.id){
                process.selected = !process.selected
                this.processes.splice(i,1,process)
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
      ProcessesList,
      ResultsList,
      LogView
  }
}
</script>

<style>
</style>