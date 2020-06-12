<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Log 
                <i class="fas fa-times pointer" @click="closePopup"></i>
            </div>
            <div class="overlaycontent">
            {{log.text}}
            </div>
            <div class="overlayfooter">
                <button class="btn btn-small" @click="openResults"><i class="fas fa-list"></i> Results</button>
                <div></div>
            </div>
        </div>      
    </div>
</template>

<script>

export default {
    props:['log'],
    data(){
        return {
            componentKey: 0
        }
    },
    methods:{
        closePopup(){
            this.$emit('closePopup','thanks')
        },
        openResults(){
            this.$emit('openResults','thanks')
        }, 
    },
}


</script>


<style>
</style>
