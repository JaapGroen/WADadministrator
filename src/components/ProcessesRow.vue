<template>
    <div class="tablerow" @mouseleave="leave()" @mouseover="enter()">
        <div class="tablecell shrink">
            <input type="checkbox" v-model="process.selected" @change="toggleProcess">
        </div>
        <div class="tablecell">{{process.id}}</div>
        <div class="tablecell">{{process.created}}</div>
        <div class="tablecell">{{process.data_set.data_type.name}}</div>
        <div class="tablecell">{{process.selector.name}}</div>
        <div class="tablecell">{{process.status}}</div>
        <div class="tablecell">
            <button class="smbutton"><i class="far fa-file-alt"></i> Log</button>
            <button v-if="hover" class="smbutton" @click="deleteProcess"><i class="fas fa-trash-alt"></i> Remove</button>
            <button v-if="hover" class="smbutton"><i class="far fa-paper-plane"></i> Resend</button>
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
        this.$emit('openLog',this.process.id)     
    },
    deleteProcess(){
        HTTP.delete(this.apiURL+'/processes/'+this.process.id)
        .then(res => {
            this.$emit('responseMessage',res.data.msg)
            this.$emit('updateProcesses','thanks')
        })
    },
    toggleProcess(){
        this.$emit('toggleProcess',this.process)
    },
  },
  computed:{
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