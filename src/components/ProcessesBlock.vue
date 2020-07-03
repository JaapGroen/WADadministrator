<template>
    <router-link to="/processes" class="block" tag="div">
        <div class="item_title" v-bind:class="color">Processes & Results</div>

        <div class="item_content">
            Overview of all current 
            </br>
            processes and results.
        </div>

        <div class="item_footer" v-if="loading">
            Loading processes...      
        </div>
        <div class="item_footer" v-if="!loading">
            {{processes.length}} processes in queue      
        </div>
    </router-link>
</template>


<script>
import {HTTP} from '../main'
import _ from 'lodash'

export default {
    data(){
        return {
            loading:true,
            processes:[],
            results:[],
        }
    },
    created(){
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
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        color(){
            var colornumber = 0
            for (let i=0;i<this.processes.length;i++){
                if (this.processes[i].status == 'module error'){
                    if (colornumber < 3){
                        colornumber = 3
                    }
                }
                if (this.processes[i].status == 'waiting for input'){
                    if (colornumber < 2){
                        colornumber = 2
                    }
                }
            }
            return 'bgc'+colornumber
        }
    },
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