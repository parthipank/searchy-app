<template>
  <div>
    <form>
      <label for="entity">Search Entity </label>
      <select id="entity" v-on:change="entityChanged" class="termbox">
        <option value="users">Users</option>
        <option value="organizations">Organizations</option>
        <option value="tickets">Tickets</option>
      </select>
      <label for="term"> Search Term</label>
      <select id="term" v-on:change="termChanged" class="termbox">
        <option v-for="data in optionData" :value="data" v-bind:key="data">{{
          data
        }}</option>
      </select>
      <input
        class="termbox"
        type="text"
        name="searchvalue"
        id="searchvalue"
        v-model="search_value"
      />
      <button type="submit" class="btn" v-on:click="onSearch">Search</button>
    </form>
  </div>
</template>

<script>
import { users_terms, organizations_terms, tickets_terms } from "../store";
export default {
  name: "Search",
  data() {
    return {
      users_terms,
      organizations_terms,
      tickets_terms,
      optionData: users_terms,
      entity_value: "users",
      term_value: "_id",
      search_value: "",
    };
  },
  methods: {
    entityChanged(e) {
      if (e.target.value === "organizations") {
        this.optionData = organizations_terms;
        this.entity_value = "organizations";
      }
      if (e.target.value === "tickets") {
        this.optionData = tickets_terms;
        this.entity_value = "tickets";
      }
      if (e.target.value === "users") {
        this.optionData = users_terms;
        this.entity_value = "users";
      }
    },
    termChanged(e) {
      this.term_value = e.target.value;
    },
    onSearch(e) {
      e.preventDefault();
      const searchData = {
        entity: this.entity_value,
        term: this.term_value,
        search: this.search_value,
      };
      this.$emit("search", searchData);
    },
  },
};
</script>

<style scoped>
.btn {
  height: 40px;
  width: 100px;
  color: white;
  background-color: tomato;
}
.termbox {
  padding: 10px;
  margin: 10px;
  font-size: 15px;
}
</style>
