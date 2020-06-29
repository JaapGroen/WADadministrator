<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Log
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div class="overlaycontent" v-if="!loading">
                <pre>
                    {{log}}
                </pre>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="$router.go(-1)"><i class="fas fa-list"></i> Back</button>
                </div>
                <div></div>
                <div></div>
            </div>
        </div>      
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    props:[''],
    data(){
        return{
            log:'',
            loading:true
        }
    },
    mounted(){
        this.getLog()
    },
    methods:{
        getLog(){
            HTTP.get(this.apiURL+'/'+this.$route.params.type+'/'+this.$route.params.id).then(resp =>{
                if (this.$route.params.type == 'results'){
                    this.log =resp.data.result.log
                } else if (this.$route.params.type == 'processes'){
                    this.log =resp.data.process.log
                }
                this.loading=false
            })
        }
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
    }
}


</script>


<style scoped>
pre{
    white-space: pre-wrap;
}
</style>


