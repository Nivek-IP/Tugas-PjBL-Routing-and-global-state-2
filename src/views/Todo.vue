<template>
  <h3>To-Do ⏳</h3>
  <div>
    <ul>
      <li v-for="task in todoAndInProgress" :key="task.id" class="task-row">
        <div class="task-main">
          <span class="task-text" v-if="task.status === 'todo'">{{ task.text }}</span>
          <span class="task-text" v-else-if="task.status === 'inprogress'">{{ task.text }} — <strong>On-Progress</strong></span>

          <span v-if="task.deadline" class="deadline">⏳ {{ formatDeadline(task.deadline) }}</span>
        </div>

        <div class="task-actions">
          <button v-if="task.status === 'todo'" @click="moveToInProgress(task.id)">Start ▶️</button>
          <button v-else-if="task.status === 'inprogress'" @click="moveToCompleted(task.id)">Completed ✅</button>
        </div>
      </li>
    </ul>
  </div>
  <form @submit.prevent="storeTodo(todo)">
    <input v-model="todo.text" type="text" name="text" placeholder="Task description" />
    <input v-model="todo.date" type="date" name="date" />
    <input v-model="todo.time" type="time" name="time" />
    <button :disabled="!todo.text" type="submit">Add</button>
  </form>
</template>

<script>
import { mapState } from 'pinia';
import { useTodos } from '@/stores/todos';

export default {
  name: 'TodoView',
  computed: {
    ...mapState(useTodos, [
      'todoAndInProgress',
    ]),
  },
  data() {
    return {
      todo: {
        text: null,
        date: null,
        time: null,
        isCompleted: false,
      },
    };
  },
  methods: {
    storeTodo(payload) {
      const store = useTodos()
      // build ISO deadline from date+time (if provided)
      let deadline = null
      if (payload.date) {
        if (payload.time) {
          deadline = new Date(`${payload.date}T${payload.time}`).toISOString()
        } else {
          deadline = new Date(payload.date).toISOString()
        }
      }
      store.storeTodo({ text: payload.text, deadline })
      // reset form
      this.todo = { text: null, date: null, time: null, isCompleted: false }
    },
    updateTodo(payload) {
      const store = useTodos()
      store.updateTodo(payload)
    },
    moveToInProgress(id) {
      const store = useTodos()
      store.moveToInProgress(id)
    },
    moveToCompleted(id) {
      const store = useTodos()
      store.moveToCompleted(id)
    },
    destroyTodo(id) {
      const store = useTodos()
      store.destroyTodo(id)
    },
    formatDeadline(deadline) {
      const d = new Date(deadline)
      if (isNaN(d)) return deadline
      return d.toLocaleString()
    },
  },
};
</script>

<style scoped>
.task-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
.task-main {
  display: flex;
  gap: 12px;
  align-items: center;
}
.task-text {
  font-weight: 500;
}
.deadline {
  color: #6b6b6b;
  font-size: 0.9em;
  background: rgba(255, 240, 200, 0.35);
  padding: 2px 6px;
  border-radius: 4px;
}
.task-actions button {
  margin-left: 6px;
}
form input[type="date"], form input[type="time"] {
  margin-left: 6px;
}
</style>
