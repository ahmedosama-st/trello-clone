export default function useMoveElement(e, toColumnIndex, toTaskIndex, store) {
  const fromTaskIndex = parseInt(e.dataTransfer.getData('taskIndex'));
  const fromColumnIndex = parseInt(e.dataTransfer.getData('fromColumnIndex'));
  const type = e.dataTransfer.getData('type');

  if (type === 'task') {
    store.dispatch('moveTask', {
      fromColumnIndex,
      toColumnIndex,
      fromTaskIndex,
      toTaskIndex,
    });
  } else {
    store.dispatch('moveColumn', {
      fromColumnIndex,
      toColumnIndex,
    });
  }
}
