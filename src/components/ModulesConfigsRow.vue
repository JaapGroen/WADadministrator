<template>
    <div class="tablerow" @mouseenter="hover=true" @mouseleave="hover=false">
        <div class="id" @click="config.selected=!config.selected">
            <i v-if="config.selected"  class="far fa-dot-circle"></i>
            <i v-else class="far fa-circle"></i>
            {{config.id}}
        </div>
        <div class="name">{{config.name}}</div>
        <div class="description">{{config.description}}</div>
        <div class="selector">{{config.id_selector[0]}}</div>
        <div class="meta">{{config.meta}}</div>
        <div class="buttons">
            <button v-if="hover" class="btn btn-small" @click="editConfig">Edit</button>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    props:['config'],
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
        enter(){
            this.hover=true;
        },
        leave(){
            this.hover=false;
        },
        editConfig(){
            this.$emit('openView','ConfigEdit',this.config)
        }
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

.name{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.description{
    padding-left:5px;
    padding-right:5px;
    flex:2 1 0;
}

.selector{
    padding-left:5px;
    padding-right:20px;
    width:50px;
}

.meta{
    padding-left:5px;
    padding-right:20px;
    width:50px;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:100px;
}
</style>