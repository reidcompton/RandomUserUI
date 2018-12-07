<template>
  <div class="home">
    <h1>Random User Demographics</h1>
    <People />
  </div>
</template>

<script>
// @ is an alias to /src
import People from '@/components/People.vue'

export default {
  name: 'home',
  components: {
    People
  }
}
</script>

<style>
h1 {
  margin-top:20px;
  font-size:2em;
}
</style>
