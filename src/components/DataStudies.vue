<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                {{studies.length}} studies without a result
                <i class="fas fa-times pointer" @click="closePopup"></i>
            </div>
            <div class="tablehead">
                <div class="tableheader">Tableheader</div>
            </div>
            <div class="overlaycontent">
                <DataStudiesRow v-for="(study,index) in studies" v-bind:study="study" :key="index">
                </DataStudiesRow>   
            </div>
            <div class="overlayfooter">
                {{msg}}
            </div>
        </div>      
    </div>
</template>

<script>
import DataStudiesRow from '@/components/DataStudiesRow'
import {HTTP} from '@/main'

export default {
    props:['studies','msg'],
    data(){
        return {
            componentKey: 0,
            apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
        }
    },
    methods:{
        closePopup(){
            this.$emit('closePopup','thanks')
        },
    },
    components:{
        DataStudiesRow,
    },
/*     computed:{
        orderedSelectors: function(){
            return _.orderBy(this.selectors, 'id')
        },
    } */
}


</script>


<style>
</style>
