<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                {{filteredDatasets.length}} datasets ({{datasets.length}} datasets loaded)
                <i class="fas fa-times pointer" @click="openView('None')"></i>
            </div>
            <div class="overlayhead">
                <div class="id">id</div>
                <div class="station">
                    <input type="text" class="filterbox" v-model="filter.stationname" placeholder="StationName"/>
                </div>
                <div class="patientname">
                    <input type="text" class="filterbox" v-model="filter.patientname" placeholder="PatientName"/>
                </div>
                <div class="study">
                    <input type="text" class="filterbox" v-model="filter.study" placeholder="StudyDescription"/>
                </div>
                <div class="serie">
                    <input type="text" class="filterbox" v-model="filter.serie" placeholder="SeriesDescription"/>
                </div>
                <div class="date">
                    <input type="text" class="filterbox" v-model="filter.date" placeholder="StudyDate"/>
                </div>
                <div class="type">
                    <input type="text" class="filterbox" v-model="filter.type" placeholder="Type"/>
                </div>
                <div class="buttons">
                    <select class="filterselect" v-model="filter.results">
                        <option value="99999999">All</option>
                        <option value="1">Without results</option>
                    </select>
                </div>
            </div>
            <div id="content" class="overlaycontent" v-on:scroll.passive="onScroll">
                <DatasetsRow v-for="dataset in filteredDatasets" v-bind:dataset="dataset" :key="dataset.data_id"
                    v-on:toggleDataset="toggleDataset"
                    v-on:openView="openView">
                </DatasetsRow>   
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="loadMore"><i class="fas fa-cloud-download-alt"></i> Load 25 more</button>
                </div>
                <div>
                    <span v-if="selectedDatasets.length>0">With selected:
                    <button class="btn btn-small"><i class="far fa-paper-plane"></i> Send to WADselector</button>
                    </span>
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
            filter:{stationname:'',patientname:'',study:'',serie:'',date:'',type:'',results:99999999}
        }
    },
    methods:{
        openView(View,payload){
            this.$emit('openView',View,payload)
        },
        toggleDataset(dataset){
            this.$emit('toggleDataset',dataset)
            this.forceRerender()
        },
        loadMore(){
            this.$emit('getMoreDatasets','thanks')
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
        filteredDatasets(){            
            return this.orderedDatasets.filter((dataset)=>{
                return dataset.tags['0008,1010'].Value.toLowerCase().includes(this.filter.stationname.toLowerCase()) &&
                dataset.tags['0010,0010'].Value.toLowerCase().includes(this.filter.patientname.toLowerCase()) &&
                dataset.tags['0008,1030'].Value.toLowerCase().includes(this.filter.study.toLowerCase()) &&
                dataset.tags['0008,103e'].Value.toLowerCase().includes(this.filter.serie.toLowerCase()) &&
                dataset.tags['0008,0020'].Value.toLowerCase().includes(this.filter.date.toLowerCase()) &&
                dataset.data_type.name.toLowerCase().includes(this.filter.type.toLowerCase()) &&
                (dataset.results.length<this.filter.results)
            })
        },
    },
}


</script>


<style scoped>
.id{
    padding-left:5px;
    padding-right:20px;
    width:25px;
}

.station{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.patientname{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.study{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.serie{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.date{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.type{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.buttons{
    padding-left:5px;
    padding-right:20px;
    width:150px;
}
</style>
