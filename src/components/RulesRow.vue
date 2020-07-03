<template>
    <div class="tablerow" @mouseenter="hover=true" @mouseleave="hover=false">
        <div  class="id" @click="rule.selected=!rule.selected">
            <i v-if="rule.selected" class="far fa-dot-circle"></i>
            <i v-else class="far fa-circle"></i>
            {{rule.id}}
        </div>
        <div class="dicomtag">
            <input v-if="hover" type="text" class="textbox" v-model=rule.dicomtag @change="setDirty()"/>
            <span v-else>{{rule.dicomtag}}</span>
        </div>
        <div class="logic">
            <select v-if="hover" class="selectbox" v-model="rule.logic" @change="setDirty()">
                <option v-for="option in options" :value="option">{{option}}</option>
            </select>
            <span v-else>{{rule.logic}}</span>
        </div>
        <div class="values">
            <input v-if="hover" type="text" class="textbox" v-model="rule.values" @change="setDirty()"/>
            <span v-else>{{rule.values | arrayToString}}</span>
        </div>
        <div class="buttons">
            <button v-if="dirty" class="btn btn-small" @click="saveRule"><i class="far fa-save"></i> Save rule</button>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/main'

export default {
    props:['rule'],
    data(){
        return {
            dirty:false,
            hover:false,
            componentKey: 0,
            options:['equals','contains','starts with','ends with','is empty','not contains','not equals','is not empty']
        }
    },
    methods:{
        setDirty(){
            this.dirty=true;
        },
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    },
    filters:{
        arrayToString: (array) =>{
            var string = ''
            for (let i = 0; i < array.length; i++) {
                if (i>0){
                    string = string.concat("; ");
                }
                string = string.concat(String(array[i]));
            }
            return string
        }
    },
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

.dicomtag{
    padding-left:5px;
    padding-right:5px;
    width:100px;
}

.logic{
    padding-left:5px;
    padding-right:5px;
    width:100px;
}

.values{
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