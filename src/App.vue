<script setup lang="ts">
import TrafficCanvas from "./components/TrafficCanvas.vue"
import StatisticsChart from "./components/StatisticsChart.vue"

import {
  cars,
  passedCars,
  northCount,
  southCount,
  eastCount,
  westCount
} from "./store/trafficStore"
</script>

<template>

  <h1>智能交通灯控制系统</h1>
  <button @click="location.reload()">
  开始测试
</button>
  <div class="panel">

    <div>
      当前车辆：
      {{ cars.length }}
    </div>

    <div>
      已通过：
      {{ passedCars }}
    </div>

  </div>

  <TrafficCanvas />

  <StatisticsChart />

</template>

<style scoped>

.panel{
  display:flex;
  gap:30px;
  margin-bottom:20px;
}

</style>