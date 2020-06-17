<template>
    <div class="tablerow" @mouseleave="leave()" @mouseover="enter()">
        <div class="id" @click="toggleProcess">
            <i v-if="process.selected" class="far fa-dot-circle"></i>
            <i v-else class="far fa-circle"></i>
            {{process.id}}
        </div>
        <div class="created">{{process.created}}</div>
        <div class="type">{{process.data_set.data_type.name}}</div>
        <div class="selector">{{process.selector.name}}</div>
        <div class="status">{{process.status}}</div>
        <div class="buttons">
            <button v-if="process.status=='waiting for input'" class="btn btn-small" @click="submitInput">Input</button>
            <button v-else class="btn btn-small" @click="openLog"><i class="far fa-file-alt"></i> Log</button>
            <button v-if="hover" class="btn btn-small" @click="deleteProcess"><i class="fas fa-trash-alt"></i> Remove</button>
            <button v-if="hover" class="btn btn-small"><i class="far fa-paper-plane"></i> Resend</button>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    
  props:['process'],
  data(){
      return {
        hover:false,
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
    openLog(){
        this.$emit('openView','logView',this.process.log)
    },
    deleteProcess(){
        HTTP.delete(this.apiURL+'/processes/'+this.process.id)
        .then(res => {
            this.$emit('updateProcesses','thanks')
        })
    },
    toggleProcess(){
        this.$emit('toggleProcess',this.process)
    },
    submitInput(){
        HTTP.get(this.apiURL+'/processes/'+this.process.id+'/input').then(resp => {
            this.$emit('openView','inputView',{'inputs':resp.data.inputs,'process':this.process})
        })
    }
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

.selector{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.status{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:200px;
}
</style>