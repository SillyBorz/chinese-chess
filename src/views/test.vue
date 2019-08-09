<!--  -->
<template>
  <div>
    <mu-button color="primary" @click="b">更新</mu-button>
    <mu-button color="primary" @click="$router.push({name: 'index'})">进入详情</mu-button>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
    }
  },

  props: { },

  computed: { },

  created () { 
  },

  mounted () { },

  watch: { },

  methods: {
    b(){
      this.$http.updataUserInfo( this.id,{sex: 1, realName: '唐诗'})
      .then(res=>{
        console.log(res);
      })
    }
  },

  components: { }
}
</script>

<style scoped lang="less">

</style>
