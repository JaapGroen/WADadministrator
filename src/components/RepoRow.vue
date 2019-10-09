<template>
    <div class="tablerow">
        <div class="tablecell">
            <i class="fas fa-hdd" v-if="installed"></i>
            {{row.name}}
        </div>
        <div class="tablecell">
            <select>
            <option v-for="release in releases">{{release.version}}</option>
            </select>
        </div>
        <div class="tablecell">
            <button @click="installFactoryModule()" class="smbutton"><i class="fas fa-download"></i> Install</button>
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
          apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
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

<style>
</style>
