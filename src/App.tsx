import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { NewTodoForm } from './components/NewTodoForm';
import { Todo } from './types/todo';
import { NewTodo } from './types/newTodo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const maxId = Math.max(...todos.map(todo => todo.id));

  const addTodo = (newTodo: NewTodo) => {
    const todo: Todo = {
      id: maxId,
      title: newTodo.title,
      userId: newTodo.userId,
      completed: false,
    };

    setTodos(current => [...current, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodoForm users={usersFromServer} onSubmit={addTodo} />
      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
