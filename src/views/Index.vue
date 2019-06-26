<!--  -->
<template>
  <div class="chinese-chess" style="position: relative;">
    <canvas
      style="display: block;width: 100vw;background: #d3c19a;"
      ref="chessboard"
    ></canvas>
    <div ref="pieces" class="pieces">
      <ul v-for="(xArr, y) in arrPoint" :key="y">
        <li
          v-for="(piece, x) in xArr"
          :key="x"
          :class="{
            black: piece[0] === '黑',
            red: piece[0] === '红',
            pitchOn: x === pitchOn.x && y === pitchOn.y
          }"
          @click="nextChess(y, x, piece)"
        >
          {{ piece[1] }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      arrPoint: Array.from(Array(10), (v, y) =>
        Array.from(Array(9), (k, x) => {
          // * 初始化棋子位置
          if (y === 0) return "红" + "車馬相仕帥仕相馬車"[x];
          if (y === 9) return "黑" + "車馬象士将士象馬車"[x];
          if (y === 2 && (x === 1 || x === 7)) return "红炮";
          if (y === 7 && (x === 1 || x === 7)) return "黑炮";
          if (y === 3 && x % 2 === 0) return "红兵";
          if (y === 6 && x % 2 === 0) return "黑卒";
          return "";
        })
      ),
      pitchOn: {}, // * 当前选中的棋子
      k1: { x: 4, y: 0 }, // * 红方帥位置
      k2: { x: 4, y: 9 }, // * 黑方将位置
      isRed: true // * 是否轮到红方走
    };
  },

  props: {},

  computed: {},

  created() {},

  mounted() {
    let chessboard = this.$refs.chessboard;
    // * 棋盘宽高：780*860
    chessboard.width = 780;
    chessboard.height = 860;
    let ctx = chessboard.getContext("2d");

    /**
     * # 外层盒子
     * * 与网格之间间隙：4
     * * 边框宽度：4（因为线的宽度是向两边延伸的，所以矩形宽高需要+4）
     * * 盒子宽高：宽 80*8 + 2*9 + 4*2 + 4 ==> 670 高 80*9 + 2*10  4*2 + 4 ==> 752
     * * 距顶部距离：(860 - 752)/2 ==> 54 距左：(780 - 670)/2 ==> 55
     */
    ctx.lineJoin = "round";
    ctx.lineWidth = 4; // * 线的宽度是向两边延伸的
    ctx.strokeStyle = "#2d241b"; // * 矩形描边
    ctx.strokeRect(55, 54, 670, 752);

    /**
     * # 绘制网格
     * * 与外层盒子之间间隙：4
     * * 起点：x 62 （55 + 4(间隙)+ 2(半边外层边框) + 1(第一条网格线的一半宽)） y 61
     * * 单个格子：80*80（不包括边框）
     * * 边框宽度：2
     * * 内部盒子宽高：宽 80*8 + 2*9 ==> 658 高 80*9 + 2*10 ==> 740
     */
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (
      let i = -1, l;
      ++i < 9; // * 竖线
      l = 61 + i * 82, ctx.moveTo(l, 61), ctx.lineTo(l, 801)
    );
    for (
      let i = -1, l;
      ++i < 10; // * 横线
      l = 62 + i * 82, ctx.moveTo(62, l), ctx.lineTo(720, l)
    );
    ctx.stroke();

    // * 绘制斜线
    ctx.beginPath();
    this.pointToPoint(3, 0, 5, 2, ctx);
    this.pointToPoint(5, 0, 3, 2, ctx);

    this.pointToPoint(3, 9, 5, 7, ctx);
    this.pointToPoint(5, 9, 3, 7, ctx);
    ctx.stroke();

    // * 河界
    ctx.clearRect(62, 391, 654, 80);
  },

  watch: {},

  methods: {
    // *
    nextChess(y, x, t) {
      let { x: _x, y: _y } = this.pitchOn;
      if (_x === undefined) {
        // * 判断是否选中过棋子
        // * 判断是否正确选中棋子
        if ((this.isRed && t[0] === "红") || (!this.isRed && t[0] === "黑"))
          return void (this.pitchOn = { x, y });
        else return;
      }
      let _t = this.arrPoint[_y][_x];
      if (_t[0] === t[0])
        // * 再次点击己方棋子，切换选中
        return void (this.pitchOn = { x, y });
      if (this.rule(x, y, t, _x, _y, _t)) {
        this.arrPoint[_y][_x] = "";
        this.$set(this.arrPoint[y], x, _t);
        if (t[1] === "帥" || t[1] === "将")
          // * 判断输赢
          return void alert(`对局结束，${_t[0]}方胜`);
        this.isRed = !this.isRed;
        this.pitchOn = {};
      }
    },
    // * 规则
    rule(x, y, t, _x, _y, _t) {
      // * 判断该棋子是否在对脸线上，同时移动的位置不是上下移动
      if (this.k1.x === this.k2.x && _x === this.k2.x && x !== _x) {
        // * 当对脸线上只有1颗棋子是，禁止左右移动
        if (
          this.pathPieces(this.k1.x, this.k1.y, this.k2.x, this.k2.y).length ===
          2
        )
          return false;
      }
      switch (_t[1]) {
        case "炮":
          if (y !== _y && x !== _x) return false; // * 只能直着走
          // * 判断路径和落点没有棋子时，进行落子
          if (this.pathPieces(x, y, _x, _y).length === 0 && !t) return true;
          // * 判断路径上只有1颗棋子且落点为敌方棋子时，进行落子
          if (this.pathPieces(x, y, _x, _y).length === 2 && t && t[0] !== _t[0])
            return true;
          break;

        case "車":
          if (y !== _y && x !== _x) return false;
          if (this.pathPieces(x, y, _x, _y).length === 0 && t[0] !== _t[0])
            return true;
          break;

        case "馬":
          if (Math.abs(y - _y) === 2 && Math.abs(x - _x) === 1) {
            if (y > _y && this.arrPoint[_y + 1][_x]) return false;
            else if (y < _y && this.arrPoint[_y - 1][_x]) return false;
            if (t[0] !== _t[0]) return true;
          }
          if (Math.abs(y - _y) === 1 && Math.abs(x - _x) === 2) {
            if (x > _x && this.arrPoint[_y][_x + 1]) return false;
            else if (x < _x && this.arrPoint[_y][_x - 1]) return false;
            if (t[0] !== _t[0]) return true;
          }
          break;

        case "相":
          if (Math.abs(y - _y) === 2 && Math.abs(x - _x) === 2) {
            // * 判断中间是否有棋子
            if (y > _y && x > _x && this.arrPoint[_y + 1][_x + 1]) return false;
            else if (y < _y && x < _x && this.arrPoint[_y - 1][_x - 1])
              return false;
            else if (y > _y && x < _x && this.arrPoint[_y + 1][_x - 1])
              return false;
            else if (y < _y && x > _x && this.arrPoint[_y - 1][_x + 1])
              return false;
            if (t[0] !== _t[0]) return true;
          }
          break;

        case "象":
          if (Math.abs(y - _y) === 2 && Math.abs(x - _x) === 2) {
            if (y > _y && x > _x && this.arrPoint[_y + 1][_x + 1]) return false;
            else if (y < _y && x < _x && this.arrPoint[_y - 1][_x - 1])
              return false;
            else if (y > _y && x < _x && this.arrPoint[_y + 1][_x - 1])
              return false;
            else if (y < _y && x > _x && this.arrPoint[_y - 1][_x + 1])
              return false;
            if (t[0] !== _t[0]) return true;
          }
          break;

        case "仕":
          if (y >= 0 && y <= 2 && x >= 3 && x <= 5) {
            // * 判断落点是否在田中
            if (Math.abs(y - _y) === 1 && Math.abs(x - _x) === 1) {
              // * 判断是否走斜线
              if (t[0] !== _t[0]) return true;
            }
          }
          break;

        case "士":
          if (y >= 7 && y <= 9 && x >= 3 && x <= 5) {
            if (Math.abs(y - _y) === 1 && Math.abs(x - _x) === 1) {
              if (t[0] !== _t[0]) return true;
            }
          }
          break;

        case "兵":
          if (_y <= 4 && x !== _x) return false; // * 未过河时不能两边走
          if (y !== _y && x !== _x) return false;
          if (y - _y !== 1 && Math.abs(x - _x) !== 1) return false;
          if (y >= _y && t[0] !== _t[0]) return true;
          break;

        case "卒":
          if (_y >= 5 && x !== _x) return false; // * 未过河时不能两边走
          if (y !== _y && x !== _x) return false;
          if (_y - y !== 1 && Math.abs(x - _x) !== 1) return false;
          if (_y >= y && t[0] !== _t[0]) return true;
          break;

        case "将":
          if (y !== _y && x !== _x) return false;
          if (Math.abs(y - _y) !== 1 && Math.abs(x - _x) !== 1) return false;
          if (y >= 7 && y <= 9 && x >= 3 && x <= 5 && t[0] !== _t[0]) {
            if (x === this.k1.x && !this.pathPieces(x, y, this.k1.x, this.k1.y))
              return false;
            if (t[0] !== _t[0]) return !!(this.k2 = { x, y });
          }
          break;

        case "帥":
          if (y !== _y && x !== _x) return false;
          if (Math.abs(y - _y) !== 1 && Math.abs(x - _x) !== 1) return false;
          if (y >= 0 && y <= 2 && x >= 3 && x <= 5 && t[0] !== _t[0]) {
            if (x === this.k2.x && !this.pathPieces(x, y, this.k2.x, this.k2.y))
              return false;
            if (t[0] !== _t[0]) return !!(this.k1 = { x, y });
          }
          break;

        default:
          break;
      }
      return false;
    },
    // * 画线段（可使用其画网格）
    pointToPoint(x, y, _x, _y, ctx) {
      ctx.moveTo(62 + x * 82, 61 + y * 82);
      ctx.lineTo(62 + _x * 82, 61 + _y * 82);
    },
    pathPieces(x, y, _x, _y) {
      // * 获取路径上的棋子
      let max,
        min,
        pieces = "";
      if (y === _y) {
        x > _x ? ((max = x), (min = _x)) : ((max = _x), (min = x));
        for (let i = min; ++i < max; pieces += this.arrPoint[y][i]);
      }
      if (x === _x) {
        y > _y ? ((max = y), (min = _y)) : ((max = _y), (min = y));
        for (let i = min; ++i < max; pieces += this.arrPoint[i][x]);
      }
      return pieces;
    }
  },

  components: {}
};
</script>

<style scoped lang="less">
.pieces {
  position: absolute;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  width: 100vw;
  height: 100%;
  background: transparent;
  // background: #fff;
  left: 0;
  top: 0;
  ul {
    flex: none;
    display: flex;
    width: 100vw;
    justify-content: center;
    height: 80px;
  }
  li {
    flex: none;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    line-height: 80px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
  }
  .black {
    // color: #fafafa;
    border: 1px solid black;
    color: black;
    background: #d3c19a;
  }
  .red {
    // color: #fafafa;
    border: 1px solid red;
    color: red;
    background: #d3c19a;
  }
  .pitchOn {
    box-shadow: 0px 0px 4px 4px rgba(146, 84, 222, 0.6);
  }
}
</style>
