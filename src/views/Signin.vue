<!--  -->
<template>
  <div class="signin">
    <van-cell-group>
      <van-field v-model="params.username" placeholder="请输入用户名" />
      <van-field v-model="params.password" placeholder="请输入密码" />
    </van-cell-group>
    <mu-button color="primary" @click="submit">登录</mu-button>
  </div>
</template>

<script>
export default {
  name: 'signin',
  data() {
    return {
      params: {
        username: 'wangtao11',
        password: '123456'
      }
    };
  },

  props: {},

  computed: {},

  created() {
    /* this.$http.signup({username: 'wangtao', password: '123456'})
    .then(res=>{
      console.log(res);
    }) */
  },

  mounted() {},

  watch: {},

  methods: {
    submit() {
      // let sha256 = require("js-sha256").sha256;
      // let md5 = require('js-md5');
      // let password = md5(sha256(this.params.password));
      this.$http.signin(this.params).then(res => {
        if (res.code>0) {
          this.$router.push({name: 'test'})
          sessionStorage.setItem('token', res.data)
        }
      });
    }
  },

  components: {}
};
</script>

<style scoped lang="less">
.form {
  display: block;
  width: 500px;
  margin: 0 auto;
  .input {
  }
}
</style>
