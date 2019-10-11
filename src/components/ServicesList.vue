<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Services
                <i class="fas fa-times pointer" @click="closePopup"></i>
            </div>
            <div class="tablehead">
                <div class="tableheader w30">Name</div>
                <div class="tableheader w5">Status</div>
                <div class="tableheader w10"></div>
            </div>
            <div class="overlaycontent">
                <ServicesRow v-for="(service,index) in services" v-bind:service="service" :key="index"></ServicesRow>
            </div>
            <div class="overlayfooter">
                footer
            </div>
        </div>      
    </div>
</template>

<script>
import ServicesRow from '@/components/ServicesRow'


export default {
    props:['services'],
    data(){
        return {
            msg:'',
            componentKey: 0,
            apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
        }
    },
    methods:{
        responseMessage(msg){
            this.msg=msg;
        },
        closePopup(){
            this.$emit('closePopup','thanks')
        },
    },
    components:{
        ServicesRow,
    },
}


</script>


<style>
</style>
