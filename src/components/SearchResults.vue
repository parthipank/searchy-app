<template>
  <div class="wrapper">
    <div
      class="item"
      v-for="(item, name) in searchResultItem"
      v-bind:key="item + name"
    >
      <p class="result-data">
        <b>{{ name }}</b> : {{ item }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResults",
  props: ["searchResultItem"],
};
</script>

<style scoped>
.item {
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
}
.wrapper {
  text-align: left;
  background: lightgrey;
  border-color: lightslategrey;
  margin-left: 50px;
  margin-right: 50px;
}
</style>
