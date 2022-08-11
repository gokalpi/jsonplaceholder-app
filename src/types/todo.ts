import type User from './user';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User;
};

export default Todo;
