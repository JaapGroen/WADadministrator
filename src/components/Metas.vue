<template>
    <div class="pageoverlay">
        <div class="overlaybox">
            <div class="overlaytop">
                Current metas
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div class="overlayhead">
                <div class="id">Id</div>
                <div class="selector">Selector(s)</div>
                <div class="config">Config(s)</div>
                <div class="buttons"></div>
            </div>
            <div class="overlaycontent">
                <MetasRow v-for="meta in metas" v-bind:meta="meta">
                </MetasRow>
            </div>
            <div class="overlayfooter">
                <div>
                    <router-link to="/modules" class="btn btn-small" tag="button"><i class="fas fa-list"></i> Modules</router-link>
                    <router-link to="/configs" class="btn btn-small" tag="button"><i class="fas fa-list"></i> Configs</router-link>
                </div>
                <div>
                    <span v-if="selectedMetas.length>0">
                    With selected:
                        <button class="btn btn-small" @click="deleteSelected"><i class="fas fa-trash-alt"></i> Delete</button>
                    </span>
                </div>
            </div>
        </div>    
  </div>
</template>

<script>
import {HTTP} from '@/main'
import MetasRow from '@/components/MetasRow'

export default {
    props:[''],
    data(){
        return {
            metas:[],
        }
    },
    mounted(){
        this.updateMetas()
    },
    methods:{
        forceRerender(){
            this.componentKey += 1;
        },
        updateMetas(){
            HTTP.get(this.apiURL+'/metas').then((resp)=>{
                this.metas = resp.data.metas
                this.metas.forEach((meta) => {
                    this.$set(meta, 'selected', false)
                })
            })
        },
        deleteSelected(){
            var r = confirm("Do you really want to delete these "+this.selectedMetas.length+" config(s)?\nThis can not be undone!")
            if (r == true){
                this.selectedMetas.forEach((meta)=>{
                    HTTP.delete(this.apiURL+'/metas/'+config.id)
                    .then(resp => {
                        this.updateMetas()
                    })
                })
            }
        },
    },
    components:{
        MetasRow
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        selectedMetas(){
            return _.filter(this.metas, {selected:true})
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

.selector{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.config{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:100px;
}
</style>