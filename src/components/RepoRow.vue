<template>
    <div class="tablerow">
        <div class="tablecell">
            {{row.name}}
        </div>
        <div class="tablecell">
            {{version}}
        </div>
        <div class="tablecell">
            <button @click="installFactoryModule()">Install</button>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import {HTTP} from '@/main'


export default {
    
  props:['row'],
  data(){
      return {
          version:'',
          zipball_url:'',
          repo_url:'',
          apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
      }
  },
    methods:{
        installFactoryModule(){
            let formData = new FormData();
            formData.append('url',this.zipball_url)
            HTTP.post(this.apiURL+'/modules',formData,{
                headers: {'Content-Type':'multipart/form-data'}
            }).then((resp)=>{
                this.$emit('openModulesList',resp.data.msg)
            })
        },
    },
  computed:{
  },
  created(){
      axios.get(this.row.url+'/releases').then((resp)=>{
          this.version=resp.data[0].tag_name
          this.zipball_url=resp.data[0].zipball_url
          this.repo_url=resp.data[0].url
      })
  }
}



</script>

<style>
</style>
