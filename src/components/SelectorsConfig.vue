<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Edit a config file
                <i class="fas fa-times pointer" @click="closePopup"></i>
            </div>
            <div class="overlaycontent" v-if="selector" @mouseleave="leave()" @mouseover="enter()">
                <div class="tablerow">
                    <div class="tablecell w20">
                    Description:
                    </div>
                    <div class="tablecell w80" v-if="!hover">
                    {{config.description}}
                    </div>
                    <div class="tablecell w80" v-if="hover">
                        <input type="text" class="textbox fullwidth" v-model=config.description @change="setDirty()">
                    </div>
                </div>
                <div class="tablerow">
                    <div class="tablecell w20">
                        Origin:
                    </div>
                    <div class="tablecell w80">
                        {{config.origin}}
                    </div>
                </div>
                <div class="tablerow">
                    <div class="tablecell w20">
                        Datatype:
                    </div>
                    <div class="tablecell w80" v-if="!hover">
                        {{config.data_type}}
                    </div>
                    <div class="tablecell w80" v-if="hover">
                        <select v-model="config.data_type">
                            <option>dcm_study</option>
                            <option>dcm_series</option>
                            <option>dcm_instance</option>
                            <option>dcm_patient</option>
                        </select>
                    </div>
                </div>
                <div class="tablerow">
                    <div class="tablecell w20">
                        Json file:
                        </div>
                </div>
                <JSONEditor :json="json" ref="editor" class="jsoneditor"></JSONEditor>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="smbutton" @click="openList"><i class="fas fa-list"></i> Selectors</button>
                </div>
                <div>
                    {{msg}}
                </div>
                <div>
                    <button class="smbutton" @click="switchView"><i class="fas fa-eye"></i> Switch view</button>
                    <button class="smbutton" v-if="dirty" @click="saveConfig"><i class="far fa-save"></i> Save</button>
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
  props:['selector'],
  data(){
      return {
        msg:'',
        componentKey: 0,
        apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
        json:{},
        idConfig:'',
        config:{},
        hover:false,
        dirty:false
      }
  },
    methods:{
        closePopup(){
            this.$emit('closePopup','thanks')
        },
        openList(){
            this.$emit('openList','thanks')
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
        enter(){
            this.hover=true;
        },
        leave(){
            this.hover=false;
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
                this.openList()
            })
            .catch(function(){
                console.log('error?')
            })   
        }
    },
    mounted(){
        HTTP.get(this.apiURL+'/selectors/'+this.selector.id).then(resp =>{
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


<style>
</style>
