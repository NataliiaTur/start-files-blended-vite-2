import css from './EditForm.module.css';
import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import { useRef } from 'react';

const EditForm = ({ updateTodo, cancelUpdate, defaultValue }) => {
  const inputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const updatedText = inputRef.current.value.trim();

    if (updatedText === '') return;

    updateTodo(updatedText);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <button className={css.submitButton} type="submit">
        <RiSaveLine color="green" size="16px" />
      </button>

      <button className={css.editButton} type="button" onClick={cancelUpdate}>
        <MdOutlineCancel color="red" size="16px" />
      </button>

      <input
        className={css.input}
        placeholder="What do you want to write?"
        name="text"
        required
        defaultValue={defaultValue}
        autoFocus
        ref={inputRef}
      />
    </form>
  );
};

export default EditForm;
