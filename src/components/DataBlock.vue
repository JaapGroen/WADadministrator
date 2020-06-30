<template>
    <router-link to="/datasets" class="block" tag="div">
        <div class="item_title bgc0">Datasets</div>

        <div class="item_content">
            Datasets in the database 
        </div>

        <div class="item_footer">
            Open menu to load datasets 
        </div>
    </router-link>
</template>


<script>
 import {HTTP} from '../main'

 export default {
    data(){
        return {
        }
    },
    created(){
    },
    methods:{
    },
    computed:{
    },
    components:{
    }
}
</script>

<style scoped>

</style>