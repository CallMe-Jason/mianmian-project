<template>
  <div class="list">
    <p>学科试题数量排名</p>
    <div class="text">
      <div class="cor cur">1</div>
      <span>前端</span>
      <span>5234</span>
    </div>
     <div class="text">
      <div class="cor cur">2</div>
      <span>JAVA</span>
      <span>3210</span>
    </div>
     <div class="text">
      <div class="cor cur">3</div>
      <span>大数据</span>
      <span>1294</span>
    </div>
     <div class="text">
      <div class="cor">4</div>
      <span>C++</span>
      <span>1001</span>
    </div>
     <div class="text">
      <div class="cor">5</div>
      <span>UI</span>
      <span>934</span>
    </div>
     <div class="text">
      <div class="cor">6</div>
      <span>php</span>
      <span>856</span>
    </div>
     <div class="text">
      <div class="cor">7</div>
      <span>python</span>
      <span>403</span>
    </div>
     <div class="text">
      <div class="cor">8</div>
      <span>测试</span>
      <span>122</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang='less' scoped>
.text {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}
.cor {
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #000;
  vertical-align: middle;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ccc;
  }
.cur {
  color: #fff;
  background-color: #000;
}
</style>
