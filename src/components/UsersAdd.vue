<template>
  <div class="pageoverlay">
    <div class="overlaybox">
      <div class="overlaytop">
        New user
        <i class="fas fa-times pointer" @click="openView('Nothing')"></i>
      </div>
      <div class="overlaycontent">
        <form class="loginform" @submit.prevent="addUser()">
            <div class="tablerow">
                <input type="text" class="textbox" v-model="newUser.name" placeholder="Name"/>
            </div>
            <div class="tablerow">
                <input type="text" class="textbox" v-model="newUser.email" placeholder="Email"/>
            </div>
            <div class="tablerow">
                <input type="password" class="textbox" v-model="newUser.password" placeholder="Password"/>
            </div>
            <div class="tablerow">
                <input type="password" class="passwordcheckbox" v-model="newUser.password2" placeholder="Password" v-bind:class="passwordcheck"/>
            </div>
            <div class="tablerow submit">
                <button v-if="newUserCheck" class="btn btn-submit">Save user</button>
            </div>
        </form>
      </div>
      <div class="overlayfooter">
        <div>
            <button class="btn btn-small" @click="openView('listView')">Cancel</button>
        </div>
        {{msg}}
            
        <div>
            
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
        newUser:{name:'',email:'',password:'',password2:''}
      }
  },
    methods:{
        openView(View){
            this.$emit('openView',View)
        },

    addUser(){
        if (this.newUser.password == this.newUser.password2){
            let formData = new FormData();
            formData.append('username',this.newUser.name)
            formData.append('email',this.newUser.email)
            formData.append('password',this.newUser.password)
            formData.append('role',700)
            formData.append('status',0)
            HTTP.post(this.apiURL+'/users',formData,{
              headers: {'Content-Type':'multipart/form-data'}
            })
            .then(res => {
                this.$emit('updateUsers','thanks')
                this.$emit('openView','listView')
            })
        } else {
            var r = alert("Passwords are not equal!")
        }
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
        },
        passwordcheck(){
            if (this.newUser.password2.length>0 && this.newUser.password == this.newUser.password2){
                return 'passwordOK'
            } else {
                return 'passwordError'
            }
        },
        newUserCheck(){
            if (this.newUser.name.length>0 &&
            this.newUser.email.length>0 &&
            this.newUser.password.length>0 &&
            this.newUser.password2.length>0){
                return true
            } else {
                return false
            }
        }
        
    },
}

</script>

<style scoped>
.submit{
    display:flex;
    justify-content:center;
    padding-top:10px;
    padding-bottom:10px;
}

.passwordcheckbox{
    border:none;
    width:100%;
    height:25px;
    border-bottom:3px solid #3c6eb9;
    color:white;
    font-family: 'Roboto', sans-serif;
    border-radius: 5px;
}

.passwordOK{
    background-color:#323b47;
}

.passwordError{
    background-color:#d8513f;
}
</style>