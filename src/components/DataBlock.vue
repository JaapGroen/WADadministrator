<template>
    <div>
        <div class="block" @click="openDatasets">
            <div class="item_title bgc0">Datasets</div>
    
            <div v-if="!loading" class="item_content">
            {{datasets.length}} datasets loaded
            </div>
    
            <div v-if="loading" class="item_content">
                <i class="fas fa-sun fa-2x fa-spin"></i>
            </div>
    
            <div class="item_footer">
                footer      
            </div>
        </div>
        <transition name="fade">
            <DatasetsList v-if="showDatasets" v-bind:datasets="datasets" :msg="msg" :key=1 
                v-on:closePopup="closePopup"
                v-on:toggleDataset="toggleDataset"
                v-on:getMoreDatasets="getMoreDatasets">
            </DatasetsList>
        </transition>
    </div>
</template>


<script>
 import {HTTP} from '../main'
 import DatasetsList from '@/components/DatasetsList'


 export default {
  data(){
      return {
        loading:true,
        datasets:[],
        showDatasets: false,
        msg:'',
        page:''
      }
  },
    created(){
        this.getFirstDatasets(1)
    },
    methods:{
        forceRerender(){
            this.componentKey += 1;
        },
        closePopup(){
            this.showDatasets = false
        },
        openDatasets(){
            this.closePopup()
            this.showDatasets = true
        },
        getFirstDatasets(){
            this.page = 1
            HTTP.get(this.apiURL+'/datasets?page=1').then((resp)=>{
                this.datasets = resp.data.datasets
                this.datasets.forEach((dataset)=>{
                    dataset.selection=false;
                })
                this.page++
                this.loading=false
            })
        },
        getMoreDatasets(){
            this.msg = 'Loading additional datasets.'
            HTTP.get(this.apiURL+'/datasets?page='+this.page).then((resp)=>{
                this.page++
                resp.data.datasets.forEach((dataset)=>{
                    dataset.selection=false;
                    this.datasets.push(dataset)
                })
                this.msg = ''
            })
        },
        toggleDataset(dataset){
            for (let i=0;i<this.datasets.length;i++){
                if(this.datasets[i].id == dataset.id){
                    dataset.selection = !dataset.selection
                    this.datasets.splice(i,1,dataset)
                }
            }
        },
        refreshDatasets(){
            this.datasets = []
            this.getFirstDatasets()
        }
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
      DatasetsList,
  }
}
</script>

<style>
</style>