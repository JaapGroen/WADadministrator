<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                System Information
                <i class="fas fa-times pointer" @click="openView('Nothing')"></i>
            </div>
            <div class="overlaycontent">
                <div class="overlayhead">
                    <div class="system">System</div>
                    <div class="version">Software version</div>
                    <div class="buttons"></div>
                </div>
                <div class="tablerow">
                    <div class="system">WADQC framework</div>
                    <div class="version">{{systems.wadqc}}</div>
                    <div class="buttons"></div>
                </div>
                <div class="tablerow">
                    <div class="system">WADQC database</div>
                    <div class="version">{{systems.wadqc_database}}</div>
                    <div class="buttons"></div>
                </div>                    
                <div class="tablerow">
                    <div class="system">I/O layer</div>
                    <div class="version">{{systems['wadqc.dbio']}}</div>
                    <div class="buttons"></div>
                </div>    
            </div>
            <div class="overlayfooter">
                <button class="btn btn-small" @click="openView('listView')"><i class="fas fa-concierge-bell"></i> Services</button>
                <button class="btn btn-small" @click="checkUpgrades"><i class="fas fa-search"></i> Check for upgrades</button>
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
.system{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.version{
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
