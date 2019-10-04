<template>
    <div class="pageoverlay">

        <div class="overlaybox" v-if="showSelectorsList">  
            <div class="overlaytop">
                Current selectors
                <i class="fas fa-times pointer" @click="closeView"></i>
            </div>
            <div class="tablehead">
                <div class="tableheader w5">Id</div>
                <div class="tableheader w30">Name</div>
                <div class="tableheader w40">Description</div>
                <div class="tableheader w5">Status</div>
                <div class="tableheader w10"></div>
            </div>
            <div class="overlaycontent">
                <SelectorsRow v-for="selector in selectors" v-bind:selector="selector" :key="selector.id" v-on:updateSelectors="updateSelectors"></SelectorsRow>
            </div>
            <div class="overlayfooter">
                <button class="smbutton" @click="openImportSelector"><i class="fas fa-plus-square"></i> Import selector</button>
            </div>
        </div>
        
        <div class="overlaybox" v-if="showImportSelector">
            <div class="overlaytop">
                Import a selector
                <i class="fas fa-times pointer" @click="closeView"></i>
            </div>
            <div class="overlaycontent">
                import a zip file
            </div>
            <div class="overlayfooter">
                <button class="smbutton" @click="openSelectorList"><i class="fas fa-list"></i> Selectors</button>
            </div>
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
        showSelectorsList:true,
        showImportSelector:false
      }
  },
  methods:{
    closeView(){
      this.$emit('closeView','thanks')
    },
/*     forceRerender(){
      this.componentKey += 1;
    }, */
    openImportSelector(){
        this.showSelectorsList=false
        this.showImportSelector=true
    },
    openSelectorList(){
        this.showSelectorsList=true
        this.showImportSelector=false
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
