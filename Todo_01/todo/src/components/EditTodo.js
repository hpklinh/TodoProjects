import React, { Fragment, useState } from 'react';

const EditTodo = (props) => {

	const [description, setDescription] = useState(props.todo.description);
	const todo_id = props.todo.todo_id;

	//Edit todo function
	const updateTodo = async (e) => {
		e.preventDefault();
		try {
			const body = {description};
			await fetch(`http://localhost:5000/todos/${todo_id}`, {
          method: "PUT",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(body)
				});
				const bodyObject = {todo_id, description};
				props.onUpdateTodo(bodyObject);
		} catch (err) {
			console.error(err.message);
		}
	}

    return (
        <Fragment>
					<div>
						<button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${props.todo.todo_id}`}>Edit</button>

						<div className="modal fade" id={`id${props.todo.todo_id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title text-dark text-uppercase" id="exampleModalLabel">Update Todo</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">×</span>
										</button>
									</div>
									<div className="modal-body text-dark">
										<div className="form-group">
											<input
												type="text"
												className="form-controll w-100"
												value={description}
												onChange={e => setDescription(e.target.value)}
											/>
										</div>
									</div>
									<div className="modal-footer">
										<button 
											type="button" 
											className="btn btn-outline-dark" 
											data-dismiss="modal"
										>
											Close
										</button>
										<button
											type="button"
											data-dismiss="modal"
											className="btn btn-outline-success"
											onClick={e => updateTodo(e)}
										>
											Save changes
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
        </Fragment>
    );
}

export default EditTodo;