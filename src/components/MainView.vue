<template>
  <div class="fullpage">
    <Navbar></Navbar>
    <div class="grid">
      <SelectorsBlock></SelectorsBlock>
      <UsersBlock></UsersBlock>
      <ModulesBlock></ModulesBlock>
      <ServicesBlock></ServicesBlock>
      <ProcessesBlock></ProcessesBlock>
      <DataBlock></DataBlock>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import SelectorsBlock from '@/components/SelectorsBlock'
import ServicesBlock from '@/components/ServicesBlock'
import UsersBlock from '@/components/UsersBlock'
import ModulesBlock from '@/components/ModulesBlock'
import ProcessesBlock from '@/components/ProcessesBlock'
import DataBlock from '@/components/DataBlock'

export default{
  data(){
    return{
    }
  },
  components:{
    Navbar,
    SelectorsBlock,
    UsersBlock,
    ModulesBlock,
    ServicesBlock,
    ProcessesBlock,
    DataBlock
  },
  computed:{
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
  },
}

</script>

<style>

.fullpage{
  width:100%;
  height:100%
}

.grid{
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  top:100px;
  height:calc(100% - 100px);
  overflow: auto;
  position:fixed;
  width:100%;
}


</style>
