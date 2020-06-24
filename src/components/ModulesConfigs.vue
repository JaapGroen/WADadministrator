<template>
    <div class="pageoverlay">
        <div class="overlaybox">
            <div class="overlaytop">
                Current configs
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
                <div class="selector">Selector</div>
                <div class="selector">Meta</div>

                <div class="buttons"></div>
            </div>
            <div class="overlaycontent">
                <ModulesConfigsRow v-for="config in configs" v-bind:config="config" 
                    v-on:openView="openView">
                </ModulesConfigsRow>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="openView('ModulesList')"><i class="fas fa-list"></i> Modules</button>
                </div>
                <div>
                    <span v-if="selectedConfigs.length>0">
                    With selected:
                    
                    </span>
                    <button class="btn btn-small" @click="openView('ConfigAdd')"><i class="fas fa-plus-square"></i> Add config</button>
                </div>
            </div>
        </div>    
  </div>
</template>

<script>
import {HTTP} from '@/main'
import ModulesConfigsRow from '@/components/ModulesConfigsRow'

export default {
    props:[''],
    data(){
        return {
            componentKey: 0,
            configs:[],
            filter:{name:'',description:''}
        }
    },
    mounted(){
        this.getConfigs()
    },
    methods:{
        openView(View,payload){
            this.$emit('openView',View,payload)
        },
        forceRerender(){
            this.componentKey += 1;
        },
        getConfigs(){
            HTTP.get(this.apiURL+'/configs').then((resp)=>{
                this.configs = resp.data.configs
                this.configs.forEach((config) => {
                    this.$set(config, 'selected', false)
                })
            })
        },
        toggleConfig(config){
            for (let i=0;i<this.configs.length;i++){
                if(this.config[i].id == config.id){
                    config.selected = !config.selected
                    this.configs.splice(i,1,config)
                }
            }
        },
    },
    components:{
        ModulesConfigsRow
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        selectedConfigs(){
            return _.filter(this.configs, {selected:true})
        },
    }
}

</script>

<style scoped>
.id{
    padding-left:5px;
    padding-right:20px;
    width:50px;
}

.name{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.description{
    padding-left:5px;
    padding-right:5px;
    flex:2 1 0;
}

.selector{
    padding-left:5px;
    padding-right:20px;
    width:50px;
}

.meta{
    padding-left:5px;
    padding-right:20px;
    width:50px;
}

.buttons{
    padding-left:5px;
    padding-right:20px;
    width:100px;
}
</style>