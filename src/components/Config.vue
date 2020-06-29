<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Edit config file {{config.id}}
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div class="overlayhead">
                <div class="description">Description</div>
                <div class="origin">Origin</div>
                <div class="type_wide">Type</div>
            </div>
            <div v-if="!loading" class="overlaycontent big" @mouseleave="hover=false" @mouseover="hover=true">
                <div class="tablerow">
                    <div class="description">
                        <span v-if="hover"><input type="text" class="textbox fullwidth" v-model=config.description @change="setDirty"></span>
                        <span v-else>{{config.description}}</span>
                    </div>
                    <div class="origin">
                        <span>{{config.origin}}</span>
                    </div>
                    <div class="type">
                        <span v-if="hover">
                            <select class="selectbox" v-model="config.data_type.name" @change="setDirty">
                                <option>dcm_patient</option>
                                <option>dcm_study</option>
                                <option>dcm_series</option>
                                <option>dcm_instance</option>
                                
                            </select>
                        </span>
                        <span v-else>{{config.data_type.name}}</span>
                    </div>                    
                </div>
                <div class="tablerow">
                    <div class="tablecell">
                        Json file:
                    </div>
                </div>
                <JSONEditor :json="json" ref="editor" class="jsoneditor"></JSONEditor>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="$router.go(-1)"><i class="fas fa-list"></i> Back</button>
                </div>
                <div>

                </div>
                <div>
                    <button class="btn btn-small" @click="switchView"><i class="fas fa-eye"></i> Switch editor view</button>
                    <button class="btn btn-small" v-if="dirty" @click="saveConfig"><i class="far fa-save"></i> Save</button>
                </div>
            </div>
        </div>      
    </div>
  </div>
</template>

<script>
import {HTTP} from '@/main'
import JSONEditor from 'vue2-jsoneditor'

export default { 
    props:[''],
    data(){
        return {
            json:{},
            hover:false,
            dirty:false,
            loading:true,
            config:{}
        }
    },
    created(){
        this.getConfig()
    },
    methods:{
        getConfig(){
            HTTP.get(this.apiURL+'/configs/'+this.$route.params.id).then((resp)=>{
                this.config = resp.data.config
                this.json = resp.data.config.json
                this.loading = false
            })
        },
        switchView(){
            const views=['tree', 'text']
            const editor = this.$refs.editor.editor
            if (editor.getMode()=='tree'){
                editor.setMode('text')
            } else {
                editor.setMode('tree')
            }
        },
        setDirty(){
            this.dirty = true;
        },
        saveConfig(){
            const editor = this.$refs.editor.editor
            let formData = new FormData();
            formData.append('json',JSON.stringify(editor.get()));
            formData.append('description',this.config.description);
            if (this.config.data_type.name=='dcm_series'){
                formData.append('data_type',1);
            } else if (this.config.data_type.name=='dcm_study'){
                formData.append('data_type',2);
            } else if (this.config.data_type.name=='dcm_instance'){
                formData.append('data_type',3);
            } else if (this.config.data_type.name=='dcm_patient'){
                formData.append('data_type',4);
            }
            HTTP.put(this.apiURL+'/configs/'+this.config.id,formData,{
                headers: {'Content-Type':'multipart/form-data'}
            }).then((resp)=>{
                this.openView('ConfigsList')
            })
            .catch(function(){
                console.log('error?')
            })   
        }
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    },
    mounted(){
    },
    components:{
        JSONEditor
    }
}


</script>


<style scoped>
.description{
    padding-left:5px;
    padding-right:5px;
    flex:2 0 0;
}

.origin{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;    
}

.type{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;    
}

.type_wide{
    padding-left:5px;
    padding-right:20px;
    flex:1 0 0;    
}

.big{
    min-height:400px;
}

.jsoneditor{
    background:#ffffff;
}
</style>
