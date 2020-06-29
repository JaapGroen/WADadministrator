<template>
    <div class="pageoverlay">
        <div class="overlaybox">
            <div class="overlaytop">
                Modules available on the WADQC repository
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div class="overlayhead">
                <div class="icon"></div>
                <div class="name">Name</div>
                <div class="version">Version</div>
                <div class="buttons"></div>
            </div>
            <div class="overlaycontent" v-if="loaded && !limitExceded">
                <RepoRow v-for="row in repo" v-bind:row="row" :key="row.id" :modules="modules"></RepoRow>
            </div>
            <div class="overlaycontent" v-if="loaded && limitExceded">
                <div class="tablerow">
                    {{repoMsg}}
                </div>

            </div>
            <div class="overlaycontent" v-if="!loaded">
                Github-repository loading...
            </div>
            <div class="overlayfooter">
                <div>
                    <router-link to="/modules" class="btn btn-small" tag="button"><i class="fas fa-list"></i> Modules</router-link>
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
            credentials:{'username':'','token':''}
        }
    },
    methods:{
        openView(View){
            this.$emit('openView',View)
        },
        forceRerender(){
            this.componentKey += 1;
        },
        updateModules(msg){
            this.$emit('updateModules','thanks')
            this.msg=msg
        },
        queryRepo(){
            RepoTool.queryRepo(this.credentials).then((resp)=>{
                console.log(resp)
            })
        }
    },
    created(){
        RepoTool.queryRepo().then((resp)=>{
            this.repo=resp.data
            this.loaded=true
        },(reject)=>{
            this.loaded = true
            this.limitExceded = true
            this.repoMsg = 'Github API rate limit exceeded.'
        })
    },
    components:{
        RepoRow,
    },
}

</script>

<style scoped>
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
    padding-right:15px;
    width:100px;
}
</style>