<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Input for process 
                <i class="fas fa-times pointer" @click="openView('Nothing')"></i>
            </div>
            <div class="overlayhead">
                <div class="name">Name</div>
                <div class="input">input</div>
                <div class="buttons"></div>
            </div>
            <div class="overlaycontent">
                <InputRow v-for="input in inputdata.data.inputs" v-bind:input="input" :key="input.id"  
                    v-on:openView="openView">
                </InputRow>
                <div class="tablerow submit">
                    <button class="btn btn-submit" @click="submitInput">Save input</button>
                </div>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="openView(inputdata.source)"><i class="fas fa-list"></i> Back</button>
                </div>
                <div></div>
                <div></div>
            </div>
        </div>      
    </div>
</template>

<script>
import {HTTP} from '../main'
import InputRow from '@/components/InputRow'

export default {
    props:['inputdata'],
    data(){
        return {
            componentKey: 0,
            
        }
    },
    created(){
    },
    methods:{
        openView(View){
            this.$emit('openView',{target:View})
        },
        submitInput(){
            let formData = new FormData();
            this.inputdata.data.inputs.forEach((input)=>{
                formData.append(input.name,input.val)

            })
            HTTP.post(this.apiURL+'/processes/'+this.inputdata.data.process.id+'/input',formData,{
                headers: {'Content-Type':'multipart/form-data'}
            }).then(resp => {
                if (resp.data.success){
                    console.log(resp.data.msg)
                } else {
                    this.msg = resp.data.msg
                }
            },error =>{
                this.msg = error
            })
        },       
    },
    components:{
        InputRow,
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    },
}


</script>


<style scoped>
.name{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.input{
    padding-left:5px;
    padding-right:5px;
    flex:1 0 0;
}

.desc{
    padding-left:5px;
    padding-right:5px;
    width:1 0 0;
}


.buttons{
    padding-left:5px;
    padding-right:5px;
    width:80px;
}

.submit{
    display:flex;
    justify-content:center;
    padding-top:10px;
    padding-bottom:10px;
}
</style>


