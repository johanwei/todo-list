import { useEffect, useId, useState } from "react"
import { ITask } from "../interfaces/ITask"
import { Task } from "./Task"

interface IProps {
}

const initialTasks: ITask[] = [
    {
        id: "1",
        name: "Task 1",
        completed: false
    },
    {
        id: "2",
        name: "Task 2",
        completed: true
    },
]

export const TodoList = (props: IProps) => {
    const [tasks, setTasks] = useState<ITask[]>([])
    const [newTask, setNewTask] = useState("")

    const deleteTask = (id: string) => {
        const remainingTasks = tasks.filter((task) => id !== task.id);
        setTasks(remainingTasks);
    }

    const taskList = tasks.map((task) => (
        <Task 
            id={task.id} 
            name={task.name} 
            completed={task.completed}
            deleteTask={deleteTask}
            />
      ));
    

    const handleInputChange = (value: any) => {
        setNewTask(value.target.value)
    } 

    const createNewTask = () => {
        setTasks([...tasks, 
            {
                id: (tasks.length+1).toString(),
                name: newTask,
                completed: false
            }
        ])
        setNewTask("")
    }

    return(
        <div className="todoapp">
            <input type="text" onChange={handleInputChange} value={newTask}/>
            <button className="btn" type="submit" onClick={createNewTask}>
                Add
            </button>
            <ul>
                {taskList}
            </ul>
        </div>
    )
}