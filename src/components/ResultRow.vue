<template>
    <div class="tablerow" v-bind:class="'c'+test.status">
        <div class="item">{{test.display_name}}</div>
        <div v-if="test.type=='object'" class="value">
            <img class="img_small" v-bind:src="'data:image/jpg;base64,'+test.value"/>
        </div>
        <div v-else class="value">
            <span v-if="test.type=='float'">
                {{test.value | decimals}}
            </span>
            <span v-else>{{test.value}}</span>
        </div>
        <div class="buttons">
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    
  props:['test'],
  data(){
      return {
        hover:false,
        dirty:false,
        log:{show:false,text:''}
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
    deleteResult(){
        HTTP.delete(this.apiURL+'/results/'+this.result.id)
        .then(resp => {
            this.$emit('updateResults','thanks')
        })
    },
    toggleResult(){
        this.$emit('toggleResult',this.result)
    },
    openLog(){
        this.$emit('openView','logView',this.result.log)
    },
  },
  computed:{
      apiURL(){
          return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
      },
  },
    filters:{
        decimals: value =>{
            return Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2);
        },
    }
}

</script>

<style scoped>
.item{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.img_small{
    height:100px;
}

.value{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}
</style>