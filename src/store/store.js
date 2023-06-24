import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      { id: 1, taskTitle: "Work on Projects", isFavorite: true },
      { id: 2, taskTitle: "Listhen to music", isFavorite: false },
      { id: 3, taskTitle: "Being cool", isFavorite: false },
      { id: 4, taskTitle: "Sit back and relax", isFavorite: false },
    ],
  }),
  getters: {
    favorites() {
      return this.tasks.filter((task) => task.isFavorite);
    },
    favCount() {
      return this.tasks.reduce((quantity, cur) => {
        quantity.isFavorite ? quantity + 1 : quantity;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
});
