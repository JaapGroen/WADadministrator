<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Edit meta file {{meta.id}}
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div class="overlayhead">
                <div class="config">Config</div>
            </div>
            <div class="overlaycontent big" v-if="!jsonloading">
                <div class="tablerow">
                    <div class="config">
                        <span>{{meta.id_config}}</span>
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
                    <button class="btn btn-small" @click="switchView"><i class="fas fa-eye"></i> Switch view</button>
                    <button class="btn btn-small" @click="saveMeta"><i class="far fa-save"></i> Save</button>
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
        jsonloading:true,
        json:'',
        meta:[]
      }
  },
    methods:{
        getMeta(){
            HTTP.get(this.apiURL+'/metas/'+this.$route.params.id).then((resp)=>{
                this.meta = resp.data.meta
                this.json = resp.data.meta.json
                this.jsonloading = false
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
        saveMeta(){
            const editor = this.$refs.editor.editor
            let formData = new FormData();
            formData.append('json',JSON.stringify(editor.get()));
            HTTP.put(this.apiURL+'/metas/'+this.idMeta,formData,{
                headers: {'Content-Type':'multipart/form-data'}
            }).then((resp)=>{
                this.openView('listView')
            })
            .catch(function(){
                console.log('error?')
            })   
        }
    },
    mounted(){
        this.getMeta()
    },
    components:{
        JSONEditor
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    },
}


</script>


<style scoped>
.config{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.big{
    min-height:400px;
}

.jsoneditor{
    background:#ffffff;
}
</style>
