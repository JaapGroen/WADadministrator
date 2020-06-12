<template>
    <div class="tablerow" @mouseenter="hover=true" @mouseleave="hover=false">
        <div v-if="selector.selected" class="id" @click="toggleSelector">
            <i class="far fa-dot-circle"></i> {{selector.id}}
        </div>
        <div v-else class="id" @click="toggleSelector">
            <i class="far fa-circle" key="unselected"></i> {{selector.id}}
        </div>
        <div class="name" v-bind:class="c_class">
            <input v-if="hover" type="text" class="textbox" v-model=selector.name @change="setDirty()">
            <span v-else>{{selector.name}}</span>
        </div>
        <div class="description">
            <input v-if="hover" type="text" class="textbox" v-model=selector.description @change="setDirty()">
            <span v-else>{{selector.description}}</span>
        </div>
        <div v-if="dirty" class="buttons">
            <button  class="btn btn-small" @click="updateSelector"><i class="far fa-save"></i> Save changes</button>
        </div>
        <div v-else class="buttons">
            <button class="btn btn-small" @click="openView('rulesView')"><i class="fas fa-ruler"></i> Rules</button>
            <button class="btn btn-small" @click="openView('configView')"><i class="fas fa-cogs"></i> Config</button>
            <button class="btn btn-small" @click="openView('metaView')"><i class="fas fa-tags"></i> Meta</button>
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

<style scoped>
.id{
    display:flex;
    flex-direction:row;
    align-items:center;
    flex:0 1 0;
    min-width:50px;
    padding-left:5px;
    padding-right:5px;
}

.name{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.description{
    padding-left:5px;
    padding-right:5px;
    flex:2 0 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:190px;
}
</style>