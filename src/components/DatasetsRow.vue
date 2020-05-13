<template>
    <div v-if="dataset" class="tablerow" @click="toggleDataset">
        <div  v-if="dataset.selection" class="tablecell shrink" >
            <i class="far fa-dot-circle"></i>
        </div>
        <div v-if="!dataset.selection" class="tablecell shrink">
            <i class="far fa-circle"></i>
        </div>
        <div class="tablecell">{{dataset.data_id}}</div>
        <div class="tablecell">{{dataset.data_source.name}} - {{dataset.selection}}</div>
        <div class="tablecell">{{dataset.data_type.name}}</div>
        <div class="tablecell">{{dataset.notes.length}} note(s)</div>
        <div class="tablecell">{{dataset.results.length}} result(s)</div>
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

<style>
.tablerow{
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:space-between;
  padding:5px;
  min-height:40px;
  align-items:center;
}

.tablerow:nth-child(even){
    background-color: #0C0C0C;
}

.tablerow:nth-child(odd){
    background:#2F2F2F;
}

.tablecell_s{
    padding-left:10px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
}



</style>