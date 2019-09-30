<template>
  <div class="block">
    <div class="item_title">Selectors</div>
    
    <div v-if="!loading" class="item_content">
      {{numberOfSelectors}} selectors
    </div>
    
    <div v-if="loading" class="item_content">
      <i class="fas fa-sun fa-2x fa-spin"></i>
    </div>
    
    <div class="item_footer">
      footer      
    </div>
  </div>
</template>


<script>
 import {HTTP} from '../main'

 export default {
  data(){
      return {
        apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
        numberOfSelectors:0,
        loading:true
      }
  },
  created(){
    HTTP.get(this.apiURL+'/selectors')
      .then(resp =>{
        this.numberOfSelectors=resp.data.selectors.length
        this.loading=false
      })
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
  }
}
</script>

<style>
</style>