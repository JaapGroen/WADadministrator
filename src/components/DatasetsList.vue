<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                {{datasets.length}} datasets available
                <i class="fas fa-times pointer" @click="closePopup"></i>
            </div>
            <div class="tablehead">
                <div class="tableheader">
                    <div class="tablecell">id</div>
                    <div class="tablecell">source</div>
                    <div class="tablecell">type</div>
                    <div class="tablecell">notes</div>
                </div>
            </div>
            <div id="content" class="overlaycontent" v-on:scroll.passive="onScroll">
                <DatasetsRow v-for="dataset in orderedDatasets" v-bind:dataset="dataset" :key="dataset.data_id"
                    v-on:toggleDataset="toggleDataset">
                </DatasetsRow>   
            </div>
            <div class="overlayfooter">
                <div></div>
                <div>{{msg}}</div>
                <div v-if="selectedDatasets.length>0">
                    With selected:
                    <button class="smbutton"> <i class="far fa-paper-plane"></i> Send to WADselector</button>
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
            componentKey: 0
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


<style>
</style>
