<template>
    <div class="pageoverlay">
        <div class="overlaybox">
            <div class="overlaytop">
                Current configs
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
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
                <ConfigsRow v-for="config in filteredItems" v-bind:config="config">
                </ConfigsRow>
            </div>
            <div class="overlayfooter">
                <div>
                    <router-link to="/modules" class="btn btn-small" tag="button"><i class="fas fa-list"></i> Modules</router-link>
                </div>
                <div>
                    <span v-if="selectedConfigs.length>0">
                    With selected:
                        <button class="btn btn-small" @click="deleteSelected"><i class="fas fa-trash-alt"></i> Delete</button>
                    </span>
                    <button class="btn btn-small" @click="openView('ConfigAdd')"><i class="fas fa-plus-square"></i> Add config</button>
                </div>
            </div>
        </div>    
  </div>
</template>

<script>
import {HTTP} from '@/main'
import ConfigsRow from '@/components/ConfigsRow'

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
        this.updateConfigs()
    },
    methods:{
        forceRerender(){
            this.componentKey += 1;
        },
        updateConfigs(){
            HTTP.get(this.apiURL+'/configs').then((resp)=>{
                this.configs = resp.data.configs
                this.configs.forEach((config) => {
                    this.$set(config, 'selected', false)
                })
            })
        },
        deleteSelected(){
            var r = confirm("Do you really want to delete these "+this.selectedConfigs.length+" config(s)?\nThis can not be undone!")
            if (r == true){
                this.selectedConfigs.forEach((config)=>{
                    HTTP.delete(this.apiURL+'/configs/'+config.id)
                    .then(resp => {
                        this.updateConfigs()
                    })
                })
            }
        },
    },
    components:{
        ConfigsRow
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        selectedConfigs(){
            return _.filter(this.configs, {selected:true})
        },
        filteredItems(){
            return this.configs.filter((item)=>{
                return item.name.toLowerCase().includes(this.filter.name.toLowerCase()) &&
                item.description.toLowerCase().includes(this.filter.description.toLowerCase())
            })
        },       
        orderedItems(){
            return _.orderBy(this.filteredItems, 'id','asc')
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