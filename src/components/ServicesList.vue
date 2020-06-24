<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Services
                <i class="fas fa-times pointer" @click="openView('Nothing')"></i>
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
                <button class="btn btn-small" @click="openView('systemView')"><i class="fas fa-info"></i> System information</button>
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
        openView(View,selector){
            this.$emit('openView',View,selector)
        },
    },
    components:{
        ServicesRow,
    },
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
