<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
.fl {
  float: left;
}

.fr {
  float: right;
}

/*css为clearfix，清除浮动*/
.clearfix::before,
.clearfix::after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1; /*IE/7/6*/
}
/*单行溢出*/
.one-txt-cut {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/*多行溢出 手机端使用*/
.txt-cut {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* -webkit-line-clamp: 2; */
  -webkit-box-orient: vertical;
}
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>
