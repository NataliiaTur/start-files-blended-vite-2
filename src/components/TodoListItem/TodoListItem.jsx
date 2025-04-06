// import { DiVim } from 'react-icons/di';
// import { HiH3 } from 'react-icons/hi2';
import css from './TodoListItem.module.css';
import Text from '../Text/Text';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

const TodoListItem = ({ todo, onDelete, onEdit }) => {
  return (
    <div className={css.box}>
      <Text textAlign="center" marginBottom="20">
        TODO#{todo.id}
      </Text>
      <Text>{todo.text}</Text>
      <button
        className={css.deleteButton}
        type="button"
        onClick={() => {
          onDelete(todo.id);
        }}
      >
        <RiDeleteBinLine size={24} />
      </button>
      <button
        className={css.editButton}
        type="button"
        onClick={() => onEdit(todo)}
      >
        <RiEdit2Line size={24} />
      </button>
    </div>
  );
};

export default TodoListItem;
