<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Edit a meta file
                <i class="fas fa-times pointer" @click="openView('None','')"></i>
            </div>
            <div class="overlaycontent minheight" v-if="selector">
                <JSONEditor :json="json" ref="editor" class="jsoneditor"></JSONEditor>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="smbutton" @click="openView('listView')">
                        <i class="fas fa-list"></i>
                        Selectors
                    </button>
                </div>
                <div>
                    {{msg}}
                </div>
                <div>
                    <button class="smbutton" @click="switchView"><i class="fas fa-eye"></i> Switch view</button>
                    <button class="smbutton" @click="saveMeta"><i class="far fa-save"></i> Save</button>
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
        json:{},
        idMeta:'',
      }
  },
    methods:{
        openView(View){
            this.$emit('openView',View)
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
        HTTP.get(this.apiURL+'/selectors/'+this.selector.id).then(resp =>{
            this.idMeta = resp.data.selector.id_meta
            HTTP.get(this.apiURL+'/metas/'+this.idMeta).then(resp =>{
                this.json = resp.data.json
            })
        })
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


<style>
.minheight{
    min-height:75%;
}


</style>
