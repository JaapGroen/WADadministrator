<template>
    <div class="pageoverlay">
        <div class="overlaybox">
            <div class="overlaytop">
                Results for dataset {{dataset.id}}
                <i class="fas fa-times pointer" @click="openView('None')"></i>
            </div>
            <div class="overlayhead">
                <div class="name">Type</div>
                <div class="description">Description</div>
            </div>
            <div class="overlaycontent" v-if="!loading">
                <ResultsViewRow v-bind:test="{display_name:'Selector',value:result.selector.name}"></ResultsViewRow>
                <ResultsViewRow v-bind:test="{display_name:'Result',value:dataset.results[0]}"></ResultsViewRow>
                <ResultsViewRow class="divider" v-bind:class="'c'+result.result.status.tests" v-bind:test="{display_name:'General status',value:result.result.status.tests}"></ResultsViewRow>
                <ResultsViewRow v-for="test in result.tests" v-bind:test="test" :key="test.id" ></ResultsViewRow>
                <div v-if="dataset.results.length==0" class="tablerow">
                    <div class="name">
                        None.
                    </div>
                    <div class="description"></div>
                    <div class="buttons"></div>
                </div>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="openView('listView')"><i class="fas fa-list"></i> Datasets</button>
                </div>
                <div></div>
                <div>
                    
                </div>       
            </div>
        </div>
    </div>
</template>

<script>
import NotesRow from '@/components/NotesRow'
import {HTTP} from '../main'
import ResultsViewRow from '@/components/ResultsViewRow'

export default {
  props:['dataset'],
    data(){
        return {
            result:'',
            loading:true
        }
  },
    created(){
        this.getResults(this.dataset.results[0])
    },
  methods:{
    openView(View){
      this.$emit('openView',View)
    },
    getResults(id_result){
        HTTP.get(this.apiURL+'/results/'+id_result).then((resp)=>{
            var id_selector = resp.data.result.selector.id
            HTTP.get(this.apiURL+'/selectors/'+id_selector+'/results/'+id_result).then((resp)=>{
                this.result = resp.data
                this.loading = false
            })
        })
    }

  },
  components:{
    ResultsViewRow
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
