import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ todos, onDelete, onEdit }) => {
  return (
    <Grid>
      {todos.map(todo => (
        <GridItem key={todo.id}>
          <TodoListItem todo={todo} onDelete={onDelete} onEdit={onEdit} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TodoList;
