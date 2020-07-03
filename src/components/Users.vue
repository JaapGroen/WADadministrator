<template>
    <div class="pageoverlay">
        <div class="overlaybox">
            <div class="overlaytop">
                Users
                <router-link to="/" class="fas fa-times pointer" tag="i"></router-link>
            </div>
            <div class="overlayhead">
                <div class="id">Id</div>
                <div class="name">Name</div>
                <div class="email">Email</div>
                <div class="role">Role</div>
                <div class="status">Active</div>
                <div class="buttons"></div>
            </div>
            <div class="overlaycontent">
                <UsersRow v-for="user in users" v-bind:user="user" :key="user.id" v-on:updateUsers="updateUsers"></UsersRow>
                
            </div>
            <div class="overlayfooter">
                <div></div>
                <div>
                    <router-link to="/users/add" class="btn btn-small" tag="button"><i class="fas fa-plus-square"></i> Add user</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UsersRow from '@/components/UsersRow'
import {HTTP} from '@/main'

export default {
    props:[''],
    data(){
        return {
            users:[]
        }
    },
    mounted(){
        this.updateUsers()
    },
    methods:{
        updateUsers(){
            HTTP.get(this.apiURL+'/users').then(resp =>{
                this.users=resp.data.users
                this.loading=false
            })
        },
    },
    components:{
        UsersRow
    },
    computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
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

.name{
    padding-left:5px;
    padding-right:5px;
    flex:2 1 0;
}

.email{
    padding-left:5px;
    padding-right:5px;
    flex:3 1 0;
}

.role{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.status{
    padding-left:5px;
    padding-right:5px;
    flex:1 1 0;
}

.buttons{
    padding-left:5px;
    padding-right:5px;
    width:80px;
}
</style>