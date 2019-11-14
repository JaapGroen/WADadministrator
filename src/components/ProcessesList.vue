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
                
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="smbutton"> Results</button>
                </div>
                {{msg}}
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
            apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
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
        openImport(){
            this.$emit('openImport','thanks')
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
        exportSelected(){
            this.selectedProcesses.forEach((process)=>{
                HTTP.get(this.apiURL+'/processes/'+process.id+'?download=true').then(res =>{
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'process_'+process.id+'.zip');
                    document.body.appendChild(link);
                    link.click();

                })
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
    }
}


</script>


<style>
</style>
