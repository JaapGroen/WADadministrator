<template>
    <div class="tablerow">
        <div class="id" @click="toggleResult">
            <i v-if="result.selected" class="far fa-dot-circle"></i>
            <i v-else class="far fa-circle"></i>
            {{result.id}}
        </div>
        <div class="created">{{result.created}}</div>
        <div class="type">{{result.data_set.data_type.name}}</div>
        <div class="notes">{{result.data_set.notes.length}}</div>
        <div class="buttons">
            <button class="btn btn-small" @click="openLog"><i class="far fa-file-alt"></i> Log</button>
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
    width:80px;
}
</style>