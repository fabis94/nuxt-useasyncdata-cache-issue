<template>
  <div>
    Foo value: {{ data?.foo }}
  </div>
</template>
<script setup lang="ts">
const {data} = useAsyncTest()
</script>