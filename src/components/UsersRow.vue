<template>
  <div class="tablerow" @mouseleave="hover=false" @mouseover="hover=true">
    <div class="id">{{user.id}}</div>
    <div v-if="!hover" class="name">{{user.name}}</div>
    <div v-if="hover" class="name"><input type="text" class="textbox" v-model=user.name @change="setDirty()"></div>
    <div v-if="!hover" class="email">{{user.email}}</div>
    <div v-if="hover" class="email"><input type="text" class="textbox" v-model=user.email @change="setDirty()"></div>
    <div v-if="!hover" class="role">{{user.role.name}}</div>
    <div v-if="hover" class="role">
      <select class="selectbox" v-model="user.role" @change="setDirty()">
        <option v-for="option in options" v-bind:value="{name:option.name,number:option.number}">{{option.name}}</option>
      </select>
    </div>
    <div v-if="!hover" class="status">{{user.status | translateStatus}}</div>
    <div v-if="hover" class="status">
      <select class="selectbox" v-model="user.status" @change="setDirty()">
        <option value="0">No</option>
        <option value="1">Yes</option>
      </select>
    </div>
    <div class="buttons">
      <button v-if="dirty" class="btn btn-small" @click="updateUser"><i class="far fa-save"></i> Save</button>
      <button v-if="hover && !dirty" class="btn btn-small" @click="deleteUser"><i class="fas fa-trash-alt"></i> Remove</button>
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
        dirty:false,
        options:[{name:'admin',number:100},{name:'rest_full',number:500},{name:'rest_major',number:600},{name:'rest_minor',number:700}]
      }
  },
    methods:{
        setDirty(){
            this.dirty=true;
        },
        updateUser(){
            let formData = new FormData();
            formData.append('username',this.user.name)
            formData.append('email',this.user.email)
            formData.append('role',this.user.role.number)
            formData.append('status',this.user.status)
            HTTP.put(this.apiURL+'/users/'+this.user.id,formData,{
              headers: {'Content-Type':'multipart/form-data'}
            })
            .then(res => {
                this.$emit('updateUsers','thanks')
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
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    },
    filters:{
        translateStatus: (status) => {
            if (status == 1){
                return 'Yes'
            } else {
                return 'No'
            }
        }
    },
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
    flex:2 1 0;
}

.email{
    padding-left:5px;
    padding-right:5px;
    flex:3 1 0;
}

.role{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.status{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:80px;
}
</style>