<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Add a new selector              
                <i class="fas fa-times pointer" @click="openView('None')"></i>
            </div>
            <div class="overlaycontent" v-if="loaded">
                <div class="tablerow">
                    Name:
                    <input type="text" class="textbox" v-model=newSelector.name @change="setDirty()"/>
                </div>
                <div class="tablerow">
                    Description:
                    <input type="text" class="textbox" v-model=newSelector.description @change="setDirty()"/>
                </div>
                <div class="tablerow">
                    Config id:
                    <select class="selectbox" v-model="newSelector.id_config" @change="setDirty()">
                        <option v-for="config in configs" :value="config.id">{{config.name}} ({{config.origin}})</option>
                    </select>
                </div>
                <div class="tablerow">
                    <button v-if="showSaveButton" class="btn tbn-submit" @click="submitSelector">Save</button>
                </div>
            </div>
            <div class="overlayfooter">
                <button class="btn btn-small" @click="openView('SelectorsList')"><i class="fas fa-list"></i> Selectors</button>
                {{msg}}
            </div>
        </div>      
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    props:[''],
    data(){
        return {
            isDirty:false,
            newSelector:{name:'',description:'',id_config:''},
            configs:[],
            loaded:false,
            msg:'',
        }
    },
    created(){
        this.getConfigs()
    },
    methods:{
        openView(View){
            this.$emit('openView',View)
        },
        setDirty(){
            this.isDirty = true
        },
        submitSelector(){
            let formData = new FormData();
            formData.append('name',this.newSelector.name)
            formData.append('description',this.newSelector.description)
            formData.append('id_config',this.newSelector.id_config)
            HTTP.post(this.apiURL+'/selectors',formData,{
                headers: {'Content-Type':'multipart/form-data'}
            }).then(resp => {
                if (resp.data.success){
                    this.$emit('updateSelectors','thanks')
                    this.openView('listView')
                } else {
                    this.msg = resp.data.msg
                }
            },error =>{
                this.msg = error
            })
        },
        getConfigs(){
            HTTP.get(this.apiURL+'/configs').then(resp =>{
                this.configs = resp.data.configs
                this.loaded = true
            })
        }
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        showSaveButton(){
            if ((this.newSelector.name != '') && (this.newSelector.description != '') && (this.newSelector.id_config != '')){
                return true
            } else {
                return false
            }
        }
    },
}


</script>


<style scoped>
</style>
