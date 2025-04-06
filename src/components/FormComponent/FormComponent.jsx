import { FiSearch } from 'react-icons/fi';
import css from './FormComponent.module.css';
import { Formik, Form, Field } from 'formik';
import { nanoid } from 'nanoid';

const initialValues = {
  search: '',
};

const FormComponent = ({ addTodo, onPhotoSubmit }) => {
  const onSubmit = (values, actions) => {
    const trimmed = values.search.trim();
    if (trimmed === '') return;

    if (addTodo) {
      addTodo({
        text: trimmed,
        id: nanoid(3),
      });
    }

    if (onPhotoSubmit) {
      onPhotoSubmit(trimmed);
    }

    actions.resetForm();
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className={css.form}>
          <button className={css.button} type="submit">
            <FiSearch size="16px" />
          </button>
          <Field
            className={css.input}
            placeholder="What do you want to write?"
            name="search"
            required
            autoFocus
          />
        </Form>
      </Formik>
    </div>
  );
};

export default FormComponent;
