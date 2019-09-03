<template>
  <div class>
    <h1>Products</h1>
    <h2>{{ idz }}</h2>
  </div>
</template>

<script>
const products = {
  18: "Shoes",
  26: "T-shirts",
  27: "Pants"
};
export default {
  props: ["idz"],
  computed: {
    id() {
      return products[this.$route.params.idz];
      //   return products[this.$route.query.id];
    }
  }
};
</script>

<style>
</style>
