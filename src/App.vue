<template>
  <main>
    <header>
      <img
        src="./assets/pinia-logo.svg"
        alt=""
      />
      <h1>Pinia tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favorites'">Favorites</button>
    </nav>

    <div
      class="loading"
      v-if="taskStore.loading"
    >
      Loading tasks
    </div>

    <div
      class="task-list"
      v-if="filter === 'all'"
    >
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div
        v-for="task in taskStore.tasks"
        :key="task.id"
      >
        <TaskDetails :task="task" />
      </div>
    </div>

    <div
      class="task-list"
      v-if="filter === 'favorites'"
    >
      <p>Favorite tasks {{ taskStore.favCount }}</p>
      <div
        v-for="task in taskStore.favorites"
        :key="task.id"
      >
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import TaskDetails from "./components/TaskDetails.vue";
import { useTaskStore } from "./store/store";
export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore();

    taskStore.getTasks();
    const filter = ref("all");
    return { taskStore, filter };
  },
};
</script>

<style scoped></style>
