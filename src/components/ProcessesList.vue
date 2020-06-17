<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Current processes
                
                <span v-for="process in processes">
                    <span v-if="process.selected">{{process.name}}</span>
                </span>
                
                <i class="fas fa-times pointer" @click="openView('Nothing')"></i>
            </div>
            <div class="overlayhead">
                <div class="id">Id</div>
                <div class="created">Created</div>
                <div class="type">Type</div>
                <div class="selector">Selector</div>
                <div class="status">Status</div>
                <div class="buttons"></div>
            </div>
            <div class="overlaycontent">
                <ProcessesRow v-for="process in processes" v-bind:process="process" :key="process.id" 
                    v-on:updateProcesses="updateProcesses" 
                    v-on:toggleProcess="toggleProcess"
                    v-on:openView="openView">
                </ProcessesRow>
                <div v-if="processes.length==0">
                    No active processes.
                </div>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="openView('resultView')"><i class="fas fa-list"></i> Results</button>
                </div>
                <div></div>
                <div>                    
                    <span v-if="selectedProcesses.length>0">
                        With selected:
                        <button class="btn btn-small" @click="resendSelected"> <i class="far fa-paper-plane"></i> Resend</button>
                    </span>
                    <button class="btn btn-small" @click="updateProcesses"><i class="fas fa-sync"></i> Reload</button>
                </div>
            </div>
        </div>      
    </div>
</template>

<script>
import ProcessesRow from '@/components/ProcessesRow'
import _ from 'lodash'
import {HTTP} from '@/main'

export default {
    props:['processes'],
    data(){
        return {
            msg:'',
        }
    },
    methods:{
        openView(View,log){
            this.$emit('openView',View,log)
        },
        updateProcesses(){
            this.$emit('updateProcesses','thanks')
        },
        toggleProcess(process){
            this.$emit('toggleProcess',process)
        },
        resendSelected(){
            this.selectedProcesses.forEach((result)=>{
                console.log(result.id)
            })
        },
    },
    components:{
        ProcessesRow,
    },
    computed:{
        orderedProcesses: function(){
            return _.orderBy(this.processes, 'id')
        },
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        selectedProcesses(){
            return _.filter(this.processes, {selected:true})
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

.selector{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.status{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:200px;
}
</style>
