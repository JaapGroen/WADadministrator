<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Current results                
                <i class="fas fa-times pointer" @click="closePopup"></i>
            </div>
            <div class="tablehead">
                <div class="tableheader">Id</div>
                <div class="tableheader">created</div>
                <div class="tableheader">type</div>
                <div class="tableheader">notes</div>
                <div class="tableheader"></div>
            </div>
            <div class="overlaycontent">
                <ResultsRow v-for="result in results" v-bind:result="result" :key="result.id" 
                    v-on:updateResults="updateResults" 
                    v-on:responseMessage="responseMessage"
                    v-on:toggleResult="toggleResult">
                </ResultsRow>
                
            </div>
            <div class="overlayfooter">
                <button class="smbutton" @click="openProcesses"><i class="fas fa-list"></i> Processes</button>
                {{msg}}
                <div>
                    <button class="smbutton" @click="resendSelected"> <i class="far fa-paper-plane"></i> Resend</button>
                    <button class="smbutton" @click="updateResults"><i class="fas fa-sync"></i> Reload</button>
                </div>
                
            </div>
        </div>      
    </div>
</template>

<script>
import ResultsRow from '@/components/ResultsRow'
import _ from 'lodash'
import {HTTP} from '@/main'

export default {
    props:['results'],
    data(){
        return {
            msg:'',
            componentKey: 0,
            selectedResults:[]
        }
    },
    mounted(){
        this.setSelectedResults()
    },
    methods:{
        responseMessage(msg){
            this.msg=msg;
        },
        closePopup(){
            this.$emit('closePopup','thanks')
        },
        openProcesses(){
            this.$emit('openProcesses','thanks')
        },
        updateResults(){
            this.$emit('updateResults','thanks')
        },
        toggleResult(result){
            this.$emit('toggleResult',result)
            this.setSelectedResults()
        },
        setSelectedResults(){
            this.selectedResults = _.filter(this.results, {selected:true})
        }, 
        resendSelected(){
            this.selectedResults.forEach((result)=>{
                HTTP.put(this.apiURL+'/results/'+result.id).then(resp =>{
                })
            })
        }, 
    },
  components:{
      ResultsRow,
  },
    computed:{
        orderedProcesses: function(){
            return _.orderBy(this.processes, 'id')
        },
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    }
}


</script>


<style>
</style>
