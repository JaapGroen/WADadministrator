<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Import zipped selector(s)
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div class="overlaycontent" id="file-drag-drop">
                <form ref="fileform" class="uploadform">
                    <span class="drop-files" v-if="files.length==0">Drop the zipfile here!</span>
                    <span class="drop-files" v-if="files.length>0">
                        {{files[0].name}}
                    </span>
                </form>
                <div class="tablerow">
                    <div class="skip">
                        Skip selectors
                    </div>
                    <div class="select">
                        <select class="selectbox" v-model="skip.selectors">
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                </div>
                <div class="tablerow">
                    <div class="skip">
                        Skip configs
                    </div>
                    <div class="select">
                        <select class="selectbox" v-model="skip.configs">
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                </div>
                <div class="tablerow">
                    <div class="skip">
                        Skip modules
                    </div>
                    <div class="select">
                        <select class="selectbox" v-model="skip.modules">
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                </div>
                <div class="tablerow submit">
                    <button class="btn btn-submit" @click="submitFiles()" v-show="files.length>0">
                        <i class="fas fa-paper-plane"></i>
                        Submit
                    </button>
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
  props:['selectors'],
  data(){
      return {
        msg:'',
        componentKey: 0,
        dragAndDropCapable: false,
        files:[],
        skip:{modules:1,configs:1,selectors:1}
      }
  },
    methods:{
        determineDragAndDropCapable(){
            var div = document.createElement('div');
            return (('draggable' in div) 
                    || ('ondragstart' in div && 'ondrop' in div))
                    && 'FormData' in window
                    && 'FileReader' in window;
        },
        submitFiles(){
            let formData = new FormData();
            formData.append('zipfile', this.files[0]);
            formData.append('skip_modules', this.skip.modules);
            formData.append('skip_configs', this.skip.configs);
            formData.append('skip_selectors', this.skip.selectors);
            HTTP.post(this.apiURL+'/selectors/import',formData,{
                headers: {'Content-Type':'multipart/form-data'}
            }).then(()=>{
                this.$router.push('/selectors')
            })
            .catch(function(error){
                console.log(error)
            })   
        }
    },
    mounted(){
        this.dragAndDropCapable = this.determineDragAndDropCapable();
        if( this.dragAndDropCapable ){
            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
                this.$refs.fileform.addEventListener(evt, function(e){
                    e.preventDefault();
                    e.stopPropagation();
                }.bind(this), false);
            }.bind(this));
            this.$refs.fileform.addEventListener('drop', function(e){
                this.files=[]
                this.files.push(e.dataTransfer.files[0]);
            }.bind(this));
        }
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    },
}


</script>


<style scoped>
.uploadform{
  min-height: 100px;
  width: 100%;
  background: #2F2F2F;
  border-style: dashed;
  margin: 25px;
  border-radius: 5px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  
}

.skip{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.select{
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
