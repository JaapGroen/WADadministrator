<template>
  <div class="pageoverlay">
    <div class="overlaybox">
      <div class="overlaytop">
        Users
        <i class="fas fa-times pointer" @click="closeView"></i>
      </div>
      <div class="tablehead">
        <div class="tableheader">Id</div>
        <div class="tableheader">Name</div>
        <div class="tableheader">Email</div>
        <div class="tableheader">Role</div>
        <div class="tableheader">Status</div>
        <div class="tableheader"></div>
      </div>
      <div class="overlaycontent">
        <UsersRow v-for="user in users" v-bind:user="user" :key="user.id" v-on:responseMessage="responseMessage" v-on:updateUsers="updateUsers"></UsersRow>
      </div>
      <div class="overlayfooter">
        <div>
          <button class="smbutton" @click="addUser"><i class="fas fa-plus-square"></i> Add user</button>
        </div>
        {{msg}}
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersRow from '@/components/UsersRow'
import {HTTP} from '@/main'

export default {
  props:['users'],
  data(){
      return {
        msg:'',
        componentKey: 0,
      }
  },
  methods:{
    closeView(){
      this.$emit('closeView','thanks')
    },
    forceRerender(){
      this.componentKey += 1;
    },
    responseMessage(msg){
        this.msg=msg
    },
    addUser(){
        let formData = new FormData();
        formData.append('username','new')
        formData.append('email','new')
        formData.append('password','test')
        formData.append('role','rest_minor')
        formData.append('status',0)
        HTTP.post(this.apiURL+'/users',formData,{
          headers: {'Content-Type':'multipart/form-data'}
        })
        .then(res => {
          console.log(res.data)  
          this.msg='please update the new user.'
          this.$emit('updateUsers','thanks')
        })
    },
    updateUsers(){
        this.$emit('updateUsers','thanks')
    }
  },
  components:{
      UsersRow
  },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    },
}

</script>

<style>
.overlaybox{
  display:flex;
  flex-direction:column;
  height:70%;
  width:70%;
  box-sizing: border-box;
  align-items:center;
  justify-content:center;
}

.tablehead{
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:space-between;
  background:#444444;
}

.tableheader{
  padding-left:10px;
  width:calc(100% / 6);
}

.textbox{
  border:none;
  background-color:#444444;
  width:100%;
  height:30px;
  border-bottom:3px solid #0FAAEA;
  color:white;
  font-family: 'Roboto', sans-serif;
  border-radius: 5px;
}
</style>