import React, { Fragment} from 'react';
import EditTodo from './EditTodo';

const ListTodo = (props) => {
    const onUpdateTodo = data => props.onUpdate(data);
    
    return (
        <Fragment>
            <table className="table table-dark table-striped my-5">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {props.todoList.map((todo, index) => (
                        <tr key = {index} >
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo = {todo} onUpdateTodo = {onUpdateTodo} />
                            </td>
                            <td>
                                <button className = "btn btn-outline-warning" onClick={() => props.deleteTodo(todo.todo_id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodo;