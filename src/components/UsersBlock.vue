<template>
    <div>
        <div class="block" @click="openView('listView')">
            <div class="item_title bgc0">Users</div>
      
            <div v-if="!loading" class="item_content">
                Usermanagement
            </div> 
      
            <div v-if="loading" class="item_content">
                <i class="fas fa-sun fa-2x fa-spin"></i>
            </div>
    
            <div class="item_footer">
                {{numberOfUsers}} users  
            </div>
        </div>
        <transition name="fade">
            <UsersList v-if="show.listView" v-on:openView="openView" v-bind:users="users" :key="1" v-on:updateUsers="updateUsers"></UsersList>
            <UsersAdd v-if="show.addView" v-on:openView="openView" v-on:updateUsers="updateUsers"></UsersAdd>
        </transition>
    </div>
</template>


<script>
import {HTTP} from '../main'
import UsersList from '@/components/UsersList'
import UsersAdd from '@/components/UsersAdd'

 export default {
  data(){
      return {
        loading:true,
        numberOfUsers:0,
        users:[],
        show:{listView:false,addView:false},
      }
  },
    mounted(){
        this.updateUsers()
    },
    methods:{
        openView(View,selector){
            this.activeSelector = selector
            Object.keys(this.show).forEach((view)=>{
                if (view == View){
                    this.show[view] = true
                } else {
                    this.show[view] = false
                }
            })
        },
        updateUsers(){
            HTTP.get(this.apiURL+'/users').then(resp =>{
                this.numberOfUsers=resp.data.users.length
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
  filters:{
    prettydate: timestamp =>{
      let currentDate = new Date();
      let toFormat = new Date(timestamp);
      if(!timestamp){
        return '?'
      }
      if(toFormat.getDate() == currentDate.getDate() && toFormat.getMonth() == currentDate.getMonth() && toFormat.getFullYear() == currentDate.getFullYear() ) {
        return 'Today'
      }
      if(toFormat.getDate() == (currentDate.getDate() - 1) && toFormat.getMonth() == currentDate.getMonth() && toFormat.getFullYear() == currentDate.getFullYear()) {
        return 'Yesterday'
      }
      let time_diff = Math.abs(toFormat.getTime() - currentDate.getTime());
      let diff_days = Math.ceil(time_diff / (1000 * 3600 * 24));
      return diff_days + ' days ago'
    },
    decimals: value =>{
        return Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2);
    },
    isodate: timestamp =>{
        let d = new Date(timestamp);
        return d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear()
    },
    msdate: timestamp =>{
        let d = new Date(timestamp);
        return d.getTime()
    }
  },
  components:{
    UsersList,
    UsersAdd
  }
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