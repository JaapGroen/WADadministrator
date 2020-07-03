<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Selector {{selector.id}}
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div v-if="!loading" class="overlaycontent">
                <div class="tablerow">
                    <div class="key">
                        Name
                    </div>
                    <div class="value">
                        <input type="text" class="textbox fullwidth" v-model=selector.name @change="setDirty">
                    </div>
                    <div class="buttons"></div>
                </div>
                <div class="tablerow">
                    <div class="key">
                        Description
                    </div>
                    <div class="value">
                        <input type="text" class="textbox fullwidth" v-model=selector.description @change="setDirty">
                    </div>
                    <div class="buttons"></div>
                </div>
                <div class="tablerow">
                    <div class="key">
                        Manual input
                    </div>
                    <div class="value">
                        <select class="selectbox" v-model="selector.manual_input" @change="setDirty">
                            <option value="false">NO</option>
                            <option value="true">YES</option>
                        </select>
                    </div>
                    <div class="buttons"></div>
                </div>
                <div class="tablerow">
                    <div class="key">
                        Active
                    </div>
                    <div class="value">
                        <select class="selectbox" v-model="selector.isactive" @change="setDirty">
                            <option value="false">NO</option>
                            <option value="true">YES</option>
                        </select>
                    </div>
                    <div class="buttons"></div>
                </div> 
                <div class="tablerow">
                    <div class="key">
                        Config
                    </div>
                    <div class="value">
                        <select class="selectbox" v-model="selector.id_config" @change="setDirty">
                            <option v-for="config in configs" :value="config.id">{{config.description}}</option>
                        </select>
                    </div>
                    <div class="buttons">
                        <router-link :to="{name:'config',params:{id:selector.id_config}}" class="btn btn-small" tag="button">
                            <i class="fas fa-cogs"></i> Config
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="overlayfooter">
                <div>
                    <button class="btn btn-small" @click="$router.go(-1)"><i class="fas fa-list"></i> Back</button>
                </div>
                <div>

                </div>
                <div>

                    <button class="btn btn-small" v-if="dirty" @click="saveSelector"><i class="far fa-save"></i> Save</button>
                </div>
            </div>
        </div>      
    </div>
  </div>
</template>

<script>
import {HTTP} from '@/main'

export default { 
    props:[''],
    data(){
        return {
            dirty:false,
            loading:true,
            selector:{},
            configs:[]
        }
    },
    created(){
        this.getSelector()
    },
    methods:{
        getSelector(){
            HTTP.get(this.apiURL+'/selectors/'+this.$route.params.id).then((resp)=>{
                this.selector = resp.data.selector
                HTTP.get(this.apiURL+'/configs').then((resp)=>{
                    this.configs = resp.data.configs
                    this.loading = false
                })
            })
        },
        setDirty(){
            this.dirty = true;
        },
        saveSelector(){
            let formData = new FormData();
            formData.append('name',this.selector.name);
            formData.append('description',this.selector.description);
            formData.append('manual_input',this.selector.manual_input);
            formData.append('isactive',this.selector.isactive);
            formData.append('id_config',this.selector.id_config);
            HTTP.put(this.apiURL+'/selectors/'+this.selector.id,formData,{
                headers: {'Content-Type':'multipart/form-data'}
            }).then((resp)=>{
                this.$router.push("/selectors")
            })
            .catch(function(error){
                console.log(error)
                console.log('error?')
            })   
        }
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    },
    mounted(){
    },
    components:{
    }
}


</script>


<style scoped>
.key{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.value{
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
