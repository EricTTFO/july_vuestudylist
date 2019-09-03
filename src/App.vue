<template>
  <div id="app">
    <List/>
    <router-link to="/">Home</router-link> -
    <router-link to="/about">About</router-link>-
    <router-link to="/products">products</router-link>-
    <router-view/>
    <ToduInput @submit="addTodo" />
    <ul>
      <ToduItem
        v-for="(todo,idx) in todos"
        :data="todo"
        :key="idx"
        @click.native="removeTodo(idx)"
      />
    </ul>
    <hr>
  </div>
</template>

<script>
import List from "./components/List";
import ToduInput from "./components/ToduInput";
import ToduItem from "./components/ToduItem";
export default {
  name: "app",
  data() {
    return {
      todos: []
    };
  },
  methods: {
    addTodo(text) {
      this.todos.push(text);
    },
    removeTodo(idx) {
      this.todos.splice(idx, 1);
    }
  },
  components: {
    ToduInput,
    ToduItem,
    List
  }
};
</script>

<style>
html body {
  margin: 0;
  padding: 0;
}
</style>
