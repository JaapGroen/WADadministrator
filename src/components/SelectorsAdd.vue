<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Add a new selector              
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div class="overlaycontent" v-if="loaded">
                <div class="tablerow">
                    <div class="parameter">Name</div>
                    <div class="value">
                        <input type="text" class="textbox" v-model=newSelector.name @change="setDirty()"/>
                    </div>
                </div>
                <div class="tablerow">
                    <div class="parameter">Description</div>
                    <div class="value">
                        <input type="text" class="textbox" v-model=newSelector.description @change="setDirty()"/>
                    </div>
                </div>
                <div class="tablerow">
                    <div class="parameter">Config id</div>
                    <div class="value">
                        <select class="selectbox" v-model="newSelector.id_config" @change="setDirty()">
                            <option v-for="config in configs" :value="config.id">{{config.name}} ({{config.origin}})</option>
                        </select>
                    </div>
                </div>
                <div class="tablerow submit">
                    <button v-if="showSaveButton" class="btn btn-submit" @click="submitSelector">Save</button>
                </div>
            </div>
            <div class="overlayfooter">
                <router-link to="/selectors" class="btn btn-small" tag="button"><i class="fas fa-list"></i> Selectors</router-link>
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
.parameter{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.value{
    padding-left:5px;
    padding-right:5px;
    flex:2 1 0;
}

.submit{
    display:flex;
    justify-content:center;
    padding-top:10px;
    padding-bottom:10px;
}
</style>
