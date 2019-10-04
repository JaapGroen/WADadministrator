<template>
    <div class="pageoverlay">
  
        <div class="overlaybox" v-if="showModulesList">
            <div class="overlaytop">
                Current modules
                <i class="fas fa-times pointer" @click="closeView"></i>
            </div>
            <div class="tablehead">
                <div class="tableheader">Id</div>
                <div class="tableheader">Name</div>
                <div class="tableheader">Description</div>
                <div class="tableheader">Executable</div>
                <div class="tableheader"></div>
            </div>
            <div class="overlaycontent">
                <ModulesRow v-for="module in modules" v-bind:module="module" :key="module.id" v-on:updateModules="updateModules"></ModulesRow>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="smbutton" @click="openAddModule"><i class="fas fa-plus-square"></i> Add module</button>
                    {{msg}}
                </div>
            </div>
        </div>
    
        <div class="overlaybox" v-if="showAddModule">
            <div class="overlaytop">
                Add a module
                <i class="fas fa-times pointer" @click="closeView"></i>
            </div>
            <div class="tablehead">
                <div class="tableheader">Name</div>
                <div class="tableheader">Version</div>
            </div>
            <AddModule v-on:openModulesList="openModulesList"></AddModule>
            <div class="overlayfooter">
                <button class="smbutton" @click="openModulesList"><i class="fas fa-list"></i> Modules</button>
            </div>
        </div>    
    
  </div>
</template>

<script>
import ModulesRow from '@/components/ModulesRow'
import AddModule from '@/components/AddModule'
import {HTTP} from '@/main'

export default {
    props:['modules'],
    data(){
        return {
            msg:'',
            componentKey: 0,
            apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
            showModulesList:true,
            showAddModule:false,
            msg:'',
        }
    },
    methods:{
        closeView(){
            this.$emit('closeView','thanks')
        },
        forceRerender(){
            this.componentKey += 1;
        },
        openAddModule(){
            this.showModulesList=false
            this.showAddModule=true
        },
        openModulesList(msg){
            this.updateModules()
            this.showModulesList=true
            this.showAddModule=false
            this.msg=msg
        },
        updateModules(msg){
            this.$emit('updateModules','thanks')
            this.msg=msg
        },
    },
    components:{
        ModulesRow,
        AddModule,
    },
}

</script>

<style>
.overlaybox{
  display:flex;
  flex-direction:column;
  height:70%;
  width:70%;
  box-sizing: border-box;
  align-items:center;
  justify-content:center;
}

.tablehead{
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:space-between;
  background:#444444;
}

.tableheader{
  padding-left:10px;
  width:calc(100% / 6);
}

.textbox{
  border:none;
  background-color:#444444;
  width:100%;
  height:30px;
  border-bottom:3px solid #0FAAEA;
  color:white;
  font-family: 'Roboto', sans-serif;
  border-radius: 5px;
}
</style>