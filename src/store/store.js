import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  getters: {
    favorites() {
      return this.tasks.filter((task) => task.isFavorite);
    },
    favCount() {
      return this.tasks.reduce((quantity, cur) => {
        return cur.isFavorite ? quantity + 1 : quantity;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      try {
        this.loading = true;
        const response = await fetch("http://localhost:3000/tasks");
        const data = await response.json();
        this.tasks = data;
        this.loading = false;
      } catch (e) {
        alert("Ooops! Something went wrong");
      }
    },
    async addTask(task) {
      this.tasks.push(task);
      try {
        const response = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          body: JSON.stringify(task),
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        alert("Oooops!Something went wrong");
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((task) => {
        return task.id !== id;
      });
      try {
        const response = await fetch("http://localhost:3000/tasks/" + id, {
          method: "DELETE",
        });
      } catch (e) {
        alert("Oooops!Something went wrong");
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((task) => task.id === id);
      task.isFavorite = !task.isFavorite;

      try {
        const response = await fetch("http://localhost:3000/tasks", {
          method: "PATCH",
          body: JSON.stringify({ isFavorite: task.isFavorite }),
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        alert("Oooops!Something went wrong");
      }
    },
  },
});
