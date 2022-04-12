<template>
  <div
    class="column"
    @drop="moveElement($event, columnIndex)"
    draggable="true"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickupColumn($event, columnIndex)"
  >
    <div class="flex items-center mb-2 font-bold">
      {{ column.name }}
    </div>
    <div class="list-reset">
      <ColumnTask
        v-for="(task, $taskIndex) in column.tasks"
        :key="$taskIndex"
        :task="task"
        :taskIndex="$taskIndex"
        :columnIndex="columnIndex"
        :moveElement="moveElement"
      />

      <input
        type="text"
        class="block p-2 w-full bg-transparent border-2 border-gray-300 rounded-lg"
        placeholder="Add a task..."
        @keyup.enter="addTask($event, columnIndex)"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import ColumnTask from '@/components/ColumnTask';
export default {
  components: { ColumnTask },
  props: {
    column: {
      type: Object,
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
    const route = useRoute();
    const router = useRouter();

    const addTask = (event, column) => {
      store.dispatch('addTask', {
        column,
        name: event.target.value,
      });

      event.target.value = '';
    };

    const pickupColumn = (e, fromColumnIndex) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';

      e.dataTransfer.setData('fromColumnIndex', fromColumnIndex);
      e.dataTransfer.setData('type', 'column');
    };
    return { addTask, pickupColumn };
  },
};
</script>
