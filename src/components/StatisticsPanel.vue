<script setup lang="ts">

defineProps<{

passed:number

congestion:number

avg:number

}>()

</script>

<template>

<div>

<h3>统计信息</h3>

<p>已通行车辆：{{passed}}</p>

<p>拥堵指数：{{congestion}}</p>

<p>平均等待：{{avg}} 秒</p>

</div>

</template>