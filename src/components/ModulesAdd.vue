<template>
    <div class="pageoverlay">
        <div class="overlaybox">
            <div class="overlaytop">
                {{repo_modules.length}} Modules available on the WADQC repository
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div class="overlayhead">
                <div class="icon"></div>
                <div class="name">Name</div>
                <div class="version">Version</div>
                <div class="repo">Available</div>
                <div class="buttons"></div>
            </div>
            <div class="overlaycontent" v-if="!loading && !limitExceeded">
                <RepoRow v-for="repo_module in repo_modules" v-bind:repo_module="repo_module" :key="repo_module.name" :token="token"></RepoRow>
            </div>
            <div class="overlaycontent" v-if="!loading && limitExceeded">
                <div class="tablerow">
                    API rate limit exceeded, please use a token.
                    <input type="text" v-model="token"/>
                    <button class="btn btn-small" @click="getModules">Retry</button>
                </div>

            </div>
            <div class="overlaycontent" v-if="loading">
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
// import RepoTool from '@/components/RepoTool'
import RepoRow from '@/components/RepoRow'

export default {
    data(){
        return {
            limitExceeded:false,
            loading:true,
            installed_modules:[],
            repo_modules:[],
            token:''
        }
    },
    methods:{
        getModules(){
            HTTP.get(this.apiURL+'/modules').then(resp =>{
                this.installed_modules = resp.data.modules
                let GithubRepoUrl = 'https://api.github.com/users/MedPhysQC/repos'
                HTTP.get(GithubRepoUrl,{
                  headers: {'Authorization':'token '+this.token}
                }).then((resp)=>{
                    this.repo_modules = resp.data
                    this.limitExceeded = false
                    this.repo_modules.forEach((repo_module)=>{
                        
                        let found = this.installed_modules.find((installed_module, index)=>{
                            if (installed_module.name == repo_module.name){
                                return installed_module.repo_version
                            } else {
                                return false
                            }
                        })
                        
                        if (found){
                            this.$set(repo_module, 'installed', found)
                        } else {
                            this.$set(repo_module, 'installed', false)
                        }
                        
                        // if (installed_names.includes(repo_module.name)){
                            // this.$set(repo_module, 'installed', true)
                        // } else {
                            // this.$set(repo_module, 'installed', false)
                        // }
                        this.loading = false
                    })
                },(error)=>{
                    this.limitExceeded = true
                    this.loading = false
                })
            })
        }
    },
    created(){
        this.getModules()
    },
    components:{
        RepoRow,
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
    }
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

.repo{
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
