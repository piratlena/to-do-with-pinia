<template>
  <div class="task">
    <h3>{{ task.taskTitle }}</h3>
    <div class="icons">
      <i class="material-icons">delete</i>
      <i class="material-icons">favorite</i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["task"],
};
</script>

<style lang="scss" scoped></style>
