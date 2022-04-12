import defaultBoard from '@/default-board';
import { createStore } from 'vuex';

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard;

export default createStore({
  state: {
    board,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
