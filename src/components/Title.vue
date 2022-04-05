<template>
  <div>
    <div class="title-page">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    name: String
  }
}
</script>

<style lang="scss">
@import "../assets/main.css";
#app {
  .title-page{
    font-family: 'Oswald-Medium',sans-serif;
    font-size: 44px;
    line-height: 148%;
    margin: 50px 0 30px 0;

  }
}

</style>