<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                System Information
                <i class="fas fa-times pointer" @click="openView('Nothing')"></i>
            </div>
            <div class="overlaycontent">
                <div class="tablerow">
                    <div>WADQC: {{systems.wadqc}}</div>
                </div>
                <div class="tablerow">
                    <div>Database: {{systems.wadqc_database}}</div>
                </div>                    
                <div class="tablerow">
                    <div>dbio: {{systems['wadqc.dbio']}}</div>
                </div>    
            </div>
            <div class="overlayfooter">
                <button class="btn btn-small" @click="openView('listView')">Services</button>
                <button class="btn btn-small" @click="checkUpgrades">Check for upgrades</button>
            </div>
        </div>      
    </div>
</template>

<script>
import {HTTP} from '../main'

export default {
    props:['systems'],
    data(){
        return {
            msg:'',
            componentKey: 0,
        }
    },
    methods:{
        openView(View,selector){
            this.$emit('openView',View,selector)
        },
        checkUpgrades(){
            HTTP.get('https://api.bitbucket.org/2.0/repositories/MedPhysNL/wadqc/downloads').then(resp =>{
                console.log(resp.data)
            })
        }
    },
    components:{
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    },
}


</script>


<style scoped>
</style>
