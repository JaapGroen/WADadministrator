<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Current processes
                
                <span v-for="process in processes">
                    <span v-if="process.selected">{{process.name}}</span>
                </span>
                
                <i class="fas fa-times pointer" @click="closePopup"></i>
            </div>
            <div class="tablehead">
                <div class="tableheader w5">Id</div>
                <div class="tableheader w30">Name</div>
                <div class="tableheader w40">Description</div>
                <div class="tableheader w5">Status</div>
                <div class="tableheader w10"></div>
            </div>
            <div class="overlaycontent">
                <ProcessesRow v-for="process in processes" v-bind:process="process" :key="process.id" 
                    v-on:updateProcesses="updateProcesses" 
                    v-on:responseMessage="responseMessage"
                    v-on:toggleProcess="toggleProcess">
                </ProcessesRow>
                <div v-if="processes.length==0">
                    No active processes.
                </div>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="smbutton" @click="openResults"><i class="fas fa-list"></i> Results</button>
                </div>
                {{msg}}
                <div>
                    <button class="smbutton" @click="resendSelected"> <i class="far fa-paper-plane"></i> Resend</button>
                    <button class="smbutton" @click="updateProcesses"><i class="fas fa-sync"></i> Reload</button>
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
            componentKey: 0,
            selectedProcesses:[]
        }
    },
    mounted(){
        this.setSelectedProcesses()
    },
    methods:{
        responseMessage(msg){
            this.msg=msg;
        },
        closePopup(){
            this.$emit('closePopup','thanks')
        },
        openResults(){
            this.$emit('openResults','thanks')
        },
        updateProcesses(){
            this.$emit('updateProcesses','thanks')
        },
        toggleProcess(process){
            this.$emit('toggleProcess',process)
            this.setSelectedProcesses()
        },
        setSelectedProcesses(){
            this.selectedProcesses = _.filter(this.processes, {selected:true})
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
    }
}


</script>


<style>
</style>
