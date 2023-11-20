import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

interface IProps {
  id: string;
  name: string;
  completed: boolean;
  inverseTaskCompletion: (id: string) => void;
  editTaskName: (id: string, taskName: string) => void;
  deleteTask: (id: string) => void;
}

export const Task = (props: IProps) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const handleInputChange = (value: any) => {
    setNewName(value.target.value);
  };

  function handleSubmit() {
    props.editTaskName(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small">
      <div className="form-group">
        <input
          id={props.id}
          className="todo-text"
          type="text"
          onChange={handleInputChange}
          defaultValue={props.name}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn__primary todo-edit"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          checked={props.completed}
          onChange={() => props.inverseTaskCompletion(props.id)}
        />
        <label
          style={{
            fontSize: "large",
            textDecoration: props.completed ? "line-through" : "",
          }}
          className="label__lg"
          htmlFor={props.id}
        >
          {props.name}
        </label>
      </div>
      <div>
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          <CiEdit />
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );

  return <li>{isEditing ? editingTemplate : viewTemplate}</li>;
};
