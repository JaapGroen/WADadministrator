<template>
    <div class="tablerow">
        <div v-if="result.selected" class="tablecell shrink" @click="toggleResult">
            <i class="far fa-dot-circle"></i>
        </div>
        <div v-else class="tablecell shrink" @click="toggleResult">
            <i class="far fa-circle" key="unselected"></i>
        </div>
        <div class="tablecell">{{result.id}}</div>
        <div class="tablecell">{{result.created}}</div>
        <div class="tablecell">{{result.data_set.data_type.name}}</div>
        <div class="tablecell">{{result.data_set.notes.length}}</div>
        <div class="tablecell">
            <button class="smbutton" @click="openLog"><i class="far fa-file-alt"></i> Log</button>
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
        HTTP.get(this.apiURL+'/results/'+this.result.id+'/log').then(resp =>{
            this.log.text = resp.data.log
            this.log.show = true
            this.$emit('openLog',this.log)
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

<style>
.tablerow{
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:space-between;
  padding:5px;
  min-height:40px;
  align-items:center;
}

.tablerow:nth-child(even){
    background-color: #0C0C0C;
}

.tablerow:nth-child(odd){
    background:#2F2F2F;
}

.tablecell_s{
    padding-left:10px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
}
</style>