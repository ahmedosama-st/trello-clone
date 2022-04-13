<template>
  <div
    class="task"
    draggable="true"
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveElement($event, columnIndex, taskIndex)"
    @click="openTask(task)"
  >
    <span class="w-full flex-no-shrink font-bold">{{ task.name }}</span>
    <p class="w-full flex-no-shrink mt-1 text-sm" v-if="task.description">
      {{ task.description }}
    </p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
    moveElement: {
      type: Function,
      required: true,
    },
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const openTask = (task) => {
      router.push({ name: 'task', params: { id: task.id } });
    };

    const pickupTask = (e, taskIndex, fromColumnIndex) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';

      e.dataTransfer.setData('taskIndex', taskIndex);
      e.dataTransfer.setData('fromColumnIndex', fromColumnIndex);
      e.dataTransfer.setData('type', 'task');
    };

    return { openTask, pickupTask };
  },
};
</script>

<style lang="scss" scoped></style>
