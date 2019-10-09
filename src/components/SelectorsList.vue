<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Current selectors
                <i class="fas fa-times pointer" @click="closePopup"></i>
            </div>
            <div class="tablehead">
                <div class="tableheader w5">Id</div>
                <div class="tableheader w30">Name</div>
                <div class="tableheader w40">Description</div>
                <div class="tableheader w5">Status</div>
                <div class="tableheader w10"></div>
            </div>
            <div class="overlaycontent">
                <SelectorsRow v-for="selector in selectors" v-bind:selector="selector" :key="selector.id" v-on:updateSelectors="updateSelectors" v-on:responseMessage="responseMessage"></SelectorsRow>
            </div>
            <div class="overlayfooter">
                <button class="smbutton" @click="openImport"><i class="fas fa-plus-square"></i> Import selector</button>
                {{msg}}
            </div>
        </div>      
    </div>
</template>

<script>
import SelectorsRow from '@/components/SelectorsRow'


export default {
  props:['selectors'],
  data(){
      return {
        msg:'',
        componentKey: 0,
        apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
      }
  },
    methods:{
        responseMessage(msg){
            this.msg=msg;
        },
        closePopup(){
            this.$emit('closePopup','thanks')
        },
        openImport(){
            this.$emit('openImport','thanks')
        },
        updateSelectors(){
            this.$emit('updateSelectors','thanks')
        },
    },
  components:{
      SelectorsRow,
  },
}


</script>


<style>
</style>
