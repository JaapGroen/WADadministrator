<template>
  <div id="app">
    <link rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <router-view></router-view>
  </div>
</template>

<script>
import store from '@/store/store'
import router from '@/router'
import {HTTP} from './main'

export default {
    name: 'app',
    data(){
        return{
        }
    },
    created(){
        HTTP.interceptors.response.use((response) => {
            // return response
            if (response.status === 200 || response.status === 201){
                return Promise.resolve(response)
            } else {
                return Promise.reject(response)
            }
        },(error)=>{
            if (error.response.config.url.includes('github')){
                return Promise.reject(error.response)
            }
            if (error.response.status === 401 || error.response.status === 422){
                store.dispatch('logout').then(()=>{
                    router.push('/login')
                })
            }
        })
    }
}
</script>

<style>
html, body{
    margin: 0;
    height: 100%;
    min-height: 100%;
    font-family: 'Roboto', sans-serif;
    color:#FFFFFF;
    background-color: #0c111b;
}

.bgc3{background:#d8513f;}
.bgc2{background:#eab63e;}
.bgc1{background:#58a55c;}
.bgc0{background:#4a89e8;}
.c3{color:#d8513f;}
.c2{color:#eab63e;}
.c1{color:#58a55c;}
.c0{color:#4a89e8;}

i{
    padding-right:5px;
    cursor:pointer;
}

/* block css*/
.block{
  height:250px;
  width:250px;
  margin: 20px;
  display:flex;
  flex-direction:column;
}

.item_title{
  height:40px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding-left: 15px;
  padding-right: 15px;
  display:flex;
  align-items:center;
}

.item_content{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around;
  height:190px;
  background:#141a26;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  text-align:center;
}

.item_footer{
  display:flex;
  align-items:center;
  padding-left:20px;
  padding-right:20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background:#323b47;
  height:30px;
  font-size:12px;
}



/* general popup css */
.pageoverlay{
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  background-color:rgba(0, 0, 0, 0.5);
  height:100%;
  width:100%;
  z-index:75;
  position:fixed;
  top:0px;
  left:0px;
}

.overlaybox{
  display:flex;
  flex-direction:column;
  height:70%;
  width:70%;
  box-sizing: border-box;
  align-items:center;
  justify-content:center;
}

.overlaytop{
  height:50px;
  width:100%;
  background:#323b47;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding: 15px;
  display:flex;
  flex-direction:row;
  box-sizing: border-box;
  justify-content:space-between;
  align-items:center;
}

.overlayhead{
  display:flex;
  flex-direction:row;
  width:100%;
  background:#323b47;
  align-items:center;
}

.overlaycontent{
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:center;
  max-height:calc(100% - 80px);
  background:#141a26;
  box-sizing: border-box;
  position: relative;
  overflow-y:auto;
  flex-wrap:wrap;
}

.overlayfooter{
  display:flex;
  justify-content:space-between;
  align-items:center;
  box-sizing: border-box;
  padding-left:20px;
  padding-right:20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background:#323b47;
  min-height:30px;
  font-size:12px;
  width:100%;
}

.tablerow{
  display:flex;
  flex-direction:row;
  width:100%;
  min-height:40px;
  align-items:center;
}

.tablerow:nth-child(even){
    background-color: #0c111b;
}

.tablerow:nth-child(odd){
    background:#101622;
}

/* general form input style*/
.btn{
    border-radius: 5px;
    border: none;
    cursor:pointer;
    
    margin-right:2px;
    margin-left:2px;
}

.btn-small{
    font-size: 10px;  
    height:20px;
    background-color:#acb3bf;
}

.btn-submit{
    font-size: 15px;
    height:30px;
    width:70%;
    background-color:#ffffff;
}

.btn-large{
    font-size: 15px;
    height:30px;
    background-color:#acb3bf;
}

.textbox{
    border:none;
    background-color:#323b47;
    width:100%;
    height:25px;
    border-bottom:3px solid #3c6eb9;
    color:white;
    font-family: 'Roboto', sans-serif;
    border-radius: 5px;
}

.selectbox{
    border:none;
    background-color:#323b47;
    width:100%;
    height:30px;
    border-bottom:3px solid #3c6eb9;
    color:white;
    font-family: 'Roboto', sans-serif;
    border-radius: 5px;
}

.filterselect{
    border:none;
    background-color:#323b47;
    width:100%;
    height:25px;
    border-bottom:3px solid #3c6eb9;
    color:white;
    font-family: 'Roboto', sans-serif;
    border-radius: 5px;
}

.filterbox{
    border:none;
    background-color:#323b47;
    width:100%;
    height:20px;
    border-bottom:3px solid #3c6eb9;
    color:white;
    font-family: 'Roboto', sans-serif;
    border-radius: 5px;
}
</style>