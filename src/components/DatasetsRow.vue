<template>
    <div class="tablerow">
        <div class="id" @click="dataset.selected=!dataset.selected">
            <i v-if="dataset.selection"  class="far fa-dot-circle"></i>
            <i v-else class="far fa-circle"></i>
        </div>
        <div class="station">{{dataset.tags['0008,1010'].Value}}</div>
        <div class="patientname">{{dataset.tags['0010,0010'].Value}}</div>
        <div class="study">{{dataset.tags['0008,1030'].Value}}</div>
        <div class="serie">{{dataset.tags['0008,103e'].Value}}</div>
        <div class="date">{{dataset.tags['0008,0020'].Value}}</div>
        <div class="type">{{dataset.data_type.name}}</div>
        <div class="buttons">
            <router-link :to="{name:'notes',params:{id:dataset.id}}" class="btn btn-small" v-if="dataset.notes.length>0" tag="button"><i class="fas fa-clipboard-list"></i> Notes</router-link>
            <router-link :to="{name:'result',params:{id:dataset.results[0]}}" v-if="dataset.results.length>0" class="btn btn-small" tag="button"><i class="fas fa-list"></i> Result</router-link>
            
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    props:['dataset'],
    data(){
        return {
        }
    },
    created(){
    },
    methods:{
        openNotes(){
            this.$emit('openView','notesView',this.dataset)
        },
        openResults(){
            this.$emit('openView',{target:'ResultsView',data:this.dataset.results[0],source:'DatasetsList'})
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
    width:25px;
}

.station{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.patientname{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.study{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.serie{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.date{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.type{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:150px;
}
</style>