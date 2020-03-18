<template>
  <div id="main">
    <h1>{{id}}</h1>
  </div>
</template>

<script>
    export default {
      name: "update",
      data(){
        return{
          id: ''
        }
      },
      mounted(){
        this.id = this.$route.params.id
      },
      methods:{
        //获取个人信息
        getuser(){

        },
      }
    }
</script>

<style scoped>

</style>
