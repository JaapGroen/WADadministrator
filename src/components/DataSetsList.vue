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
            <div class="overlaycontent">
                <DataSetsRow v-for="dataset in datasets" v-bind:dataset="dataset" :key="dataset.id"
                    v-on:toggleDataset="toggleDataset">
                </DataSetsRow>   
            </div>
            <div class="overlayfooter">
                <div></div>
                <button class="smbutton"> <i class="far fa-paper-plane"></i> Send to WADselector</button>
            </div>
        </div>      
    </div>
</template>

<script>
import DataSetsRow from '@/components/DataSetsRow'
import {HTTP} from '@/main'
import _ from 'lodash'

export default {
    props:['datasets','msg'],
    data(){
        return {
            componentKey: 0,
            selectedDatasets:[]
        }
    },
    methods:{
        closePopup(){
            this.$emit('closePopup','thanks')
        },
        toggleDataset(dataset){
            this.$emit('toggleDataset',dataset)
            this.setSelectedDatasets()
        },
        setSelectedDatasets(){
            this.selectedDatasets = _.filter(this.datasets, {selected:true})
        },
    },
    components:{
        DataSetsRow,
    },
    computed:{
        apiURL(){
            'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    },
    mounted(){
        this.setSelectedDatasets()
    },
}


</script>


<style>
</style>
