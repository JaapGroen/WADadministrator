<template>
    <div class="tablerow" @mouseleave="hover=false" @mouseover="hover=true">
        <div class="id" @click="process.selected=!process.selected">
            <i v-if="process.selected" class="far fa-dot-circle"></i>
            <i v-else class="far fa-circle"></i>
            {{process.id}}
        </div>
        <div class="created">{{process.created}}</div>
        <div class="selector">{{process.selector.name}}</div>
        <div class="type">{{process.data_set.data_type.name}}</div>
        <div class="status">{{process.status}}</div>
        <div class="buttons">
            <button v-if="process.status=='waiting for input'" class="btn btn-small" @click="submitInput"><i class="fas fa-pencil-alt"></i> Input</button>
            <router-link :to="{name:'log',params:{id:process.id,type:'processes'}}" v-if="hover" class="btn btn-small" tag="button"><i class="far fa-file-alt"></i> Log</router-link>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default { 
    props:['process'],
    data(){
        return {
            hover:false,
            dirty:false
        }
    },
    methods:{
        submitInput(){
            HTTP.get(this.apiURL+'/processes/'+this.process.id+'/input').then(resp => {
                var payload = {
                    target:'InputView',
                    data:{'inputs':resp.data.inputs,'process':this.process},
                    source:'ProcessesList'}
                this.$emit('openView',payload)
            })
        }
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
    }
}

</script>

<style scoped>
.id{
    display:flex;
    flex-direction:row;
    align-items:center;
    flex:0 1 0;
    min-width:70px;
    padding-left:5px;
    padding-right:5px;
}

.created{
    padding-left:5px;
    padding-right:5px;
    flex:2 0 0;
}

.type{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.selector{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.status{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:150px;
}
</style>