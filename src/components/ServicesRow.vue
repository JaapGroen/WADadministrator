<template>
  <div class="tablerow" @mouseleave="leave()" @mouseover="enter()">
    <div class="name">{{service.name}}</div>
    <div class="status" v-bind:class="c_class">{{service.status}}</div>
    <div class="buttons"></div>
  </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    
  props:['service'],
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
  },
    computed:{
        c_class: function(){
            if(this.service.status == "running"){
                return 'c1'
            } else {
                return 'c3'
            }
        },
    },
}

</script>

<style scoped>
.name{
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
    width:200px;
}
</style>