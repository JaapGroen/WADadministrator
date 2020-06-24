<template>
    <div class="pageoverlay">
        <div class="overlaybox">
            <div class="overlaytop">
                Current modules
                <i class="fas fa-times pointer" @click="openView('None')"></i>
            </div>
            <div class="overlayhead">
                <div class="id">Id</div>
                <div class="name">
                    <input type="text" class="filterbox" v-model="filter.name" placeholder="Name"/>
                </div>
                <div class="description">
                    <input type="text" class="filterbox" v-model="filter.description" placeholder="Description"/>
                </div>
                <div class="origin">Origin</div>
                <div class="version">Version</div>
                <div class="buttons"></div>
            </div>
            <div class="overlaycontent">
                <ModulesRow v-for="module in filteredModules" v-bind:module="module" :key="module.id" v-on:updateModules="updateModules"></ModulesRow>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="openView('ConfigsList')"><i class="fas fa-list"></i> Configs</button>
                </div>
                <div>
                    <button class="btn btn-small" @click="openView('ModulesAdd')"><i class="fas fa-plus-square"></i> Add module</button>
                </div>
            </div>
        </div>    
  </div>
</template>

<script>
import ModulesRow from '@/components/ModulesRow'
import {HTTP} from '@/main'
import ModulesConfigs from '@/components/ModulesConfigs'

export default {
    props:['modules'],
    data(){
        return {
            msg:'',
            componentKey: 0,
            msg:'',
            filter:{name:'',description:''}
        }
    },
    methods:{
        openView(View){
            this.$emit('openView',View)
        },
        forceRerender(){
            this.componentKey += 1;
        },
        updateModules(msg){
            this.$emit('updateModules','thanks')
            this.msg=msg
        },
    },
    components:{
        ModulesRow,
        ModulesConfigs
    },
    computed:{
        filteredModules(){
            return this.modules.filter((el)=>{
                return el.description.toLowerCase().includes(this.filter.description.toLowerCase()) &&
                el.name.toLowerCase().includes(this.filter.name.toLowerCase())
            })
        },
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
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
    min-width:50px;
    padding-left:5px;
    padding-right:5px;
}

.name{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.description{
    padding-left:5px;
    padding-right:5px;
    flex:2 0 0;
}

.origin{
    padding-left:5px;
    padding-right:5px;
    width:80px;
}

.version{
    padding-left:5px;
    padding-right:5px;
    width:80px;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:80px;
}
</style>