export function saveBoardState(store) {
  store.subscribe((mutation, state) => {
    localStorage.setItem('board', JSON.stringify(state.board));
  });
}
