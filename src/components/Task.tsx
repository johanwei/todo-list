import { ITask } from "../interfaces/ITask"

interface IProps {
    id: string,
    name: string,
    completed: boolean
    deleteTask: (id: string) => void
}

export const Task = (props: IProps) => {
    return (
        <li>
            <input id={props.id} type="checkbox" defaultChecked={props.completed} />
            <label>{props.name}</label>
            <button className="btn" onClick={() => props.deleteTask(props.id)}>
                Delete
            </button>
        </li>

    )
}