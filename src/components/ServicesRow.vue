<template>
  <div class="tablerow" @mouseleave="leave()" @mouseover="enter()">
    <div class="tablecell">Service:</div>
    <div class="tablecell" v-bind:class="c_class">{{service.name}}</div>
    <div class="tablecell" v-bind:class="c_class">{{service.status}}</div>
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
</style>