<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Rules of selector "{{selector.name}}"
                <i class="fas fa-times pointer" @click="openView('Nothing')"></i>
            </div>
            <div class="overlaycontent" v-if="selector" @mouseleave="leave()" @mouseover="enter()">
                <div class="overlayhead">
                        <div class="id">id</div>
                        <div class="dicomtag">dicomtag</div>
                        <div class="logic">logic</div>
                        <div class="values">value(s)</div>
                        <div class="buttons"></div>
                </div>         
                <SelectorsRulesRow v-for="rule in rules" v-bind:rule="rule" :key="rule.id">
                </SelectorsRulesRow>
                <div v-if="showAdd" class="tablerow">
                    <div class="id">-</div>
                    <div class="dicomtag">
                        <input type="text" class="textbox" v-model=newRule.dicomtag @change="setDirty()"/>
                    </div>
                    <div class="logic">
                        <select class="selectbox" v-model="newRule.logic" @change="setDirty()">
                            <option v-for="option in options" :value="option">{{option}}</option>
                        </select>
                    </div>
                    <div class="values">
                        <input type="text" class="textbox" v-model=newRule.values @change="setDirty()" placeholder="Seperate values with ;"/>
                    </div>
                </div>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="openView('SelectorsList')">
                        <i class="fas fa-list"></i>
                        Selectors
                    </button>
                </div>
                <div>
                    {{msg}}
                </div>
                <div>
                    <button v-if="!showAdd" class="btn btn-small" @click="addRule"><i class="fas fa-plus-square"></i> Add rule</button>
                    <button v-if="showAdd" class="btn btn-small" @click="cancel">Cancel</button>
                    <button v-if="showAdd" class="btn btn-small" @click="saveRule"><i class="far fa-save"></i> Save rule</button>
                    <button v-if="selectedRules.length>0" class="btn btn-small" @click="deleteRules"><i class="fas fa-trash-alt"></i> Delete rule(s)</button>
                </div>
            </div>
        </div>      
    </div>
  </div>
</template>

<script>
import {HTTP} from '@/main'
import SelectorsRulesRow from '@/components/SelectorsRulesRow'

export default { 
  props:['selector'],
  data(){
      return {
        msg:'',
        hover:false,
        dirty:false,
        rules:[],
        newRule:{},
        showAdd: false,
        options:['equals','contains','starts with','ends with','is empty','not contains','not equals','is not empty']
      }
  },
    methods:{
        loadRules(){
            HTTP.get(this.apiURL+'/selectors/'+this.selector.id+'/rules').then(resp =>{
                this.rules = resp.data.rules
                this.rules.forEach((rule)=>{
                    this.$set(rule, 'selected', false)
                })
            })  
        },
        openView(View){
            this.$emit('openView',View)
        },
        enter(){
            this.hover=true;
        },
        leave(){
            this.hover=false;
        },
        setDirty(){
            this.dirty=true;
        },
        saveRule(){
            let formData = new FormData();
            formData.append('dicomtag',this.newRule.dicomtag)
            formData.append('logic',this.newRule.logic)
            formData.append('values',this.newRule.values)
            HTTP.post(this.apiURL+'/selectors/'+this.selector.id+'/rules',formData,{
                headers: {'Content-Type':'multipart/form-data'}
            }).then((resp)=>{
                this.newRule = {}
                this.loadRules()
                this.showAdd = false
            })
            .catch(function(){
                console.log('error?')
            })   
        },
        deleteRules(){
            this.selectedRules.forEach((rule)=>{
                HTTP.delete(this.apiURL+'/selectors/'+this.selector.id+'/rules/'+rule.id)
                .then(resp => {
                    this.loadRules()
                })
            })
        },
        addRule(){
            this.showAdd = true
        },
        cancel(){
            this.showAdd=false
            this.newRule={}
        },
        toggleRule(rule){
            for (let i=0;i<this.rules.length;i++){
                if(this.rules[i].id == rule.id){
                    rule.selected = !rule.selected
                    this.rules.splice(i,1,rule)
                }
            }
        },
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        },
        selectedRules(){
            return _.filter(this.rules, {selected:true})
        },
    },
    mounted(){
        this.loadRules()
    },
    components:{
        SelectorsRulesRow
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
