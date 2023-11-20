interface IProps {
  newTaskInputValue: string;
  createNewTask: (e: any) => void;
  handleInputChange: (value: any) => void;
}

export const NewTaskForm = (props: IProps) => {
  return (
    <form onSubmit={props.createNewTask}>
      <input
        placeholder="Write a task here..."
        className="input input__lg"
        type="text"
        onChange={props.handleInputChange}
        value={props.newTaskInputValue}
      />
      <button className="btn btn__primary btn__lg" type="submit">
        Add
      </button>
    </form>
  );
};
