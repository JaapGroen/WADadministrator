<template>
    <router-link to="/users" class="block" tag="div">
        <div class="item_title bgc0">Users</div>
  
        <div v-if="!loading" class="item_content">
            Usermanagement
        </div> 
  
        <div v-if="loading" class="item_content">
            
        </div>

        <div class="item_footer">
            <span v-if="loading"><i class="fas fa-sun fa-spin"></i>&nbsp</span>
            <span v-else>{{users.length}}&nbsp</span>
             users  
        </div>
    </router-link>
</template>


<script>
import {HTTP} from '../main'

export default {
    data(){
        return {
            loading:true,
            users:[]
        }
    },
    mounted(){
        this.updateUsers()
    },
    methods:{
        updateUsers(){
            HTTP.get(this.apiURL+'/users').then(resp =>{
                this.users=resp.data.users
                this.loading=false
            })
        }
    },
  computed:{
    bgc_class: function(){
      return 'bgc'+this.test.status
    },
    c_class: function(){
      return 'c'+this.test.status
    },
    apiURL(){
        return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
    }
  },
  components:{}
}
</script>

<style scoped>
.block{
  height:250px;
  width:250px;
  margin: 20px;
  display:flex;
  flex-direction:column;
}

.item_title{
  height:40px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding-left: 15px;
  padding-right: 15px;
  display:flex;
  align-items:center;
}

.item_content{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around;
  height:190px;
  background:#141a26;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
}

.item_footer{
  display:flex;
  align-items:center;
  padding-left:20px;
  padding-right:20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background:#323b47;
  height:30px;
  font-size:12px;
}
</style>