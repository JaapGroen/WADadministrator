<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Services
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div class="overlayhead">
                <div class="name">Name</div>
                <div class="status">Status</div>
                <div class="buttons"></div>
            </div>
            <div class="overlaycontent">
                <ServicesRow v-for="(service,index) in services" v-bind:service="service" :key="index">
                </ServicesRow>
            </div>
            <div class="overlayfooter">
                <router-link to="/systems" class="btn btn-small" tag="button"><i class="fas fa-info"></i> System information</router-link>
            </div>
        </div>      
    </div>
</template>

<script>
import {HTTP} from '@/main'
import ServicesRow from '@/components/ServicesRow'

export default {
    props:[''],
    data(){
        return {
            services:[]
        }
    },
    mounted(){
        this.updateServices()
    },
    methods:{
        updateServices(){
            HTTP.get(this.apiURL+'/services').then(resp =>{
                this.services=resp.data.services
                this.loading=false
                for (let i=0;i<this.services.length;i++){
                    if(this.services[i].status!='running'){
                        this.servicesDown.push(this.services[i])
                    }
                }
            })
        },
    },
    components:{
        ServicesRow
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    }
}


</script>


<style scoped>
.name{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.status{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:200px;
}
</style>
