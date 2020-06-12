<template>
    <div class="tablerow" @click="toggleDataset">
        <div class="id">
            <i v-if="dataset.selection"  class="far fa-dot-circle"></i>
            <i v-else class="far fa-circle"></i>
        </div>
        <div class="data_id">{{dataset.data_id}}</div>
        <div class="source">{{dataset.data_source.name}}</div>
        <div class="type">{{dataset.data_type.name}}</div>
        <div class="notes">{{dataset.notes.length}} note(s)</div>
        <div class="results">{{dataset.results.length}} result(s)</div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    props:['dataset'],
    data(){
        return {
            componentKey: 0
        }
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
        toggleDataset(){
            this.$emit('toggleDataset',this.dataset)
            this.$forceUpdate();
        },  
    },
    computed:{
        apiURL(){
            'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
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
    min-width:50px;
    padding-left:5px;
    padding-right:5px;
}

.data_id{
    padding-left:5px;
    padding-right:5px;
    flex:3 0 0;
}

.source{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.type{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.notes{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.results{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}
</style>