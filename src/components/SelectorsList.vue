<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Current selectors
                <i class="fas fa-times pointer" @click="openView('None')"></i>
            </div>
            <div class="overlayhead">
                <div class="id">Id</div>
                <div class="name">
                    <input type="text" class="filterbox" v-model="filter.name" placeholder="Name"/>
                </div>
                <div class="description">
                    <input type="text" class="filterbox" v-model="filter.description" placeholder="Description"/>
                </div>
                <div class="buttons"></div>
            </div>
            <div class="overlaycontent">
                <SelectorsRow v-for="selector in filteredSelectors" v-bind:selector="selector" :key="selector.id" 
                    v-on:updateSelectors="updateSelectors" 
                    v-on:openView="openView">
                </SelectorsRow>   
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="openView('SelectorsImport')"><i class="fas fa-plus-square"></i> Import selector</button>
                    
                </div>
                
                <div>
                    <span v-if="selectedSelectors.length>0">
                        With selected:
                        <button class="btn btn-small" @click="exportSelected" v-if="selectedSelectors.length>0"><i class="fas fa-download"></i> Export</button>
                        <button class="btn btn-small" @click="startSelected" v-if="selectedSelectors.length>0"><i class="fas fa-play"></i> Start</button>
                        <button class="btn btn-small" @click="stopSelected" v-if="selectedSelectors.length>0"><i class="fas fa-stop"></i> Stop</button>
                        <button class="btn btn-small" @click="deleteSelected"><i class="fas fa-trash-alt"></i> Remove</button>
                    </span>
                <button class="btn btn-small" @click="openView('SelectorsAdd')"><i class="fas fa-plus-square"></i> Add selector</button>
                </div>
            </div>
        </div>      
    </div>
</template>

<script>
import SelectorsRow from '@/components/SelectorsRow'
import _ from 'lodash'
import {HTTP} from '@/main'

export default {
    props:[],
    data(){
        return {
            msg:'',
            componentKey: 0,
            filter:{name:'',description:''},
            selectors:[]
        }
    },
    mounted(){
        this.updateSelectors()
    },
    methods:{
        openView(View,selector){
            this.$emit('openView',View,selector)
        },
        updateSelectors(){
            HTTP.get(this.apiURL+'/selectors').then(resp =>{
                this.selectors=resp.data.selectors
                this.selectors.forEach((selector)=>{
                    this.$set(selector, 'selected', false)
                })
                this.loading=false
            })
        },
        toggleSelector(selector){
            this.$emit('toggleSelector',selector)
        },
        exportSelected(){
            this.selectedSelectors.forEach((selector)=>{
                HTTP.get(this.apiURL+'/selectors/'+selector.id+'?download=true').then(res =>{
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'selector_'+selector.id+'.zip');
                    document.body.appendChild(link);
                    link.click();

                })
            })
        },
        startSelected(){
            this.selectedSelectors.forEach((selector)=>{
                let formData = new FormData();
                formData.append('isactive',true)
                HTTP.put(this.apiURL+'/selectors/'+selector.id,formData,{
                    headers: {'Content-Type':'multipart/form-data'}
                })
                .then(resp => {
                    if (!resp.data.success){
                        this.msg = resp.data.msg
                    } else {
                        selector.isactive = true
                        this.$emit('toggleSelector',selector)
                        this.$emit('updateSelectors','thanks')
                    }
                    
                })
            })
        },
        stopSelected(){
            this.selectedSelectors.forEach((selector)=>{
                let formData = new FormData();
                formData.append('isactive',false)
                HTTP.put(this.apiURL+'/selectors/'+selector.id,formData,{
                    headers: {'Content-Type':'multipart/form-data'}
                })
                .then(resp => {
                    if (!resp.data.success){
                        this.msg = resp.data.msg
                    } else {
                        selector.isactive = false
                        this.$emit('toggleSelector',selector)
                        this.$emit('updateSelectors','thanks')
                    }
                    
                })
            })
        },
        deleteSelected(){
            var r = confirm("Do you really want to delete these "+this.selectedSelectors.length+" selector(s)?\nThis can not be undone!")
            if (r == true){
                this.selectedSelectors.forEach((selector)=>{
                    HTTP.delete(this.apiURL+'/selectors/'+selector.id)
                    .then(resp => {
                        this.$emit('updateSelectors','thanks')
                    })
                })
            }
        },
    },
  components:{
      SelectorsRow,
  },
    computed:{
        orderedSelectors: function(){
            return _.orderBy(this.selectors, 'id')
        },
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        selectedSelectors(){
            return _.filter(this.selectors, {selected:true})
        },
        filteredSelectors(){
            return this.orderedSelectors.filter((selector)=>{
                return selector.description.toLowerCase().includes(this.filter.description.toLowerCase()) &&
                selector.name.toLowerCase().includes(this.filter.name.toLowerCase())
            })
        }
    }
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

.name{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.description{
    padding-left:5px;
    padding-right:5px;
    flex:2 0 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:190px;
}
</style>
