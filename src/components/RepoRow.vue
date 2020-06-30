<template>
    <div class="tablerow">
        <div class="icon">
            <i class="fas fa-hdd" v-if="repo_module.installed"></i>
        </div>
        <div class="name">
            {{repo_module.name}}
        </div>
        <div class="version" v-if="loading">
            <i class="fas fa-sun fa-spin"></i> loading versions
        </div>
        <div class="version" v-else>
            <select class="selectbox" v-if="releases!='None'">
                <option v-for="release in releases">{{release.version}}</option>
            </select>
            <span v-else>
                {{releases}}
            </span>
        </div>
        <div class="buttons">
            <button @click="installFactoryModule()" class="btn btn-small"><i class="fas fa-download"></i> Install</button>
        </div>
    </div>
</template>


<script>
import {HTTP} from '@/main'

export default { 
    props:['repo_module','token'],
    data(){
        return {
            releases:[],
            loading:true
        }
    },
    methods:{
        installFactoryModule(){
            let formData = new FormData();
            formData.append('url',this.releases[0].url)
            HTTP.post(this.apiURL+'/modules',formData,{
                headers: {'Content-Type':'multipart/form-data'}
            }).then((resp)=>{
                console.log(resp.data)
            })
        },
        getReleases(){
            HTTP.get(this.repo_module.url+'/releases',{headers: {'Authorization':'token '+this.token}}).then((resp)=>{
                if (resp.data.length>0){
                    resp.data.forEach((release)=>{
                        HTTP.get(release.url,{headers: {'Authorization':'token '+this.token}}).then((resp)=>{
                            this.releases.push({version:resp.data.tag_name,url:resp.data.url})
                            this.loading = false
                        })
                    })
                } else {
                    this.releases = 'None'
                    this.loading = false
                }
            })
        }
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
    },
    created(){
        this.getReleases()
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
