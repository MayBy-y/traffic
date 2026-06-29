<script setup lang="ts">
import * as echarts from "echarts"
import { onMounted, ref } from "vue"
import { cars, passedCars } from "../store/trafficStore"

const chartRef = ref<HTMLDivElement>()

onMounted(() => {

  const chart = echarts.init(chartRef.value!)

  setInterval(() => {

    chart.setOption({

      title: {
        text: "交通流量统计"
      },

      tooltip: {},

      xAxis: {
        type: "category",
        data: [
          "当前车辆",
          "已通行"
        ]
      },

      yAxis: {
        type: "value"
      },

      series: [
        {
          type: "bar",
          data: [
            cars.value.length,
            passedCars.value
          ]
        }
      ]
    })

  }, 1000)

})
</script>

<template>
  <div
    ref="chartRef"
    style="
      width:600px;
      height:400px;
    "
  />
</template>