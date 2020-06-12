<template>
    <div>
        <div class="block" @click="openView('listView')">
            <div class="item_title" v-bind:class="bgc_class">Services & System</div>
    
            <div v-if="!loading" class="item_content">
                Status of WADservices and system information
            </div>
    
            <div v-if="loading" class="item_content">
                <i class="fas fa-sun fa-2x fa-spin"></i>
            </div>
    
            <div class="item_footer">
                <span v-if="servicesDown.length==0">Everything up!</span>
                <span v-else>{{servicesDown.length}} service<span v-if="servicesDown.length>1">s</span> down :(</span>      
            </div>
        </div>
        <transition name="fade">
            <ServicesList v-if="show.listView" v-on:openView="openView" v-bind:services="services"></ServicesList>
            <SystemList v-if="show.systemView" v-on:openView="openView"></SystemList>
        </transition>
    </div>
</template>


<script>
 import {HTTP} from '../main'
 import ServicesList from '@/components/ServicesList'
 import SystemList from '@/components/SystemList'


 export default {
    data(){
        return {
            loading:true,
            show:{listView:false,systemView:false},
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
        openView(View,selector){
            this.activeSelector = selector
            Object.keys(this.show).forEach((view)=>{
                if (view == View){
                    this.show[view] = true
                } else {
                    this.show[view] = false
                }
            })
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
        SystemList
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
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
  },
}
</script>

<style scoped>
.block{
  height:250px;
  width:250px;
  margin: 20px;
  display:flex;
  flex-direction:column;
}

.item_title{
  height:40px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding-left: 15px;
  padding-right: 15px;
  display:flex;
  align-items:center;
}

.item_content{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around;
  height:190px;
  background:#141a26;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
}

.item_footer{
  display:flex;
  align-items:center;
  padding-left:20px;
  padding-right:20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background:#323b47;
  height:30px;
  font-size:12px;
}
</style>