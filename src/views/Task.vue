<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow place-items-start justify-between px-4">
      <input
        type="text"
        class="p-2 w-full mr-2 block text-xl font-bold"
        :value="task.name"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      />
      <textarea
        class="relative w-full bg-gray-100 px-2 mt-2 h-64 border-2 border-gray-300 rounded-lg leading-normal"
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
        @keyup.enter="updateTaskProperty($event, 'description')"
      />
    </div>
  </div>
</template>

<script>
import { useGetters } from 'vuex-composition-helpers/dist';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const { getTask } = useGetters(['getTask']);

    const task = getTask.value(route.params.id);

    const updateTaskProperty = (e, key) => {
      const value = e.target.value;
      store.dispatch('updateTask', { task, key, value });
    };

    return {
      task,
      updateTaskProperty,
    };
  },
};
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white bottom-0 left-0 top-0 right-0 mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
