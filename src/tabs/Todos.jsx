import EditForm from '../components/EditForm/EditForm';
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

  // !============= Завдання із зірочкою ===============
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  // Функція для перевірки дублікатів
  const findTodo = text => {
    return todos.some(todo => todo.text.toLowerCase() === text.toLowerCase());
  };
  // Форма редагування Відкрити
  const handleEditTodo = todo => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };
  // Скасувати редагування
  const cancelUpdate = () => {
    setIsEditing(false);
    setCurrentTodo({});
  };
  // Оновити todo
  const updateTodo = newText => {
    if (findTodo(newText)) {
      alert('Todo with this text already exists!');
      return;
    }

    const updatedTodos = todos.map(todo =>
      todo.id === currentTodo.id ? { ...todo, text: newText } : todo
    );

    setTodos(updatedTodos);
    setIsEditing(false);
    setCurrentTodo({});
  };

  return (
    <>
      {isEditing ? (
        <EditForm
          updateTodo={updateTodo}
          cancelUpdate={cancelUpdate}
          defaultValue={currentTodo.text}
        />
      ) : (
        <FormComponent addTodo={addNewTodo} />
      )}
      {todos.length > 0 ? (
        <TodoList todos={todos} onDelete={deleteTodo} onEdit={handleEditTodo} />
      ) : (
        <Text textAlign="center">There are no any todos ...</Text>
      )}
    </>
  );
};

export default Todos;
