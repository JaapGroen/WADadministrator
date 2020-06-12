<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                System Information
                <i class="fas fa-times pointer" @click="openView('Nothing')"></i>
            </div>
            <div class="overlaycontent">
                sys info
            </div>
            <div class="overlayfooter">
                <button class="btn btn-small" @click="openView('listView')">Services</button>
            </div>
        </div>      
    </div>
</template>

<script>

export default {
    props:['systems'],
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
    },
}


</script>


<style scoped>
</style>
