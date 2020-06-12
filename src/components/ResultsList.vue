<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                {{results.length}} results loaded 
                <i class="fas fa-times pointer" @click="closePopup"></i>
            </div>
            <div class="overlayhead">
                <div class="id">Id</div>
                <div class="created">created</div>
                <div class="type">type</div>
                <div class="notes">notes</div>
                <div class="buttons"></div>
            </div>
            <div class="overlaycontent" id="content" v-on:scroll.passive="onScroll">
                <ResultsRow v-for="result in orderedResults" v-bind:result="result" :key="result.id" 
                    v-on:updateResults="updateResults" 
                    v-on:toggleResult="toggleResult"
                    v-on:openLog="openLog">
                </ResultsRow>
            </div>
            <div class="overlayfooter">
                <button class="btn btn-small" @click="openProcesses"><i class="fas fa-list"></i> Processes</button>
                <div v-if="selectedResults.length>0">
                    With selected:
                    <button class="btn btn-small" @click="resendSelected"> <i class="far fa-paper-plane"></i> Resend</button>
                </div>
                <button class="btn btn-small" @click="updateResults"><i class="fas fa-sync"></i> Reload</button>
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
        }
    },
    methods:{
        closePopup(){
            this.$emit('closePopup','thanks')
        },
        openProcesses(){
            this.$emit('openProcesses','thanks')
        },
        openLog(log){
            this.$emit('openLog',log)
        },
        updateResults(){
            this.$emit('updateResults','thanks')
        },
        onScroll(){
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(()=>{
                var div = document.getElementById("content");
                if (div.scrollHeight-(div.scrollTop+div.clientHeight)<20){
                    this.$emit('getMoreResults','thanks')
                }
            },150);
        },
        toggleResult(result){
            this.$emit('toggleResult',result)
        },
        setSelectedResults(){
            this.selectedResults = _.filter(this.results, {selected:true})
        }, 
        resendSelected(){
            var promises = [];
            this.selectedResults.forEach((result)=>{
                promises.push(
                    HTTP.put(this.apiURL+'/results/'+result.id).then(resp =>{
                    })
                )
            })
            Promise.all(promises).then(()=>{
                this.$emit('refreshResults','thanks')
            })
        }, 
    },
  components:{
      ResultsRow,
  },
    computed:{
        orderedResults: function(){
            return _.orderBy(this.results, 'created','desc')
        },
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        selectedResults(){
            return _.filter(this.results, {selected:true})
        },
    }
}


</script>


<style scoped>
.id{
    display:flex;
    flex-direction:row;
    align-items:center;
    flex:0 1 0;
    min-width:70px;
    padding-left:5px;
    padding-right:5px;
}

.created{
    padding-left:5px;
    padding-right:5px;
    flex:2 0 0;
}

.type{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.notes{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.buttons{
    padding-left:5px;
    padding-right:20px;
    width:80px;
}
</style>
