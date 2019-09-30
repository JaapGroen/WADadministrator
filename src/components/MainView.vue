<template>
  <div class="fullpage">
    <Navbar></Navbar>
    <div class="grid">
      <SelectorsBlock></SelectorsBlock>
      <UsersBlock></UsersBlock>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import SelectorsBlock from '@/components/SelectorsBlock'
import UsersBlock from '@/components/UsersBlock'

export default{
  data(){
    return{
    }
  },
  components:{
    Navbar,
    SelectorsBlock,
    UsersBlock
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
