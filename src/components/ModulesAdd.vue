<template>
    <div class="pageoverlay">
        <div class="overlaybox">
            <div class="overlaytop">
                Modules available on the WADQC repository
                <i class="fas fa-times pointer" @click="closePopup"></i>
            </div>
            <div class="overlaycontent" v-if="loaded && !limitExceded">
                <RepoRow v-for="row in repo" v-bind:row="row" :key="row.id" :modules="modules" v-on:openList="openList"></RepoRow>
            </div>
            <div class="overlaycontent" v-if="loaded && limitExceded">
                {{repoMsg}}
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="smbutton" @click="openList"><i class="fas fa-list"></i> Modules</button>
                    {{msg}}
                </div>
            </div>
        </div>    
  </div>
</template>

<script>
import {HTTP} from '@/main'
import RepoTool from '@/components/RepoTool'
import RepoRow from '@/components/RepoRow'

export default {
    props:['modules'],
    data(){
        return {
            msg:'',
            componentKey: 0,
            apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
            msg:'',
            repo:[],
            limitExceded:false,
            repoMsg:'',
            loaded:false,
        }
    },
    methods:{
        closePopup(){
            this.$emit('closePopup','thanks')
        },
        forceRerender(){
            this.componentKey += 1;
        },
        updateModules(msg){
            this.$emit('updateModules','thanks')
            this.msg=msg
        },
        openList(msg){
            this.$emit('openList',msg)
        },
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
        RepoRow,
    },
}

</script>

<style>
</style>