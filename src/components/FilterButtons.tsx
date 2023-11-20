import { e_filterSetting } from "../enums/e_filterSetting";

interface IProps {
  taskFilterSetting: e_filterSetting;
  changeTaskFilterSetting: (filterSetting: e_filterSetting) => void;
}

export const FilterButtons = (props: IProps) => {
  return (
    <div className="stack-small">
      <div className="c-cb">
        <input
          type="checkbox"
          checked={props.taskFilterSetting === e_filterSetting.all}
          onChange={() => props.changeTaskFilterSetting(e_filterSetting.all)}
        />
        <label className="todo-label">All</label>
      </div>
      <div className="c-cb">
        <input
          type="checkbox"
          checked={props.taskFilterSetting === e_filterSetting.todo}
          onChange={() => props.changeTaskFilterSetting(e_filterSetting.todo)}
        />
        <label className="todo-label">Todo</label>
      </div>
      <div className="c-cb">
        <input
          type="checkbox"
          checked={props.taskFilterSetting === e_filterSetting.done}
          onChange={() => props.changeTaskFilterSetting(e_filterSetting.done)}
        />
        <label className="todo-label">Done</label>
      </div>
    </div>
  );
};
