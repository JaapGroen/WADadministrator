<template>
  <div class="pageoverlay">
    <div class="overlaybox">
      <div class="overlaytop">
        Users
        <i class="fas fa-times pointer" @click="openView('Nothing')"></i>
      </div>
      <div class="overlayhead">
        <div class="id">Id</div>
        <div class="name">Name</div>
        <div class="email">Email</div>
        <div class="role">Role</div>
        <div class="status">Active</div>
        <div class="buttons"></div>
      </div>
      <div class="overlaycontent">
        <UsersRow v-for="user in users" v-bind:user="user" :key="user.id" v-on:responseMessage="responseMessage" v-on:updateUsers="updateUsers"></UsersRow>
        <div v-if="showNewUserForm" class="tablerow">
            <div class="id"></div>
            <div class="name">
                <input type="text" v-model="newUser.name">
            </div>
        </div>
      </div>
      <div class="overlayfooter">
        <div></div>
        <div>
            <button v-if="!showNewUserForm" class="btn btn-small" @click="openView('addView')"><i class="fas fa-plus-square"></i> Add user</button>
        </div>
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
        showNewUserForm:false,
        newUser:{}
      }
  },
    methods:{
        openView(View,selector){
            this.$emit('openView',View,selector)
        },
    forceRerender(){
      this.componentKey += 1;
    },
    responseMessage(msg){
        this.msg=msg
    },
    openNewUserForm(){
        this.showNewUserForm = true
    },
    cancelForm(){
        this.showNewUserForm = false
        this.newUser = {}
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