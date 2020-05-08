<template>
    <div>
        <div class="block" @click="openDatasets">
            <div class="item_title bgc0">Datasets</div>
    
            <div v-if="!loading" class="item_content">
            {{datasets.length}} datasets
            </div>
    
            <div v-if="loading" class="item_content">
                <i class="fas fa-sun fa-2x fa-spin"></i>
            </div>
    
            <div class="item_footer">
                footer      
            </div>
        </div>
        <transition name="fade">
            <DataSetsList v-if="showDataSets" v-bind:datasets="datasets" :msg="msg" :key=1 
                v-on:closePopup="closePopup"
                v-on:toggleDataset="toggleDataset">
            </DataSetsList>
        </transition>
    </div>
</template>


<script>
 import {HTTP} from '../main'
 import DataSetsList from '@/components/DataSetsList'

 export default {
  data(){
      return {
        loading:true,
        datasets:[],
        showDataSets: false,
        msg:''
      }
  },
  created(){
    this.getDataSets()
  },
    methods:{
        forceRerender(){
            this.componentKey += 1;
        },
        closePopup(){
            this.showDataSets = false
        },
        openDatasets(){
            this.closePopup()
            this.showDataSets = true
        },
        getDataSets(){
            this.msg = 'Loading dicom information...'
            HTTP.get(this.apiURL+'/datasets?result=False').then((resp)=>{
                this.datasets = resp.data.datasets
                this.datasets.forEach((dataset)=>{
                    dataset.selected=false;
                })
                this.loading=false
            })
        },
        toggleDataset(dataset){
            for (let i=0;i<this.datasets.length;i++){
                if(this.datasets[i].id==dataset.id){
                    this.datasets[i].selected=dataset.selected
                }
            }
        },
    },
    computed:{
        bgc_class: function(){
            return 'bgc'+this.test.status
        },
        c_class: function(){
            return 'c'+this.test.status
        },
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    },
  components:{
      DataSetsList,
  }
}
</script>

<style>
</style>