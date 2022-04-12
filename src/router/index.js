import Board from '@/views/Board';
import Task from '@/views/Task';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Board,
    children: [
      {
        path: 'task/:id',
        name: 'task',
        component: Task,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
