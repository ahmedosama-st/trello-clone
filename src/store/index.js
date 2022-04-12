import defaultBoard from '@/default-board';
import { saveBoardState } from '@/utils';
import { v1 } from 'uuid';
import { createStore } from 'vuex';

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard;

export default createStore({
  plugins: [saveBoardState],

  state: {
    board,
  },

  getters: {
    board: (state) => state.board,
    getTask: (state) => (id) => {
      for (const column of state.board.columns) {
        for (const task of column.tasks) {
          if (task.id === id) {
            return task;
          }
        }
      }
    },
  },

  mutations: {
    CREATE_TASK(state, { column, name }) {
      state.board.columns[column].tasks.push({
        id: v1(),
        name,
        description: '',
      });
    },

    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: [],
      });
    },

    UPDATE_TASK(_, { task, key, value }) {
      task[key] = value;
    },

    MOVE_TASK(
      state,
      { fromColumnIndex, toColumnIndex, fromTaskIndex, toTaskIndex },
    ) {
      const task = state.board.columns[fromColumnIndex].tasks.splice(
        fromTaskIndex,
        1,
      )[0];
      state.board.columns[toColumnIndex].tasks.splice(toTaskIndex, 0, task);
    },

    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const column = state.board.columns.splice(fromColumnIndex, 1)[0];
      state.board.columns.splice(toColumnIndex, 0, column);
    },
  },

  actions: {
    addTask({ commit }, { column, name }) {
      commit('CREATE_TASK', { column, name });
    },

    addColumn({ commit }, { name }) {
      commit('CREATE_COLUMN', { name });
    },

    updateTask({ commit }, { task, key, value }) {
      commit('UPDATE_TASK', { task, key, value });
    },
    moveTask(
      { commit },
      { fromColumnIndex, toColumnIndex, fromTaskIndex, toTaskIndex },
    ) {
      commit('MOVE_TASK', {
        fromColumnIndex,
        toColumnIndex,
        fromTaskIndex,
        toTaskIndex,
      });
    },
    moveColumn({ commit }, { fromColumnIndex, toColumnIndex }) {
      commit('MOVE_COLUMN', { fromColumnIndex, toColumnIndex });
    },
  },
  modules: {},
});
