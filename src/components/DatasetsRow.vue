<template>
    <div class="tablerow">
        <div class="id" @click="toggleDataset">
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
            <button class="btn btn-small" v-if="dataset.notes.length>0" @click="openNotes"><i class="fas fa-clipboard-list"></i> Notes</button>
            <button class="btn btn-small" v-if="dataset.results.length>0" @click="openResults"><i class="fas fa-list"></i> Results</button>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    props:['dataset'],
    data(){
        return {
            componentKey: 0,
            tags:[]
        }
    },
    created(){
        // this.getTags(this.dataset.id)
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
        openNotes(){
            this.$emit('openView','notesView',this.dataset)
        },
        openResults(){
            this.$emit('openView','resultsView',this.dataset)
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