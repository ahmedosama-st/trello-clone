<template>
  <div class="board">
    <div class="flex flex-row place-items-start">
      <div class="column flex">
        <input
          type="text"
          class="p-2 mr-2 flex-grow"
          placeholder="Add new column"
          v-model="newColumnName"
          @keyup.enter="addColumn"
        />
      </div>

      <BoardColumn
        v-for="(column, $columnIndex) in board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :moveElement="moveElement"
      />
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="closeTask">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useGetters } from 'vuex-composition-helpers/dist';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BoardColumn from '@/components/BoardColumn';
import useMoveElement from '@/composables/useMoveElement';
export default {
  components: { BoardColumn },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { board } = useGetters(['board']);
    const newColumnName = ref('');

    const isTaskOpen = computed(() => route.name === 'task');
    const closeTask = () => {
      router.push({ name: 'home' });
    };
    const addColumn = () => {
      store.dispatch('addColumn', {
        name: newColumnName.value,
      });

      newColumnName.value = '';
    };

    const moveElement = (e, toColumnIndex, toTaskIndex) => {
      return useMoveElement(e, toColumnIndex, toTaskIndex, store);
    };

    return {
      board,
      isTaskOpen,
      closeTask,
      addColumn,
      moveElement,
      newColumnName,
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
