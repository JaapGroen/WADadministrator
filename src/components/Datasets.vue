<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                {{filteredDatasets.length}} datasets ({{datasets.length}} datasets loaded)
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
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
            <div id="content" class="overlaycontent" v-on:scroll.passive="onScroll" v-if="!loading">
                <DatasetsRow v-for="dataset in filteredDatasets" v-bind:dataset="dataset" :key="dataset.data_id">
                </DatasetsRow>   
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="getMoreDatasets"><i class="fas fa-cloud-download-alt"></i> Load 25 more</button>
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
    props:[],
    data(){
        return {
            loading:true,
            filter:{stationname:'',patientname:'',study:'',serie:'',date:'',type:'',results:99999999},
            datasets:[],
            page:1,
            empty_tags: {
                '0008,1010':{Value:'?'},
                '0010,0010':{Value:'?'},
                '0008,1030':{Value:'?'},
                '0008,103e':{Value:'?'},
                '0008,0020':{Value:'?'}
            }
        }
    },
    mounted(){
        this.getFirstDatasets()
    },
    methods:{
        onScroll(){
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(()=>{
                var div = document.getElementById("content");
                if (div.scrollHeight-(div.scrollTop+div.clientHeight)<20){
                    this.getMoreDatasets()
                }
            },150);
        },
        getFirstDatasets(){
            this.page = 1
            HTTP.get(this.apiURL+'/datasets?page=1').then((resp)=>{
                this.datasets = resp.data.datasets
                var promises = []
                this.datasets.forEach((dataset)=>{
                    this.$set(dataset, 'selected', false)
                    promises.push(
                        HTTP.get(this.apiURL+'/datasets/'+dataset.id+'/tags').then(resp=>{
                            if (resp.data.success){
                                this.$set(dataset, 'tags', resp.data.tags)
                            } else {
                                this.$set(dataset, 'tags', this.empty_tags)
                            }
                        })
                    )
                })
                Promise.all(promises).then(()=>{
                    this.page++
                    this.loading = false
                })
            })
        },
        getMoreDatasets(){
            HTTP.get(this.apiURL+'/datasets?page='+this.page).then((resp)=>{
                if (resp.data.datasets.length>0){
                    this.page++
                    resp.data.datasets.forEach((dataset)=>{
                        this.$set(dataset, 'selected', false)
                        HTTP.get(this.apiURL+'/datasets/'+dataset.id+'/tags').then(resp=>{
                            if (resp.data.success){
                                this.$set(dataset, 'tags', resp.data.tags)
                            } else {
                                this.$set(dataset, 'tags', this.empty_tags)
                            }
                            this.datasets.push(dataset)
                        })
                    })
                }
            })
        },
    },
    components:{
        DatasetsRow,
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        selectedDatasets(){
            return _.filter(this.datasets, {selection:true})
        },
        orderedDatasets: function(){
            return _.orderBy(this.datasets, 'id','asc')
        },
        filteredDatasets(){            
            return this.orderedDatasets
            // return this.orderedDatasets.filter((dataset)=>{
                // return dataset.tags['0008,1010'].Value.toLowerCase().includes(this.filter.stationname.toLowerCase()) 
                // dataset.tags['0010,0010'].Value.toLowerCase().includes(this.filter.patientname.toLowerCase()) &&
                // dataset.tags['0008,1030'].Value.toLowerCase().includes(this.filter.study.toLowerCase()) &&
                // dataset.tags['0008,103e'].Value.toLowerCase().includes(this.filter.serie.toLowerCase()) &&
                // dataset.tags['0008,0020'].Value.toLowerCase().includes(this.filter.date.toLowerCase()) &&
                // dataset.data_type.name.toLowerCase().includes(this.filter.type.toLowerCase()) &&
                // (dataset.results.length<this.filter.results)
            // })
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
