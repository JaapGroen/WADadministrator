<template>
    <div>
        <div class="block" @click="openList">
            <div class="item_title" v-bind:class="bgc_class">Services</div>
    
            <div v-if="!loading" class="item_content">
                <span v-if="servicesDown.length==0">Everything up!</span>
                <span v-else>{{servicesDown.length}} service<span v-if="servicesDown.length>1">s</span> down :(</span>
            </div>
    
            <div v-if="loading" class="item_content">
                <i class="fas fa-sun fa-2x fa-spin"></i>
            </div>
    
            <div class="item_footer">
                footer      
            </div>
        </div>
        <transition name="fade">
            <ServicesList v-if="showList" v-on:closePopup="closePopup"  v-bind:services="services"></ServicesList>
        </transition>
    </div>
</template>


<script>
 import {HTTP} from '../main'
 import ServicesList from '@/components/ServicesList'


 export default {
    data(){
        return {
            apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
            loading:true,
            showList:false,
            services:[],
            servicesDown:[]
        }
    },
    created(){
        this.updateServices()
    },
    methods:{
        forceRerender(){
            this.componentKey += 1;
        },
        openList(){
            this.showList=true
        },
        closePopup(){
            this.showList=false
        },
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
        ServicesList,
    },
    computed:{
        bgc_class: function(){
            if (this.servicesDown.length>0){
                return 'bgc3'
            } else {
                return 'bgc1'
            }
        },
        c_class: function(){
            return 'c'+this.status
        },
  },
}
</script>

<style>
</style>