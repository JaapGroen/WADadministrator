<template>
    <div>
        <div class="block" @click="openView('listView')">
            <div class="item_title bgc0">Datasets</div>
    
            <div class="item_content">
                Datasets in the database 
            </div>
    
            <div class="item_footer" v-if="loading" >
                Loading datasets...
            </div>
    
            <div class="item_footer" v-if="!loading" >
                Currently {{datasets.length}} datasets loaded 
            </div>
        </div>
        <transition name="fade">
            <DatasetsList v-if="show.listView" v-bind:datasets="datasets" :msg="msg" :key=1 
                v-on:openView="openView"
                v-on:toggleDataset="toggleDataset"
                v-on:getMoreDatasets="getMoreDatasets">
            </DatasetsList>
            <NotesView v-if="show.notesView" v-bind:dataset="payload" :key="payload.id"
                v-on:openView="openView">
            </NotesView>
            <ResultsView v-if="show.resultsView" v-bind:dataset="payload" :key="payload.id"
                v-on:openView="openView">
            </ResultsView>
        </transition>
    </div>
</template>


<script>
 import {HTTP} from '../main'
 import DatasetsList from '@/components/DatasetsList'
 import NotesView from '@/components/NotesView'
 import ResultsView from '@/components/ResultsView'


 export default {
  data(){
      return {
        loading:true,
        datasets:[],
        show:{listView:false,notesView:false,resultsView:false},
        msg:'',
        page:'',
        payload:''
      }
  },
    created(){
        this.getFirstDatasets(1)
    },
    methods:{
        openView(View,payload){
            this.payload = payload
            Object.keys(this.show).forEach((view)=>{
                if (view == View){
                    this.show[view] = true
                } else {
                    this.show[view] = false
                }
            })
        },
        getFirstDatasets(){
            var empty_tags = {}
            empty_tags['0008,1010']={Value:''}
            empty_tags['0010,0010']={Value:''}
            empty_tags['0008,1030']={Value:''}
            empty_tags['0008,103e']={Value:''}
            empty_tags['0008,0020']={Value:''}
            
            this.page = 1
            HTTP.get(this.apiURL+'/datasets?page=1').then((resp)=>{
                this.datasets = resp.data.datasets
                this.datasets.forEach((dataset)=>{
                    this.$set(dataset, 'selected', false)
                    HTTP.get(this.apiURL+'/datasets/'+dataset.id+'/tags').then(resp=>{
                        this.$set(dataset, 'tags', resp.data.tags)
                    }).catch(function(error){
                        console.log('error?')
                        console.log(error)
                    }) 
                })
                this.page++
                this.loading=false
            })
        },
        getMoreDatasets(){
            var empty_tags = {}
            empty_tags['0008,1010']={Value:'?'}
            empty_tags['0010,0010']={Value:'?'}
            empty_tags['0008,1030']={Value:'?'}
            empty_tags['0008,103e']={Value:'?'}
            empty_tags['0008,0020']={Value:'?'}

            HTTP.get(this.apiURL+'/datasets?page='+this.page).then((resp)=>{
                if (resp.data.datasets.length>0){
                    this.page++
                    resp.data.datasets.forEach((dataset)=>{
                        this.$set(dataset, 'selected', false)
                        HTTP.get(this.apiURL+'/datasets/'+dataset.id+'/tags').then(resp=>{
                            if (resp.data.success){
                                this.$set(dataset, 'tags', resp.data.tags)
                            } else {
                                this.$set(dataset, 'tags', empty_tags)
                            }
                            this.datasets.push(dataset)
                        })
                    })
                }
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
      NotesView,
      ResultsView
  }
}
</script>

<style scoped>

</style>