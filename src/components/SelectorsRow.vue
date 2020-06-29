<template>
    <div class="tablerow" @mouseenter="hover=true" @mouseleave="hover=false">
        <div class="id" @click="selector.selected=!selector.selected">
            <i v-if="selector.selected" class="far fa-dot-circle"></i>
            <i v-else class="far fa-circle"></i>
            {{selector.id}}
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

            <router-link :to="{name:'rules',params:{id:selector.id}}" v-if="hover" class="btn btn-small" tag="button">
                <i class="fas fa-ruler"></i> Rules
            </router-link>
            
            <router-link :to="{name:'config',params:{id:selector.id_config}}" v-if="hover" class="btn btn-small" tag="button">
                <i class="fas fa-cogs"></i> Config
            </router-link>
            <router-link :to="{name:'meta',params:{id:selector.id_meta}}" v-if="hover" class="btn btn-small" tag="button">
                <i class="fas fa-tags"></i> Meta
            </router-link>
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
        openView(view){
            this.$emit('openView',{target:view,data:{selector:this.selector},source:'SelectorsList'})
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