<template>
    <div class="tablerow" @mouseenter="hover=true" @mouseleave="hover=false">
        <div v-if="selector.selected" class="tablecell shrink" @click="toggleSelector">
            <i class="far fa-dot-circle"></i>
        </div>
        <div v-else class="tablecell shrink" @click="toggleSelector">
            <i class="far fa-circle" key="unselected"></i>
        </div>
        <div class="tablecell shrink">{{selector.id}}</div>
        <div class="tablecell grow" v-bind:class="c_class">
            <input v-if="hover" type="text" class="textbox" v-model=selector.name @change="setDirty()">
            <span v-else>{{selector.name}}</span>
        </div>
        <div class="tablecell grow2">
            <input v-if="hover" type="text" class="textbox" v-model=selector.description @change="setDirty()">
            <span v-else>{{selector.description}}</span>
        </div>
        <div v-if="dirty" class="tablecell static">
            <button  class="smbutton" @click="updateSelector"><i class="far fa-save"></i> Save changes</button>
        </div>
        <div v-else class="tablecell static">
            <button class="smbutton"><i class="fas fa-ruler"></i> Rules</button>
            <button class="smbutton" @click="openView('metaView')"><i class="fas fa-tags"></i> Meta</button>
            <button class="smbutton" @click="openView('configView')"><i class="fas fa-cogs"></i> Config</button>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    
  props:['selector'],
  data(){
      return {
        dirty:false,
        hover:false
      }
  },
  methods:{
    setDirty(){
        this.dirty=true;
    },
    updateSelector(){
        let formData = new FormData();
        formData.append('name',this.selector.name)
        formData.append('description',this.selector.description)
        HTTP.put(this.apiURL+'/selectors/'+this.selector.id,formData,{
          headers: {'Content-Type':'multipart/form-data'}
        })
        .then(res => {
          this.$emit('responseMessage',res.data.msg)
          this.dirty=false
        },error =>{
            console.log(error)
        })
    },
    toggleSelector(){
        this.$emit('toggleSelector',this.selector)
    },
    openView(View){
        this.$emit('openView',View,this.selector)
    },
  },
    computed:{
        c_class: function(){
            if(this.selector.isactive == true){
                return 'c1'
            } else {
                return 'c3'
            }
        },
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
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

.tablecell{
    margin-top:5px;
}

.tablecell.grow{
    flex:1 1 0;
}

.tablecell.grow2{
    flex:2 0 0;
}

.tablecell.shrink{
    flex:0 1 0;
}



.button{
    display:flex;
    flex-direction:row;
}

</style>

<style scoped>
.tablecell.static{
    width:170px;
}
</style>