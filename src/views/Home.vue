<template>
  <div id="app">
    <Header />
    <Search v-on:search="onSearch" />
    <div
      v-for="(searchResultItem, index) in searchResults"
      v-bind:key="searchResultItem + index"
    >
      <SearchResults v-bind:searchResultItem="searchResultItem" />
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
import SearchResults from "../components/SearchResults";
import organizations from "../store/organizations.json";
import users from "../store/users.json";
import tickets from "../store/tickets.json";

export default {
  name: "Home",
  components: {
    Search,
    SearchResults,
  },
  data() {
    return {
      organizations,
      tickets,
      users,
      searchResults: [],
    };
  },
  methods: {
    onSearch(searchData) {
      this.searchResults = [];
      if (searchData.entity == "organizations") {
        organizations.map((org) => {
          if (
            searchData.term === "domain_names" ||
            searchData.term === "tags"
          ) {
            org[searchData.term].map((item) => {
              if (item.toString() === searchData.search) {
                this.tickUsers(tickets, users, org);
              }
            });
          }
          if (
            org[searchData.term].toString() &&
            org[searchData.term].toString() === searchData.search
          ) {
            this.tickUsers(tickets, users, org);
          }
        });
      }
      if (searchData.entity == "tickets") {
        tickets.map((ticket) => {
          if (searchData.term === "tags") {
            ticket[searchData.term].map((item) => {
              if (item.toString() === searchData.search) {
                this.orgUsers(organizations, users, ticket);
              }
            });
          }
          if (
            ticket[searchData.term].toString() &&
            ticket[searchData.term].toString() === searchData.search
          ) {
            this.orgUsers(organizations, users, ticket);
          }
        });
      }
      if (searchData.entity == "users") {
        users.map((user) => {
          if (searchData.term === "tags") {
            user[searchData.term].map((item) => {
              if (item.toString() === searchData.search) {
                this.tickOrgs(tickets, organizations, user);
              }
            });
          }
          if (
            user[searchData.term] &&
            user[searchData.term].toString() === searchData.search
          ) {
            this.tickOrgs(tickets, organizations, user);
          }
        });
      }
      if (this.searchResults.length === 0) {
        alert("No Search Results, Make your search key precise");
      }
    },
    tickUsers(tickets, users, org) {
      let tempObj = {};

      tempObj["name"] = org.name;
      tempObj["url"] = org.url;
      tempObj["external_id"] = org.external_id;
      tempObj["domain_names"] = org.details.toString();
      tempObj["created_at"] = org.created_at;
      tempObj["details"] = org.details;
      tempObj["shared_tickets"] = org.shared_tickets.toString();
      tempObj["tags"] = org.tags.toString();

      let t = 0;
      tickets.map((ticket) => {
        if (ticket.organization_id === org._id) {
          tempObj["ticket_" + t] = ticket.subject;
          t++;
        }
      });

      let u = 0;
      users.map((user) => {
        if (user.organization_id === org._id) {
          tempObj["user_" + u] = user.name;
          u++;
        }
      });
      this.searchResults.push(tempObj);
    },
    orgUsers(organizations, users, ticket) {
      let tempObj = {};
      tempObj["subject"] = ticket.subject;
      tempObj["url"] = ticket.url;
      tempObj["external_id"] = ticket.external_id;
      tempObj["type"] = ticket.type;
      tempObj["description"] = ticket.description;
      tempObj["priority"] = ticket.priority;
      tempObj["status"] = ticket.status;
      tempObj["tags"] = ticket.tags.toString();
      tempObj["has_incidents"] = ticket.has_incidents.toString();
      tempObj["due_at"] = ticket.due_at;
      tempObj["via"] = ticket.via;

      organizations.map((org) => {
        if (ticket.organization_id === org._id) {
          tempObj["Organization Name"] = org.name;
        }
      });

      users.map((user) => {
        if (user._id === ticket.assignee_id) {
          tempObj["Assignee Name"] = user.name;
        }
        if (user._id === ticket.submitter_id) {
          tempObj["Submitter Name"] = user.name;
        }
      });
      this.searchResults.push(tempObj);
    },
    tickOrgs(tickets, organizations, user) {
      let tempObj = {};

      tempObj["name"] = user.name;
      tempObj["alias"] = user.alias;
      tempObj["external_id"] = user.external_id;
      tempObj["role"] = user.role;
      tempObj["signature"] = user.signature;
      tempObj["suspended"] = user.suspended.toString();
      tempObj["verified"] = user.verified.toString();
      tempObj["active"] = user.active.toString();
      tempObj["tags"] = user.tags.toString();
      tempObj["url"] = user.url;

      tickets.map((ticket) => {
        if (user._id === ticket.assignee_id) {
          tempObj["Assignee Ticket"] = ticket.subject;
        }
        if (user._id === ticket.submitter_id) {
          tempObj["Submitter Ticket"] = ticket.subject;
        }
      });

      organizations.map((org) => {
        if (user.organization_id === org._id) {
          tempObj["Organization Name"] = org.name;
        }
      });
      this.searchResults.push(tempObj);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}
</style>
