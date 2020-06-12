<template>
  <div class="tablerow" @mouseleave="leave()" @mouseover="enter()">
    <div class="id">{{module.id}}</div>
    <div class="name">
        <input v-if="hover" type="text" class="textbox" v-model=module.name @change="setDirty()">
        <span v-else>{{module.name}}</span>
    </div>
    <div class="description">
        <input v-if="hover" type="text" class="textbox" v-model=module.description @change="setDirty()">
        <span v-else>{{module.description}}</span>
    </div>
    <div class="origin">{{module.origin}}</div>
    <div class="version">{{module.repo_version}}</div>
    
    <div class="buttons">
        <button v-if="hover" class="btn btn-small" @click="deleteModule"><i class="fas fa-trash-alt"></i> Remove</button>
    </div>
  </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    
  props:['module'],
  data(){
      return {
        hover:false,
        dirty:false
      }
  },
  methods:{
    enter(){
        this.hover=true;
    },
    leave(){
        this.hover=false;
    },
    setDirty(){
        this.dirty=true;
    },
    updateModule(){
        
    },
    deleteModule(){
        HTTP.delete(this.apiURL+'/modules/'+this.module.id).then((resp)=>{
            console.log(resp.data)
            this.$emit('updateModules',resp.data.msg)
        })
    },
  },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    }
}

</script>

<style scoped>
.id{
    display:flex;
    flex-direction:row;
    align-items:center;
    flex:0 1 0;
    min-width:50px;
    padding-left:5px;
    padding-right:5px;
}

.name{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.description{
    padding-left:5px;
    padding-right:5px;
    flex:2 0 0;
}

.origin{
    padding-left:5px;
    padding-right:5px;
    width:80px;
}

.version{
    padding-left:5px;
    padding-right:5px;
    width:80px;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:80px;
}
</style>