<template>
  <div class="hello">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'MessageComponent',
  props: {
    msg: String
  }
}
</script>


<style scoped>
p {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
