import { v4 } from 'uuid';

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: v4(),
          userAssigned: null,
        },
        {
          description: '',
          name: 'second task',
          id: v4(),
          userAssigned: null,
        },
        {
          description: '',
          name: 'and thrid',
          id: v4(),
          userAssigned: null,
        },
      ],
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: v4(),
          userAssigned: null,
        },
      ],
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: v4(),
          userAssigned: null,
        },
      ],
    },
  ],
};
