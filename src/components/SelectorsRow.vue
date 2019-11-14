<template>
    <div class="tablerow" @mouseleave="leave()" @mouseover="enter()">
        <div class="tablecell w5">
            <input type="checkbox" v-model="selector.selected" @change="toggleSelector">
        </div>
        <div class="tablecell w5">{{selector.id}}</div>
        <div v-if="!hover" class="tablecell w20">{{selector.name}}</div>
        <div v-if="hover" class="tablecell w20"><input type="text" class="textbox" v-model=selector.name @change="setDirty()"></div>
        <div v-if="!hover" class="tablecell w30">{{selector.description}}</div>
        <div v-if="hover" class="tablecell w30"><input type="text" class="textbox" v-model=selector.description @change="setDirty()"></div>
        <div class="tablecell w10">
            <button v-if="selector.isactive" class="smbutton" @click="stopSelector"><i class="fas fa-stop"></i> Stop</button>
            <button v-if="!selector.isactive" class="smbutton" @click="startSelector"><i class="fas fa-play"></i> Start</button>
        </div>
        <div class="tablecell w30">
            <button v-if="dirty" class="smbutton" @click="updateSelector"><i class="far fa-save"></i> Save</button>
            <button v-if="hover" class="smbutton"><i class="fas fa-ruler"></i> Rules</button>
            <button v-if="hover" class="smbutton" @click="openMeta"><i class="fas fa-tags"></i> Meta</button>
            <button v-if="hover" class="smbutton" @click="openConfig"><i class="fas fa-cogs"></i> Config</button>
            <button v-if="hover" class="smbutton" @click="deleteSelector"><i class="fas fa-trash-alt"></i> Remove</button>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    
  props:['selector'],
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
    stopSelector(){
        this.selector.isactive = false;
        let formData = new FormData();
        formData.append('isactive',false)
        HTTP.put(this.apiURL+'/selectors/'+this.selector.id,formData,{
          headers: {'Content-Type':'multipart/form-data'}
        })
        .then(res => {            
          this.$emit('responseMessage',res.data.msg)
          this.dirty=false
        })
    },
    startSelector(){
        this.selector.isactive = true;
        let formData = new FormData();
        formData.append('isactive',true)
        HTTP.put(this.apiURL+'/selectors/'+this.selector.id,formData,{
          headers: {'Content-Type':'multipart/form-data'}
        })
        .then(res => {           
          this.$emit('responseMessage',res.data.msg)
          this.dirty=false
        })
    },
    updateSelector(){
        let formData = new FormData();
        formData.append('name',this.selector.name)
        formData.append('description',this.selector.description)
        HTTP.put(this.apiURL+'/selectors/'+this.selector.id,formData,{
          headers: {'Content-Type':'multipart/form-data'}
        })
        .then(res => {
          this.$emit('responseMessage',res.data.msg)
          this.dirty=false
        },error =>{
            console.log(error)
        })
    },
    deleteSelector(){
        HTTP.delete(this.apiURL+'/selectors/'+this.selector.id)
        .then(res => {
            this.$emit('responseMessage',res.data.msg)
            this.$emit('updateSelectors','thanks')
        })
    },
    toggleSelector(){
        this.$emit('toggleSelector',this.selector)
    },
    openMeta(){
        this.$emit('openMeta',this.selector)
    },
    openConfig(){
        this.$emit('openConfig',this.selector)
    }
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
  min-height:40px;
  align-items:center;
}

.tablerow:nth-child(even){
    background-color: #0C0C0C;
}

.tablerow:nth-child(odd){
    background:#2F2F2F;
}

.tablecell_s{
    padding-left:10px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
}



</style>