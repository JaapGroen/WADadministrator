<template>
    <router-link to="/selectors" class="block" tag="div">
    
        <div class="item_title" v-bind:class="bgc_class">Selectors</div>

        <div class="item_content">
            Overview of all selectors
        </div>

        <div class="item_footer">
            <span v-if="loading">
                <i class="fas fa-sun fa-spin"></i> active selectors, <i class="fas fa-sun fa-spin"></i> sleeping
            </span>
            <span v-else>
                {{upSelectors.length}} active selectors, {{downSelectors.length}} sleeping
            </span>
        </div>
    </router-link>
</template>


<script>
 import {HTTP} from '../main'

 export default {
  data(){
      return {
        loading:true,
        selectors:[],
      }
  },
    created(){
        this.updateSelectors()
    },
    methods:{
        forceRerender(){
            this.componentKey += 1;
        },
        updateSelectors(){
            HTTP.get(this.apiURL+'/selectors').then(resp =>{
                this.selectors=resp.data.selectors
                this.loading=false
            })
        },
    },
    computed:{
        bgc_class: function(){
            if (this.downSelectors.length == 0){
                return 'bgc1'
            } else if (this.downSelectors.length == 1){
                return 'bgc2'
            } else {
                return 'bgc3'
            }
        },
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        upSelectors(){
            return _.filter(this.selectors, {isactive:true})
        },
        downSelectors(){
            return _.filter(this.selectors, {isactive:false})
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