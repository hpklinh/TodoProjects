import React, { Fragment, useState } from "react";

const InputTodo = (props) => {
    const [description, setDescription] = useState("");
    const todo_id = props.idMax + 1;

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {description};
            await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });

            const bodyObject = {todo_id, description};
            props.onSubmit(bodyObject);

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5 text-uppercase">Input Todo</h1>
            <form className= "d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                type="text" 
                className="form-control" 
                value = {description}
                onChange = {e => setDescription(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
}

export default InputTodo;