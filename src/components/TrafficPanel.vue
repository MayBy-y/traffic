<script setup lang="ts">

defineProps<{

state:string

count:number

}>()

</script>

<template>

<div class="panel">

<h3>交通信息</h3>

<p>当前状态：{{state}}</p>

<p>车辆数量：{{count}}</p>

</div>

</template>

<style scoped>

.panel{
padding:20px;
border:1px solid #ccc;
}

</style>