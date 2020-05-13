<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Current selectors
                <i class="fas fa-times pointer" @click="openView('Nothing')"></i>
            </div>
            <div class="tablehead">
                <div class="tableheader">Id</div>
                <div class="tableheader">Name</div>
                <div class="tableheader">Description</div>
                <div class="tableheader">Status</div>
                <div class="tableheader"></div>
            </div>
            <div class="overlaycontent">
                <SelectorsRow v-for="selector in orderedSelectors" v-bind:selector="selector" :key="selector.id" 
                    v-on:updateSelectors="updateSelectors" 
                    v-on:toggleSelector="toggleSelector"
                    v-on:openView="openView">
                </SelectorsRow>
                
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="smbutton" @click="openView('importView')"><i class="fas fa-plus-square"></i> Import selector</button>
                    <button class="smbutton" @click="openView('addView')"><i class="fas fa-plus-square"></i> Add selector</button>
                </div>
                {{msg}}
                <div v-if="selectedSelectors.length>0">
                    With selected:
                    <button class="smbutton" @click="exportSelected" v-if="selectedSelectors.length>0"><i class="fas fa-download"></i> Export</button>
                    <button class="smbutton" @click="startSelected" v-if="selectedSelectors.length>0"><i class="fas fa-play"></i> Start</button>
                    <button class="smbutton" @click="stopSelected" v-if="selectedSelectors.length>0"><i class="fas fa-stop"></i> Stop</button>
                    <button class="smbutton" @click="deleteSelected"><i class="fas fa-trash-alt"></i> Remove</button>
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
    props:['selectors'],
    data(){
        return {
            msg:'',
            componentKey: 0,
        }
    },
    methods:{
        openView(View,selector){
            this.$emit('openView',View,selector)
        },
        updateSelectors(){
            this.$emit('updateSelectors','thanks')
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
    }
}


</script>


<style>
</style>
