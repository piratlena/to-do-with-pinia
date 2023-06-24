<template>
  <form @submit.prevent="createTask">
    <input
      type="text"
      placeholder="I need to"
      v-model="newTask"
      @input="newTask"
    />
    <button @click="createTask">Add</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../store/store";

export default {
  setup() {
    const taskStore = useTaskStore();
    const newTask = ref("");

    const createTask = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          id: Date.now(),
          taskTitle: newTask.value,
          isFavorite: false,
        });
        newTask.value = "";
      }
    };
    return { createTask, newTask };
  },
};
</script>

<style lang="scss" scoped></style>
