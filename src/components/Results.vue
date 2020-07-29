<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                {{results.length}} results loaded 
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div class="overlayhead">
                <div class="id">Id</div>
                <div class="created">created</div>
                <div class="selector">
                    <input type="text" class="filterbox" v-model="filter.selector" placeholder="Selector"/>
                </div>
                <div class="type">
                    <input type="text" class="filterbox" v-model="filter.type" placeholder="Type"/>
                </div>
                <div class="notes">notes</div>
                <div class="buttons"></div>
            </div>
            <div class="overlaycontent" id="content" v-on:scroll.passive="onScroll">
                <ResultsRow v-for="result in orderedItems" v-bind:result="result" :key="result.id" 
                    v-on:getFirstResults="getFirstResults">
                </ResultsRow>
            </div>
            <div class="overlayfooter">
                <div>
                    <router-link to="/processes" class="btn btn-small" tag="button"><i class="fas fa-list"></i> Processes</router-link>
                </div>
                <div>
                    <span v-if="selectedResults.length>0">
                        With selected:
                        <button class="btn btn-small" @click="resendSelected"> <i class="far fa-paper-plane"></i> Resend</button>
                        <button class="btn btn-small" @click="deleteSelected"> <i class="fas fa-trash"></i> Delete</button>
                    </span>
                    <button class="btn btn-small" @click="getFirstResults"><i class="fas fa-sync"></i> Reload</button>
                </div>
            </div>
        </div>      
    </div>
</template>

<script>
import ResultsRow from '@/components/ResultsRow'
import _ from 'lodash'
import {HTTP} from '@/main'

export default {
    props:[''],
    data(){
        return {
            results:[],
            filter:{selector:'',type:''},
            page:1
        }
    },
    mounted(){
        this.getFirstResults()
    },
    methods:{
        getFirstResults(){
            this.page = 1
            this.results=[]
            HTTP.get(this.apiURL+'/results?page=1').then(resp =>{
                resp.data.results.forEach((result)=>{
                    this.$set(result, 'selected', false)
                    this.results.push(result)
                })
                this.page++;
            })
        },
        getMoreResults(){
            HTTP.get(this.apiURL+'/results?page='+this.page).then(resp =>{
                resp.data.results.forEach((result)=>{
                    this.$set(result, 'selected', false)
                    this.results.push(result)
                })
                this.page++;
            })
        },
        onScroll(){
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(()=>{
                var div = document.getElementById("content");
                if (div.scrollHeight-(div.scrollTop+div.clientHeight)<20){
                    this.getMoreResults()
                }
            },150);
        },
        setSelectedResults(){
            this.selectedResults = _.filter(this.results, {selected:true})
        }, 
        resendSelected(){
            var promises = [];
            this.selectedResults.forEach((result)=>{
                promises.push(
                    HTTP.put(this.apiURL+'/results/'+result.id).then(resp =>{
                    })
                )
            })
            Promise.all(promises).then(()=>{
                this.getFirstResults()
            })
        },
        deleteSelected(){
            var promises = [];
            this.selectedResults.forEach((result)=>{
                promises.push(
                    HTTP.delete(this.apiURL+'/results/'+result.id).then(resp =>{
                    })
                )
            })
            Promise.all(promises).then(()=>{
                this.getFirstResults()
            })
        }
    },
  components:{
      ResultsRow,
  },
    computed:{
        filteredItems(){
            return this.results.filter((item)=>{
                return item.selector.name.toLowerCase().includes(this.filter.selector.toLowerCase()) &&
                item.data_set.data_type.name.toLowerCase().includes(this.filter.type.toLowerCase())
            })
        },       
        orderedItems(){
            return _.orderBy(this.filteredItems, 'id','desc')
        },
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        selectedResults(){
            return _.filter(this.results, {selected:true})
        },
        
    }
}


</script>


<style scoped>
.id{
    display:flex;
    flex-direction:row;
    align-items:center;
    flex:0 1 0;
    min-width:70px;
    padding-left:5px;
    padding-right:5px;
}

.created{
    padding-left:5px;
    padding-right:5px;
    flex:2 0 0;
}

.selector{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.type{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.notes{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.buttons{
    padding-left:5px;
    padding-right:20px;
    width:120px;
}
</style>
