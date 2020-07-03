<template>
    <div class="tablerow" @mouseenter="hover=true" @mouseleave="hover=false">
        <div class="id" @click="result.selected=!result.selected">
            <i v-if="result.selected" class="far fa-dot-circle"></i>
            <i v-else class="far fa-circle"></i>
            {{result.id}}
        </div>
        <div class="created">{{result.created}}</div>
        <div class="selector">{{result.selector.name}}</div>
        <div class="type">{{result.data_set.data_type.name}}</div>
        <div class="notes">{{result.data_set.notes.length}}</div>
        <div class="buttons">
            <router-link :to="{name:'result',params:{id:result.id}}" v-if="hover" class="btn btn-small" tag="button"><i class="fas fa-list"></i> Result</router-link>
            <router-link :to="{name:'log',params:{id:result.id,type:'results'}}" v-if="hover" class="btn btn-small" tag="button"><i class="far fa-file-alt"></i> Log</router-link>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    
  props:['result'],
  data(){
      return {
        hover:false,
        dirty:false,
      }
  },
  methods:{
    setDirty(){
        this.dirty=true;
    },
    deleteResult(){
        HTTP.delete(this.apiURL+'/results/'+this.result.id)
        .then(resp => {
            this.$emit('getFirstResults','thanks')
        })
    },
  },
  computed:{
      apiURL(){
          return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
      },
  }
}

</script>

<style scoped>
.id{
    display:flex;
    flex-direction:row;
    align-items:center;
    flex:0 1 0;
    min-width:70px;
    padding-left:5px;
    padding-right:5px;
}

.created{
    padding-left:5px;
    padding-right:5px;
    flex:2 0 0;
}

.selector{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.type{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.notes{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:120px;
}
</style>