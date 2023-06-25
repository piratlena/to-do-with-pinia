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
      v-if="loading"
    >
      Loading tasks
    </div>

    <div
      class="task-list"
      v-if="filter === 'all'"
    >
      <p>You have {{ totalCount }} tasks left to do</p>
      <div
        v-for="task in tasks"
        :key="task.id"
      >
        <TaskDetails :task="task" />
      </div>
    </div>

    <div
      class="task-list"
      v-if="filter === 'favorites'"
    >
      <p>Favorite tasks {{ favCount }}</p>
      <div
        v-for="task in favorites"
        :key="task.id"
      >
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">reset</button>
  </main>
</template>

<script>
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import TaskDetails from "./components/TaskDetails.vue";
import { useTaskStore } from "./store/store";
import { storeToRefs } from "pinia";
export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore();

    const { tasks, loading, favorites, totalCount, favCount } =
      storeToRefs(taskStore);

    taskStore.getTasks();
    const filter = ref("all");
    return {
      taskStore,
      filter,
      tasks,
      loading,
      favorites,
      totalCount,
      favCount,
    };
  },
};
</script>

<style scoped></style>
