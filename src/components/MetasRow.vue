<template>
    <div class="tablerow" @mouseenter="hover=true" @mouseleave="hover=false">
        <div class="id" @click="meta.selected=!meta.selected">
            <i v-if="meta.selected"  class="far fa-dot-circle"></i>
            <i v-else class="far fa-circle"></i>
            {{meta.id}}
        </div>
        <div class="selector">
            <span v-for="i in meta.id_selector">{{i}}</span>
        </div>
        <div class="config"><span v-for="i in meta.id_config">{{i}}</span></div>
        <div class="buttons">
            <router-link :to="{name:'meta',params:{id:meta.id}}" tag="button" v-if="hover" class="btn btn-small" >
                <i class="fas fa-edit"></i> Edit
            </router-link>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    props:['meta'],
    data(){
        return {
            componentKey: 0,
            hover:false
        }
    },
    created(){
    },
    methods:{
        forceRerender(){
            this.componentKey = this.componentKey+1;  
        },
    },
    computed: {
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
    },
}

</script>

<style scoped>
.id{
    padding-left:5px;
    padding-right:20px;
    width:50px;
}

.selector{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.config{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:100px;
}
</style>