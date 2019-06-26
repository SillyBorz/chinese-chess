<!--  -->
<template>
  <div class="signin">
    <form 
      action="/api/signin"
      @submit="submit"
      class="form">
      <input class="input" type="text">
      <input class="input" type="password">
      <button @click="submit">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "signin",
  data() {
    return {};
  },

  props: {},

  computed: {},

  created() {
    this.$http.signup({username: 'wangtao', password: '123456'})
    .then(res=>{
      console.log(res);
    })
    this.$http.signin('5d0ca09b6d720807345c0611')
    .then(res=>{
      console.log(res);
    })
  },

  mounted() {
    
  },

  watch: {},

  methods: {
    submit(e){

    }
  },

  components: {}
};
</script>

<style scoped lang="less">
.form{
  display: block;
  width: 500px;
  margin: 0 auto;
  .input{
    
  }
}
</style>
