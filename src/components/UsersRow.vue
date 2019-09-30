<template>
  <div class="tablerow" @mouseleave="leave()" @mouseover="enter()">
    <div class="tablecell">{{user.id}}</div>
    <div v-if="!hover" class="tablecell">{{user.name}}</div>
    <div v-if="hover" class="tablecell"><input type="text" class="textbox" v-model=user.name @change="setDirty()"></div>
    <div v-if="!hover" class="tablecell">{{user.email}}</div>
    <div v-if="hover" class="tablecell"><input type="text" class="textbox" v-model=user.email @change="setDirty()"></div>
    <div v-if="!hover" class="tablecell">{{user.role}}</div>
    <div v-if="hover" class="tablecell">
      <select v-model="user.role" @change="setDirty()">
        <option value="admin">admin</option>
        <option value="rest_full">rest_full</option>
        <option value="rest_major">rest_major</option>
        <option value="rest_minor">rest_minor</option>
      </select>
    </div>
    <div v-if="!hover" class="tablecell">{{user.status}}</div>
    <div v-if="hover" class="tablecell">
      <select v-model="user.status" @change="setDirty()">
        <option value="0">0</option>
        <option value="1">1</option>
      </select>
    </div>
    <div class="tablecell">
      <button v-if="dirty" class="smbutton" @click="updateUser"><i class="far fa-save"></i> Save</button>
      <button v-if="hover" class="smbutton" @click="deleteUser"><i class="fas fa-trash-alt"></i> Remove</button>
    </div>
  </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    
  props:['user'],
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
    deleteUser(){
        HTTP.delete(this.apiURL+'/users/'+this.user.id)
        .then(res => {
          this.$emit('updateUsers','thanks')
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
    width:calc(100% / 6);
    display:flex;
    flex-direction:row;
    justify-content:space-between;
}

</style>