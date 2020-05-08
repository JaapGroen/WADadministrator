<template>
    <div class="tablerow" @mouseleave="leave()" @mouseover="enter()">
        <div class="tablecell shrink">
            <input type="checkbox" v-model="selector.selected" @change="toggleSelector">
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
            <button class="smbutton" @click="openMeta"><i class="fas fa-tags"></i> Meta</button>
            <button class="smbutton" @click="openConfig"><i class="fas fa-cogs"></i> Config</button>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    
  props:['selector'],
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
    openMeta(){
        this.$emit('openMeta',this.selector)
    },
    openConfig(){
        this.$emit('openConfig',this.selector)
    }
  },
  computed:{
        c_class: function(){
            if(this.selector.isactive == true){
                return 'c1'
            } else {
                return 'c3'
            }
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