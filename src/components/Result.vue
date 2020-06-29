<template>
    <div class="pageoverlay">
        <div class="overlaybox" v-if="!loading">
            <div class="overlaytop">
                Result {{selectorresult.result.id}}
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div class="overlayhead">
                <div class="name">Type</div>
                <div class="description">Description</div>
            </div>
            <div class="overlaycontent">
                <ResultRow v-bind:test="{display_name:'Selector',value:selectorresult.selector.name}"></ResultRow>
                <ResultRow v-bind:test="{display_name:'Result',value:selectorresult.result.id}"></ResultRow>
                <ResultRow class="divider" v-bind:class="'c'+selectorresult.result.status.tests" v-bind:test="{display_name:'General status',value:selectorresult.result.status.tests}"></ResultRow>
                <ResultRow v-for="test in selectorresult.tests" v-bind:test="test" :key="test.id" ></ResultRow>
                <div v-if="selectorresult.tests.length==0" class="tablerow">
                    <div class="name">
                        None.
                    </div>
                    <div class="description"></div>
                    <div class="buttons"></div>
                </div>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="$router.go(-1)"><i class="fas fa-list"></i> Back</button>
                </div>
                <div></div>
                <div>
                    
                </div>       
            </div>
        </div>
    </div>
</template>

<script>
import {HTTP} from '../main'
import ResultRow from '@/components/ResultRow'

export default {
    props:[''],
    data(){
        return {
            selectorresult:'',
            loading:true
        }
    },
    created(){
        this.getResult(this.$route.params.id)
    },
    methods:{
        getResult(id_result){
            HTTP.get(this.apiURL+'/results/'+id_result).then((resp)=>{
                var id_selector = resp.data.result.selector.id
                HTTP.get(this.apiURL+'/selectors/'+id_selector+'/results/'+id_result).then((resp)=>{
                    this.selectorresult = resp.data
                    this.loading = false
                })
            })
        }

    },
    components:{
        ResultRow
    },
    computed: {
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
    },
}
</script>

<style scoped>
.divider{
    border-bottom:2px solid #FFFFFF;
}

.name{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.description{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:190px;
}
</style>
