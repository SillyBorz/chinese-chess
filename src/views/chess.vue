<!--  -->
<template>
  <div>
    <ul v-for="(xArr, y) in arrPoint" :key="y">
      <li
        v-for="(piece, x) in xArr"
        :key="x"
        :class="{
          black: piece[0] === '黑',
          red: piece[0] === '红',
          pitchOn: x === pitchOn.x && y === pitchOn.y
        }"
      >
        <!-- {{ piece[1] }} -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'chess',
  data () {
    return {
      pitchOn: {},
      arrPoint: Array.from(Array(10), (v, y) =>
        Array.from(Array(9), (k, x) => {
          // * 初始化棋子位置
          if (y === 0) return '红' + '車馬相仕帥仕相馬車'[x];
          if (y === 9) return '黑' + '車馬象士将士象馬車'[x];
          if (y === 2 && (x === 1 || x === 7)) return '红炮';
          if (y === 7 && (x === 1 || x === 7)) return '黑炮';
          if (y === 3 && x % 2 === 0) return '红兵';
          if (y === 6 && x % 2 === 0) return '黑卒';
          return '';
        })
      ),
    }
  },

  props: { },

  computed: { },

  created () { 
    var ws = new WebSocket("ws://192.168.1.211:3001");
    ws.onopen = function(){
      // * WebSocket已连接上，使用 send()方法发送数据
      ws.send({type: 'open', data: {
        type: 0,// * 新开对局|继续对局|对战中
        roomId: '',// * 房间id
        red: '',// * 红方
        black: '',// * 黑方
        guard: [],// * 观战
        chess: [],// * 棋局
        step: [],// * 步骤
        // * 当前谁走，from哪里，
      }});
    };
  },

  mounted () { },

  watch: { },

  methods: {

  },

  components: { }
}
</script>

<style scoped lang="less">

</style>
