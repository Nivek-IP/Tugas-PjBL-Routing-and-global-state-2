<template>
  <h3>Completed ✅</h3>
  <div>
      <ul>
        <li v-for="completedTodo in completedTodos" :key="completedTodo.id">
          {{ completedTodo.text }}
          <div>
            <small v-if="completedTodo.deadline">Due: {{ formatDeadline(completedTodo.deadline) }}</small>
          </div>
          <button @click="moveToInProgress(completedTodo.id)">Reopen ▶️</button>
          <button @click="destroyTodo(completedTodo.id)">  Remove 🗑️ </button>
        </li>
      </ul>
    </div>
</template>

<script>
import { mapState } from 'pinia';
import { useTodos } from '@/stores/todos';

export default {
  name: 'CompletedView',
  computed: {
    ...mapState(useTodos, [
      'completedTodos',
    ])
  }
  ,
  methods: {
    destroyTodo(id) {
      const store = useTodos()
      // Prefer the store action if available, otherwise mutate state directly as a fallback.
      if (store && typeof store.destroyTodo === 'function') {
        store.destroyTodo(id)
        return
      }

      // Fallback: remove todo from the array directly
      const index = store.todos.findIndex(item => item.id == id)
      if (index > -1) {
        store.todos.splice(index, 1)
      }
    }
    ,
    moveToInProgress(id) {
      const store = useTodos()
      store.moveToInProgress(id)
    }
    ,
    formatDeadline(deadline) {
      const d = new Date(deadline)
      if (isNaN(d)) return deadline
      return d.toLocaleString()
    }
  }
}
</script>
