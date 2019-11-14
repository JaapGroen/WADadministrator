<template>
  <div>
    <div class="block" @click="openView">
      <div class="item_title bgc0">Users</div>
      
      <div v-if="!loading" class="item_content">
        {{numberOfUsers}} users
      </div> 
      
      <div v-if="loading" class="item_content">
        <i class="fas fa-sun fa-2x fa-spin"></i>
      </div>
    
      <div class="item_footer">
        footer      
      </div>
    </div>
    <transition name="fade">
      <UsersView v-if="ViewVisible" v-on:closeView="closeView" v-bind:users="users" :key="1" v-on:updateUsers="updateUsers"></UsersView>
    </transition>
  </div>
</template>


<script>
 import {HTTP} from '../main'
 import UsersView from '@/components/UsersView'

 export default {
  data(){
      return {
        apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
        loading:true,
        numberOfUsers:0,
        users:[],
        ViewVisible:false
      }
  },
  mounted(){
    this.updateUsers()
  },
  methods:{
    forceRerender(){
      this.componentKey += 1;
    },
    enter_footer(){
        this.hover.footer=true;
    },
    leave_footer(){
        this.hover.footer=false;
    },
    openView(){
      this.ViewVisible=true;  
    },
    closeView(){
      this.ViewVisible=false;
    },
    updateUsers(){
      HTTP.get(this.apiURL+'/users')
        .then(resp =>{
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
    UsersView
  }
}
</script>

<style>
</style>