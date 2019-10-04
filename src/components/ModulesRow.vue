<template>
  <div class="tablerow" @mouseleave="leave()" @mouseover="enter()">
    <div class="tablecell">{{module.id}}</div>
    <div v-if="!hover" class="tablecell">{{module.name}}</div>
    <div v-if="hover" class="tablecell"><input type="text" class="textbox" v-model=module.name @change="setDirty()"></div>
    <div v-if="!hover" class="tablecell">{{module.description}}</div>
    <div v-if="hover" class="tablecell"><input type="text" class="textbox" v-model=module.description @change="setDirty()"></div>    

    <div class="tablecell">
      <button v-if="dirty" class="smbutton" @click="updateModule"><i class="far fa-save"></i> Save</button>
      <button v-if="hover" class="smbutton" @click="deleteModule"><i class="fas fa-trash-alt"></i> Remove</button>
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
        apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
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

</style>