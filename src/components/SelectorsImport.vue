<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Import zipped selector(s)
                <i class="fas fa-times pointer" @click="openView('Nothing')"></i>
            </div>
            <div class="overlaycontent" id="file-drag-drop">
                <form ref="fileform" class="uploadform">
                    <span class="drop-files" v-if="files.length==0">Drop the zipfile here!</span>
                    <span class="drop-files" v-if="files.length>0">
                        {{files[0].name}}
                    </span>
                </form>
                <button class="button" @click="submitFiles()" v-show="files.length > 0">
                    <i class="fas fa-paper-plane"></i>
                    Upload file
                </button>
            </div>
            <div class="overlayfooter">
                <button class="smbutton" @click="openView('listView')"><i class="fas fa-list"></i> Selectors</button>
                {{msg}}
            </div>
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
        files:[]
      }
  },
    methods:{
        closePopup(){
            this.$emit('closePopup','thanks')
        },
        openView(View){
            this.$emit('openView',View)
        },
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
            HTTP.post(this.apiURL+'/selectors',formData,{
                headers: {'Content-Type':'multipart/form-data'}
            }).then((resp)=>{
                this.$emit('updateSelectors','thanks')
                this.openView('listView')
            })
            .catch(function(){
                console.log('error?')
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


<style>
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


</style>
