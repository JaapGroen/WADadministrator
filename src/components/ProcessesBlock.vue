<template>
    <div>
        <div class="block" @click="openView('processView')">
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
            <ProcessesList v-if="show.processView" v-bind:processes="processes" :key=1
                v-on:openView="openView"
                v-on:updateProcesses="updateProcesses"
                v-on:toggleProcess="toggleProcess">
            </ProcessesList>
            <ResultsList v-if="show.resultView" v-bind:results="results" :key=1
                v-on:openView="openView"
                v-on:getMoreResults="getMoreResults"
                v-on:toggleResult="toggleResult"
                v-on:refreshResults="refreshResults">
            </ResultsList>
            <LogView v-if="show.logView" v-bind:log="payload" :key=1
                v-on:openView="openView">
            </LogView>
            <InputView v-if="show.inputView" v-bind:payload="payload" :key=1
                v-on:openView="openView">
            </InputView>
        </transition>
    </div>
</template>


<script>
 import {HTTP} from '../main'
 import ProcessesList from '@/components/ProcessesList'
 import ResultsList from '@/components/ResultsList'
 import LogView from '@/components/LogView'
 import InputView from '@/components/InputView'
 import _ from 'lodash'

 export default {
  data(){
      return {
        loading:true,
        show:{processView:false,resultView:false,logView:false,inputView:false},
        processes:[],
        results:[],
        page:'',
        log:'',
        payload:''
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
    openView(View,payload){
        this.payload = payload
        Object.keys(this.show).forEach((view)=>{
            if (view == View){
                this.show[view] = true
            } else {
                this.show[view] = false
            }
        })
    },
    updateProcesses(){
        HTTP.get(this.apiURL+'/processes').then(resp =>{
            this.processes = resp.data.processes
            this.processes.forEach((process)=>{
                this.$set(process, 'selected', false)
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
                this.$set(result, 'selected', false)
                this.results.push(result)
            })
            this.page++;
        })
    },
    getMoreResults(){
        HTTP.get(this.apiURL+'/results?page='+this.page).then(resp =>{
            resp.data.results.forEach((result)=>{
                this.$set(result, 'selected', false)
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
      LogView,
      InputView
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