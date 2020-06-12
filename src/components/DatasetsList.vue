<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                {{datasets.length}} datasets loaded
                <i class="fas fa-times pointer" @click="closePopup"></i>
            </div>
            <div class="overlayhead">
                <div class="id">id</div>
                <div class="data_id">data_id</div>
                <div class="source">source</div>
                <div class="type">type</div>
                <div class="notes">notes</div>
                <div class="results">results</div>
            </div>
            <div id="content" class="overlaycontent" v-on:scroll.passive="onScroll">
                <DatasetsRow v-for="dataset in orderedDatasets" v-bind:dataset="dataset" :key="dataset.data_id"
                    v-on:toggleDataset="toggleDataset">
                </DatasetsRow>   
            </div>
            <div class="overlayfooter">
                <div></div>
                <div></div>
                <div v-if="selectedDatasets.length>0">
                    With selected:
                    <button class="btn btn-small"> <i class="far fa-paper-plane"></i> Send to WADselector</button>
                </div>
            </div>
        </div>      
    </div>
</template>

<script>
import DatasetsRow from '@/components/DatasetsRow'
import {HTTP} from '@/main'
import _ from 'lodash'

export default {
    props:['datasets','msg'],
    data(){
        return {
            componentKey: 0,
        }
    },
    methods:{
        closePopup(){
            this.$emit('closePopup','thanks')
        },
        toggleDataset(dataset){
            this.$emit('toggleDataset',dataset)
            this.forceRerender()
        },
        onScroll(){
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(()=>{
                var div = document.getElementById("content");
                if (div.scrollHeight-(div.scrollTop+div.clientHeight)<20){
                    this.$emit('getMoreDatasets','thanks')
                }
            },150);
        },
        forceRerender () {
            this.componentKey++;  
        },
    },
    components:{
        DatasetsRow,
    },
    computed:{
        apiURL(){
            'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        selectedDatasets(){
            return _.filter(this.datasets, {selection:true})
        },
        orderedDatasets: function(){
            return _.orderBy(this.datasets, 'id','asc')
        },
    },
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

.data_id{
    padding-left:5px;
    padding-right:5px;
    flex:3 0 0;
}

.source{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.type{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.notes{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.results{
    padding-left:5px;
    padding-right:20px;  /* for scrollbar */
    flex:1 1 0;
}
</style>
