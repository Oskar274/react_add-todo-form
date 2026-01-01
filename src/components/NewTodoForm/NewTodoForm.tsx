import { useState } from 'react';
import { User } from '../../types/user';
import { NewTodo } from '../../types/newTodo';
type Props = {
  users: User[];
  onSubmit: (todo: NewTodo) => void;
};

export const NewTodoForm: React.FC<Props> = ({ users, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [id, setId] = useState(3);

  const onSubmitEvent = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      title,
      userId,
    });

    setId(id + 1);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={onSubmitEvent}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          onChange={event => setTitle(event.target.value)}
        />
        <span className="error">Please enter a title</span>
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={event => setUserId(Number(event.target.value))}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <span className="error">Please choose a user</span>
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
