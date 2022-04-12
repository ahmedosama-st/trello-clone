<template>
  <div class="board">
    <div class="flex flex-row place-items-start">
      <div
        class="column"
        v-for="(column, $columnIndex) in board.columns"
        :key="$columnIndex"
        @drop="moveTask($event, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            class="task"
            v-for="(task, $taskIndex) in column.tasks"
            :key="$taskIndex"
            draggable="true"
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            @click="openTask(task)"
          >
            <span class="w-full flex-no-shrink font-bold">{{ task.name }}</span>
            <p
              class="w-full flex-no-shrink mt-1 text-sm"
              v-if="task.description"
            >
              {{ task.description }}
            </p>
          </div>

          <input
            type="text"
            class="block p-2 w-full bg-transparent border-2 border-gray-300 rounded-lg"
            placeholder="Add a task..."
            @keyup.enter="addTask($event, $columnIndex)"
          />
        </div>
      </div>
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="closeTask">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useGetters } from 'vuex-composition-helpers/dist';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { board } = useGetters(['board']);

    const isTaskOpen = computed(() => route.name === 'task');
    const openTask = (task) => {
      router.push({ name: 'task', params: { id: task.id } });
    };
    const closeTask = () => {
      router.push({ name: 'home' });
    };
    const addTask = (event, column) => {
      store.dispatch('addTask', {
        column,
        name: event.target.value,
      });

      event.target.value = '';
    };
    const pickupTask = (e, taskIndex, fromColumnIndex) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';

      e.dataTransfer.setData('taskIndex', taskIndex);
      e.dataTransfer.setData('fromColumnIndex', fromColumnIndex);
    };
    const moveTask = (e, toColumnIndex) => {
      const taskIndex = parseInt(e.dataTransfer.getData('taskIndex'));
      const fromColumnIndex = parseInt(
        e.dataTransfer.getData('fromColumnIndex'),
      );

      store.dispatch('moveTask', {
        fromColumnIndex,
        toColumnIndex,
        taskIndex,
      });
    };

    return {
      board,
      isTaskOpen,
      openTask,
      closeTask,
      addTask,
      pickupTask,
      moveTask,
    };
  },
};
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-800 no-underline;
}

.column {
  @apply bg-gray-300 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-800 h-full overflow-auto;
}

.task-bg {
  @apply absolute bottom-0 left-0 top-0 right-0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
