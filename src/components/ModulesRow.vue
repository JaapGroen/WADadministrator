<template>
  <div class="tablerow" @mouseleave="leave()" @mouseover="enter()">
    <div class="tablecell shrink">{{module.id}}</div>
    <div class="tablecell grow2">
        <input v-if="hover" type="text" class="textbox" v-model=module.name @change="setDirty()">
        <span v-else>{{module.name}}</span>
    </div>
    <div class="tablecell grow3">
        <input v-if="hover" type="text" class="textbox" v-model=module.description @change="setDirty()">
        <span v-else>{{module.description}}</span>
    </div>
    <div class="tablecell grow">{{module.origin}}</div>
    <div class="tablecell grow">{{module.repo_version}}</div>
    
    <div v-if="dirty" class="tablecell static">
        <button  class="smbutton" @click="updateModule"><i class="far fa-save"></i> Save changes</button>
    </div>
    <div v-else class="tablecell static">
        <button class="smbutton" @click="deleteModule"><i class="fas fa-trash-alt"></i> Remove</button>
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

<style>
.tablerow{
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:space-between;
  padding:5px;
  min-height:30px;
  align-items:center;
}

.tablerow:nth-child(even){
    background-color: #0C0C0C;
}

.tablerow:nth-child(odd){
    background:#2F2F2F;
}

.tablecell{
    padding-left:10px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
}

.tablecell{
    margin-top:5px;
}

.tablecell.grow{
    flex:1 1 0;
}

.tablecell.grow2{
    flex:2 0 0;
}

.tablecell.grow3{
    flex:3 0 0;
}

.tablecell.shrink{
    flex:0 1 0;
}
</style>
<style scoped>
.tablecell.static{
    width:70px;
}

</style>