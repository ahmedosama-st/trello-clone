<template>
  <button type="button" class="button" :class="typeCalsses">
    <slot />
  </button>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    type: {
      type: String,
    },
  },

  setup(props) {
    const typeClasses = computed(() => {
      switch (props.type) {
        case 'danger':
          return 'bg-red';
        default:
          return 'bg-teal';
      }
    });

    return {
      typeClasses,
    };
  },
};
</script>

<style lang="css" scoped>
.button {
  @apply inline-flex px-4 py-2 text-white font-bold rounded items-center;
}
</style>
