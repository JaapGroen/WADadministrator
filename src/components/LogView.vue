<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Log 
                <i class="fas fa-times pointer" @click="openView('Nothing')"></i>
            </div>
            <div class="overlaycontent">
                <pre>
                    {{log}}
                </pre>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="openView('processView')"><i class="fas fa-list"></i> Processes</button>
                    <button class="btn btn-small" @click="openView('resultView')"><i class="fas fa-list"></i> Results</button>
                </div>
                <div></div>
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
            componentKey: 0,
            
        }
    },
    methods:{
        openView(View,log){
            this.$emit('openView',View,log)
        } 
    }
}


</script>


<style scoped>
pre{
    white-space: pre-wrap;
}
</style>


