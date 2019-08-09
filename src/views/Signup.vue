<!--  -->
<template>
  <div>
    <van-cell-group>
      <van-field v-model="params.username" placeholder="请输入用户名" />
      <van-field v-model="params.password" placeholder="请输入密码" />
    </van-cell-group>
    <mu-button color="primary" @click="submit">注册</mu-button>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      params: { username: 'wangtao', password: '123456' }
    };
  },

  props: {},

  computed: {},

  created() {},

  mounted() {},

  watch: {},

  methods: {
    submit() {
      let obj = {D:'1111', v:1,v2:2,v3:3}
      let {D: deviceCode, ...valueTypes} = obj
      Object.keys(valueTypes).forEach(v=>{
        console.log(deviceCode, v);
        // axios.get('xxx',{params: {deviceCode, valueType: v}})
      })
      this.$http
        .signup(this.params)
        .then(res => {
          console.log(res);
        });
    }
  },

  components: {}
};
</script>

<style scoped lang="less"></style>
