<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Edit a config file
                <i class="fas fa-times pointer" @click="closeView"></i>
            </div>
            <div class="overlaycontent" v-if="selector" @mouseleave="leave()" @mouseover="enter()">
                <div class="tablerow">
                    <div class="tablecell">
                    Description:
                    </div>
                    <div class="tablecell" v-if="!hover">
                    {{config.description}}
                    </div>
                    <div class="tablecell" v-if="hover">
                        <input type="text" class="textbox fullwidth" v-model=config.description @change="setDirty()">
                    </div>
                </div>
                <div class="tablerow">
                    <div class="tablecell">
                        Origin:
                    </div>
                    <div class="tablecell">
                        {{config.origin}}
                    </div>
                </div>
                <div class="tablerow">
                    <div class="tablecell">
                        Datatype:
                    </div>
                    <div class="tablecell" v-if="!hover">
                        {{config.data_type}}
                    </div>
                    <div class="tablecell" v-if="hover">
                        <select v-model="config.data_type">
                            <option>dcm_study</option>
                            <option>dcm_series</option>
                            <option>dcm_instance</option>
                            <option>dcm_patient</option>
                        </select>
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
                    <button class="btn btn-small" @click="openView('listView')">
                        <i class="fas fa-list"></i>
                        Selectors
                    </button>
                </div>
                <div>
                    {{msg}}
                </div>
                <div>
                    <button class="btn btn-small" @click="switchView"><i class="fas fa-eye"></i> Switch view</button>
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
  props:['input'],
  data(){
      return {
        msg:'',
        json:{},
        idConfig:'',
        config:{},
        hover:false,
        dirty:false
      }
  },
    methods:{
        openView(payload){
            this.$emit('openView',payload)
        },
        closeView(){
            this.$emit('openView',{target:'close'})
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
            this.dirty=true;
        },
        saveConfig(){
            const editor = this.$refs.editor.editor
            let formData = new FormData();
            formData.append('json',JSON.stringify(editor.get()));
            formData.append('description',this.config.description);
            if (this.config.data_type=='dcm_series'){
                formData.append('data_type',1);
            } else if (this.config.data_type=='dcm_study'){
                formData.append('data_type',2);
            } else if (this.config.data_type=='dcm_instance'){
                formData.append('data_type',3);
            } else if (this.config.data_type=='dcm_patient'){
                formData.append('data_type',4);
            }
            HTTP.put(this.apiURL+'/configs/'+this.idConfig,formData,{
                headers: {'Content-Type':'multipart/form-data'}
            }).then((resp)=>{
                this.openView('listView')
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
        HTTP.get(this.apiURL+'/selectors/'+this.input.data).then(resp =>{
            this.idConfig = resp.data.selector.id_config
            HTTP.get(this.apiURL+'/configs/'+this.idConfig).then(resp =>{
                this.config = resp.data
                this.json = resp.data.json
                this.data_type = resp.data.data_type
            })
        })
    },
    components:{
        JSONEditor
    }
}


</script>


<style scoped>
</style>
