<template>
    <div style="height:100%;">
        <div class="overlaycontent" v-if="loaded && !limitExceded">
            <RepoRow v-for="row in repo" v-bind:row="row" :key="row.id" v-on:openModulesList="openModulesList"></RepoRow>
        </div>
        <div class="overlaycontent" v-if="loaded && limitExceded">
            {{repoMsg}}
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/main'
import RepoTool from '@/components/RepoTool'
import RepoRow from '@/components/RepoRow'

export default {
    
  data(){
      return {
        apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
        repo:[],
        loaded:false,
        limitExceded:false,
        repoMsg:'',
      }
  },
    methods:{
        openModulesList(msg){
            this.$emit('openModulesList',msg)
        }
    },
    created(){
        RepoTool.queryRepo().then((resp)=>{
            this.repo=resp.data
            this.loaded=true
        },(reject)=>{
            this.limitExceded=true
            repoMsg:'API rate limit exceded, plz use credentials.'
        })
    },
  components:{
      RepoRow
  }
}

</script>

<style>
</style>