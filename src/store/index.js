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

    UPDATE_TASK(_, { task, key, value }) {
      task[key] = value;
    },

    MOVE_TASK(state, { fromColumnIndex, toColumnIndex, taskIndex }) {
      const task = state.board.columns[fromColumnIndex].tasks.splice(
        taskIndex,
        1,
      )[0];
      state.board.columns[toColumnIndex].tasks.push(task);
    },
  },

  actions: {
    addTask({ commit }, { column, name }) {
      commit('CREATE_TASK', { column, name });
    },

    updateTask({ commit }, { task, key, value }) {
      commit('UPDATE_TASK', { task, key, value });
    },
    moveTask({ commit }, { fromColumnIndex, toColumnIndex, taskIndex }) {
      commit('MOVE_TASK', { fromColumnIndex, toColumnIndex, taskIndex });
    },
  },
  modules: {},
});
