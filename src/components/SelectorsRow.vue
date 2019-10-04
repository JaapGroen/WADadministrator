<template>
  <div class="tablerow" @mouseleave="leave()" @mouseover="enter()">
    <div class="tablecell">{{selector.id}}</div>
    <div v-if="!hover" class="tablecell">{{selector.name}}</div>
    <div v-if="hover" class="tablecell"><input type="text" class="textbox" v-model=selector.name @change="setDirty()"></div>
    <div v-if="!hover" class="tablecell">{{selector.description}}</div>
    <div v-if="hover" class="tablecell"><input type="text" class="textbox" v-model=selector.description @change="setDirty()"></div>
    <div class="tablecell">
      <button v-if="selector.isactive" class="smbutton"><i class="fas fa-stop"></i> Stop</button>
      <button v-if="!selector.isactive" class="smbutton"><i class="fas fa-play"></i> Start</button>
    </div>
    <div class="tablecell">
      <button v-if="dirty" class="smbutton" @click="updateSelector"><i class="far fa-save"></i> Save</button>
      <button v-if="hover" class="smbutton"><i class="fas fa-ruler"></i> Rules</button>
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
    updateUser(){
        let formData = new FormData();
        formData.append('username',this.user.name)
        formData.append('email',this.user.email)
        formData.append('role',this.user.role)
        formData.append('status',this.user.status)
        HTTP.put(this.apiURL+'/users/'+this.user.id,formData,{
          headers: {'Content-Type':'multipart/form-data'}
        })
        .then(res => {
          this.$emit('responseMessage',res.data.msg)
          this.dirty=false
        })
    },
    deleteSelector(){
        HTTP.delete(this.apiURL+'/selectors/'+this.selector.id)
        .then(res => {
          this.$emit('updateSelectors','thanks')
        })
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