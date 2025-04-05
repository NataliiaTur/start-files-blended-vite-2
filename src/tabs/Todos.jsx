import FormComponent from '../components/FormComponent/FormComponent';
import Text from '../components/Text/Text';
import TodoList from '../components/TodoList/TodoList';
import { useState, useEffect } from 'react';

const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = window.localStorage.getItem('saved-todos');
    if (savedTodos !== null) {
      return JSON.parse(savedTodos);
    }
    return [
      { id: '1', text: 'Practice more' },
      { id: '2', text: 'Get all tasks done on time' },
    ];
  });

  const addNewTodo = newTodo => {
    setTodos(prevTodos => {
      return [...prevTodos, newTodo];
    });
  };

  const deleteTodo = todoId => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };

  useEffect(() => {
    if (todos.length > 0) {
      window.localStorage.setItem('saved-todos', JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <>
      <FormComponent addTodo={addNewTodo} />
      {todos.length > 0 ? (
        <TodoList todos={todos} onDelete={deleteTodo} />
      ) : (
        <Text textAlign="center">There are no any todos ...</Text>
      )}
    </>
  );
};

export default Todos;
