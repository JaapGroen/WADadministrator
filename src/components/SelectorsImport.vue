<template>
    <div class="pageoverlay">
        <div class="overlaybox">  
            <div class="overlaytop">
                Import zipped selector(s)
                <i class="fas fa-times pointer" @click="closePopup"></i>
            </div>
            <div class="overlaycontent">
                some upload field...
            </div>
            <div class="overlayfooter">
                <button class="smbutton" @click="openList"><i class="fas fa-list"></i> Selectors</button>
                {{msg}}
            </div>
        </div>      
    </div>
  </div>
</template>

<script>

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
        openList(){
            this.$emit('openList','thanks')
        },
    },
    components:{
    },
}


</script>


<style>
</style>
