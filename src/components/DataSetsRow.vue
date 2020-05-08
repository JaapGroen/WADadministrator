<template>
    <div class="tablerow">
        <div class="tablecell shrink">
            <input type="checkbox" v-model="dataset.selected" @change="toggleDataset">
        </div>
        <div class="tablecell">{{dataset.data_id}}</div>
        <div class="tablecell">{{dataset.data_source.name}}</div>
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
            hover:false,
            showSeries:false,
            tags:{},
            loaded:false
        }
    },
    methods:{
        enter(){
            this.hover=true;
        },
        leave(){
            this.hover=false;
        },
        toggleDataset(){
            this.$emit('toggleDataset',this.dataset)
        },  
    },
    computed:{
        apiURL(){
            'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
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