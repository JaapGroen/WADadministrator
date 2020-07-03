<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Current processes
                
                <span v-for="process in processes">
                    <span v-if="process.selected">{{process.name}}</span>
                </span>
                
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div class="overlayhead">
                <div class="id">Id</div>
                <div class="created">Created</div>
                <div class="selector">
                    <input type="text" class="filterbox" v-model="filter.selector" placeholder="Selector"/>
                </div>
                <div class="type">
                    <input type="text" class="filterbox" v-model="filter.type" placeholder="Type"/>
                </div>
                <div class="status">
                    <input type="text" class="filterbox" v-model="filter.status" placeholder="Status"/>
                </div>
                <div class="buttons"></div>
            </div>
            <div class="overlaycontent">
                <ProcessesRow v-for="process in orderedItems" v-bind:process="process" :key="process.id" 
                    v-on:updateProcesses="updateProcesses">
                </ProcessesRow>
                <div v-if="processes.length==0">
                    No active processes.
                </div>
            </div>
            <div class="overlayfooter">
                <div>
                    <router-link to="/results" class="btn btn-small" tag="button"><i class="fas fa-list"></i> Results</router-link>
                </div>
                <div></div>
                <div>                    
                    <span v-if="selectedProcesses.length>0">
                        With selected:
                        <button class="btn btn-small" @click="resendSelected"> <i class="far fa-paper-plane"></i> Resend</button>
                        <button class="btn btn-small" @click="deleteSelected"> <i class="fas fa-trash"></i> Delete</button>
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
    props:[''],
    data(){
        return {
            processes:[],
            filter:{selector:'',type:'',status:''}
        }
    },
    mounted(){
        this.updateProcesses()
    },
    methods:{
        updateProcesses(){
            HTTP.get(this.apiURL+'/processes').then(resp =>{
                this.processes = resp.data.processes
                this.processes.forEach((process)=>{
                    this.$set(process, 'selected', false)
                })
                this.loading=false
            })
        },
        resendSelected(){
            this.selectedProcesses.forEach((result)=>{
                console.log(result.id)
            })
        },
        deleteSelected(){
            this.selectedProcesses.forEach((process)=>{
                HTTP.delete(this.apiURL+'/processes/'+this.process.id).then(resp=>{
                    this.updateProcesses()
                })
            })
        }
    },
    components:{
        ProcessesRow,
    },
    computed:{
        filteredItems(){
            return this.processes.filter((item)=>{
                return item.selector.name.toLowerCase().includes(this.filter.selector.toLowerCase()) &&
                item.data_set.data_type.name.toLowerCase().includes(this.filter.type.toLowerCase()) &&
                item.status.toLowerCase().includes(this.filter.status.toLowerCase())
            })
        },       
        orderedItems(){
            return _.orderBy(this.filteredItems, 'id','desc')
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
    width:150px;
}
</style>
