<template>
    <div class="tablerow">
        <div class="icon">
            <i class="fas fa-hdd" v-if="installed"></i>
        </div>
        <div class="name">
            {{row.name}}
        </div>
        <div class="version">
            <select class="selectbox">
                <option v-for="release in releases">{{release.version}}</option>
            </select>
        </div>
        <div class="buttons">
            <button @click="installFactoryModule()" class="btn btn-small"><i class="fas fa-download"></i> Install</button>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import {HTTP} from '@/main'


export default {
    
  props:['row','modules'],
  data(){
      return {
          releases:[],
          installed:false
      }
  },
    methods:{
        installFactoryModule(){
            let formData = new FormData();
            formData.append('url',this.releases[0].url)
            HTTP.post(this.apiURL+'/modules',formData,{
                headers: {'Content-Type':'multipart/form-data'}
            }).then((resp)=>{
                this.$emit('openList',resp.data.msg)
            })
        },
    },
  computed:{
  },
    created(){
        let installednames = this.modules.map(a => a.name);
        axios.get(this.row.url+'/releases').then((resp)=>{
            if(installednames.includes(this.row.name)){
                this.installed=true
            }
            for (let i=0;i<resp.data.length;i++){
                this.releases.push({version:resp.data[i].tag_name,url:resp.data[i].url})
            }
        })
    }
}



</script>

<style scoped>

.hidden{
    opacity: 0.0;
}

.icon{
    padding-left:5px;
    padding-right:5px;
    width:50px;
}

.name{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.version{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:100px;
}

</style>
