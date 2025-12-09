import { defineStore } from "pinia"

export const useTodos = defineStore('useTodos', {
  state: () => ({
    nextId: 0,
    todos: [],
  }),
  getters: {
    // todos in 'todo' stage (To-Do)
    pendingTodos: (state) => {
      return state.todos.filter(todo => (todo.status ? todo.status === 'todo' : !todo.isCompleted))
    },
    // combined for the To-Do list view: show both todo and inprogress so items remain visible after Start
    todoAndInProgress: (state) => {
      return state.todos.filter(todo => todo.status === 'todo' || todo.status === 'inprogress')
    },
    // todos currently in progress
    inProgressTodos: (state) => {
      return state.todos.filter(todo => todo.status === 'inprogress')
    },
    // todos in 'completed' stage
    completedTodos: (state) => {
      return state.todos.filter(todo => todo.status === 'completed' || todo.isCompleted)
    }
  },
  actions: {
    storeTodo(payload) {
      this.todos.push({ id: this.nextId++, text: payload.text, status: 'todo', deadline: payload.deadline || null })
    },
    updateTodo(payload) {
      const index = this.todos.findIndex(item => item.id == payload.id)
      if (index != -1) {
        // allow updating text and status
        this.todos[index] = { ...this.todos[index], ...(payload.text !== undefined ? { text: payload.text } : {}), ...(payload.status ? { status: payload.status } : {}), ...(payload.deadline ? { deadline: payload.deadline } : {}) }
      }
    },
    // move a todo to in-progress
    moveToInProgress(id) {
      const index = this.todos.findIndex(item => item.id == id)
      if (index > -1) this.todos[index].status = 'inprogress'
    },
    // move a todo to completed
    moveToCompleted(id) {
      const index = this.todos.findIndex(item => item.id == id)
      if (index > -1) this.todos[index].status = 'completed'
    },
    // move a todo back to todo
    moveToTodo(id) {
      const index = this.todos.findIndex(item => item.id == id)
      if (index > -1) this.todos[index].status = 'todo'
    },
    destroyTodo(id) {
      const index = this.todos.findIndex(item => item.id == id)

      if (index > -1 && index < this.todos.length) {
        this.todos.splice(index, 1)
      }
    },


  }
})

export default useTodos
