<template>
  <h3>In Progress ▶️</h3>
  <div>
    <ul>
      <li v-for="task in inProgressTodos" :key="task.id">
        {{ task.text }}
        <div>
          <small v-if="task.deadline">Due: {{ formatDeadline(task.deadline) }}</small>
        </div>
        <button @click="moveToCompleted(task.id)">Finish ✅</button>
        <button @click="moveToTodo(task.id)">Back ↩️</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useTodos } from '@/stores/todos';

export default {
  name: 'InProgressView',
  computed: {
    ...mapState(useTodos, [
      'inProgressTodos'
    ])
  },
  methods: {
    moveToCompleted(id) {
      const store = useTodos()
      store.moveToCompleted(id)
    },
    moveToTodo(id) {
      const store = useTodos()
      store.moveToTodo(id)
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
