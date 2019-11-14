<template>
    <div class="tablerow">
        <div class="tablecell" v-if="!loaded">{{study}}</div>
        <div class="tablecell" v-if="!loaded"><i class="fas fa-sun fa-spin"></i></div>
        <div class="tablecell" v-if="loaded">{{tags.StudyDescription}}</div>
        <div class="tablecell" v-if="loaded">{{tags.StudyDate}}</div>
        <div class="tablecell" v-if="loaded">{{tags.Series.length}} series</div>
        <div class="tablecell" v-if="loaded">?</div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    props:['study'],
    data(){
        return {
            hover:false,
            apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
            showSeries:false,
            tags:{},
            loaded:false
        }
    },
    created(){
        this.getStudyTags()
    },
    methods:{
        enter(){
            this.hover=true;
        },
        leave(){
            this.hover=false;
        },
        getStudyTags(){
            HTTP.get(this.apiURL+'/datasources/1/data/'+this.study).then((resp)=>{
                this.tags=resp.data.data
                this.loaded = true
            })
        },
        getSeries(){
            
        }
    },
    computed:{
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