<template lang="pug">
  section.main-app
    input(
      class='add-input'
      type='text'
      autofocus='autofocus'
      placeholder='接下来要做什么？'
      @keyup.enter='addTodo'
    )
    m-item(
      v-for="todo in filterTodos"
      :todo="todo"
      :key="todo.id"
      @remove="removeItem"
    )
    m-tab(
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    )
</template>

<script>
  import MItem from './item.vue'
  import MTab from './tabs.vue'
  let id = 0;
  export default {
    components: {
      MItem,
      MTab
    },
    data() {
      return {
        todos: [],
        filter: 'all',
        text: ''
      }
    },
    computed: {
      filterTodos() {
        if (this.filter === 'all') {
          return this.todos;
        }
        const isCompleted = this.filter === 'completed';
        return this.todos.filter(todo => isCompleted === todo.completed);
      }
    },
    methods: {
      addTodo(e) {
        if(/^\s*$/.test(e.target.value)) return;
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        });
        e.target.value = '';
      },
      toggleFilter(state) {
        this.filter = state;
      },
      removeItem(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      clearAllCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .main-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
    .add-input
      position: relative;
      margin: 0;
      width: 100%;
      font-size: 24px;
      font-family: inherit;
      font-weight: inherit;
      line-height: 1.4em;
      border: 0;
      outline: none;
      color: inherit;
      box-sizing: border-box;
      font-smoothing: antialiased;
      padding: 16px 16px 16px 60px;
      border: none;
      box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
</style>