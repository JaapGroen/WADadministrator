<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Current selectors
                
                <span v-for="selector in selectors">
                    <span v-if="selector.selected">{{selector.name}}</span>
                </span>
                
                <i class="fas fa-times pointer" @click="closePopup"></i>
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
                    v-on:responseMessage="responseMessage"
                    v-on:toggleSelector="toggleSelector"
                    v-on:openMeta="openMeta"
                    v-on:openConfig="openConfig">
                </SelectorsRow>
                
            </div>
            <div class="overlayfooter">
                <button class="smbutton" @click="openImport"><i class="fas fa-plus-square"></i> Import selector</button>
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
            apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
            selectedSelectors:[]
        }
    },
    mounted(){
        this.setSelectedSelectors()
    },
    methods:{
        responseMessage(msg){
            this.msg=msg;
        },
        closePopup(){
            this.$emit('closePopup','thanks')
        },
        openImport(){
            this.$emit('openImport','thanks')
        },
        updateSelectors(){
            this.$emit('updateSelectors','thanks')
        },
        toggleSelector(selector){
            this.$emit('toggleSelector',selector)
            this.setSelectedSelectors()
        },
        setSelectedSelectors(){
            this.selectedSelectors = _.filter(this.selectors, {selected:true})
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
                selector.isactive = true;
                let formData = new FormData();
                formData.append('isactive',true)
                HTTP.put(this.apiURL+'/selectors/'+selector.id,formData,{
                    headers: {'Content-Type':'multipart/form-data'}
                })
                .then(resp => {
                    if (!resp.data.success){
                        this.$emit('responseMessage',resp.data.msg)
                    }
                    this.$emit('updateSelectors','thanks')
                })
            })
        },
        stopSelected(){
            this.selectedSelectors.forEach((selector)=>{
                selector.isactive = false;
                let formData = new FormData();
                formData.append('isactive',false)
                HTTP.put(this.apiURL+'/selectors/'+selector.id,formData,{
                    headers: {'Content-Type':'multipart/form-data'}
                })
                .then(resp => {
                    if (!resp.data.success){
                        this.$emit('responseMessage',resp.data.msg)
                    }
                    this.$emit('updateSelectors','thanks')
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
        openMeta(selector){
            this.$emit('openMeta',selector)
        },
        openConfig(selector){
            this.$emit('openConfig',selector)
        }
        
    },
  components:{
      SelectorsRow,
  },
    computed:{
        orderedSelectors: function(){
            return _.orderBy(this.selectors, 'id')
        },
    }
}


</script>


<style>
</style>
