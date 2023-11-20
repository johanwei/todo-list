import { useState } from "react";
import { ITask } from "../interfaces/ITask";
import { Task } from "./Task";
import { e_filterSetting } from "../enums/e_filterSetting";
import { NewTaskForm } from "./NewTaskForm";
import { FilterButtons } from "./FilterButtons";

export const TodoList = () => {
  const LOCAL_STORAGE_KEY = "localStorageKey";
  const [tasks, setTasks] = useState<ITask[]>(getTasksFromLocalStorage());
  const [newTaskInputValue, setNewTaskInputValue] = useState("");
  const [taskFilterSetting, setTaskFilterSetting] = useState(
    e_filterSetting.all
  );

  const FILTER_OPTIONS = {
    All: () => true,
    Done: (task: ITask) => task.completed,
    Todo: (task: ITask) => !task.completed,
  };

  // Creates a list of Task-JSX-elements based on the current list of task and filter settings.
  const taskList = tasks
    .filter(FILTER_OPTIONS[taskFilterSetting])
    .map((task) => (
      <Task
        id={task.id}
        name={task.name}
        completed={task.completed}
        inverseTaskCompletion={inverseTaskCompletion}
        editTaskName={editTaskName}
        deleteTask={deleteTask}
        key={task.id}
      />
    ));

  function createNewTask(e: any) {
    e.preventDefault();
    if (!newTaskInputValue) {
      return;
    }
    const newId = crypto.randomUUID().toString();

    const currentTasks = [
      ...tasks,
      {
        id: newId,
        name: newTaskInputValue,
        completed: false,
      },
    ];

    updateLocalStorageAndState(currentTasks);
    setNewTaskInputValue("");
  }

  function editTaskName(id: string, newName: string) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });

    updateLocalStorageAndState(editedTaskList);
  }

  function deleteTask(id: string) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    updateLocalStorageAndState(remainingTasks);
  }

  function inverseTaskCompletion(id: string) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    updateLocalStorageAndState(updatedTasks);
  }

  function updateLocalStorageAndState(tasks: ITask[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    setTasks(tasks);
  }

  function changeTaskFilterSetting(setting: e_filterSetting) {
    setTaskFilterSetting(setting);
  }

  function handleInputChange(value: any) {
    setNewTaskInputValue(value.target.value);
  }

  function getTasksFromLocalStorage(): ITask[] {
    const tasksFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (tasksFromLocalStorage) {
      return JSON.parse(tasksFromLocalStorage);
    }

    return [];
  }

  const numberOfTasksRemaining = () => {
    const tasksNotCompleted = tasks.filter((task: ITask) => task.completed);
    return `${tasksNotCompleted.length}/${tasks.length} tasks completed`;
  };

  return (
    <div className="todoapp">
      <h1>Todos @Montel</h1>
      <NewTaskForm
        newTaskInputValue={newTaskInputValue}
        createNewTask={createNewTask}
        handleInputChange={handleInputChange}
      />
      <FilterButtons
        taskFilterSetting={taskFilterSetting}
        changeTaskFilterSetting={changeTaskFilterSetting}
      />
      <label className="label__lg">
        {tasks.length > 0 && numberOfTasksRemaining()}
      </label>
      <ul className="todo-list stack-large stack-exception">{taskList}</ul>
    </div>
  );
};
