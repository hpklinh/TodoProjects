import React, { Component, Fragment } from 'react';

class TaskForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id : '',
			name : '',
			status : false
		}
	}


	componentWillMount () {
		if(this.props.taskEditing){
			this.setState ({
				id : this.props.taskEditing.id,
				name : this.props.taskEditing.name,
				status : this.props.taskEditing.status
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps && nextProps.taskEditing){
			this.setState ({
				id : nextProps.taskEditing.id,
				name : nextProps.taskEditing.name,
				status : nextProps.taskEditing.status
			});
		} else if (!nextProps.taskEditing) {
			this.setState({
				id : '',
				name : '',
				status : false
			});
		}
	}
	

	onCloseForm = () => {
		this.props.onCloseForm();
	}


	onChange = (e) => {
		let target = e.target;
		let name = target.name;
		let value = target.value;
			if(name === 'status'){
				value = target.value === 'true' ? true : false ;	
			}
		this.setState({
			[name] : value
		});

	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.state);
		//cancel & close form
		this.onCloseForm();
		this.onClear();
	}

	onClear = () => {
		this.setState ({
			name : '',
			status : false
		});
	}

    render() {

		let {id} = this.state;
		
        return (
            <Fragment>
				<div className="panel panel-warning">
					<div className="panel-heading">
						<h3 className="panel-title panel-title-flex">
							{id !== '' ? "Cập Nhật Công Việc" : "Thêm Công Việc"}
							<span className="fa fa-times-circle text-right" onClick = {this.onCloseForm}></span>
						</h3>
					</div>
					<div className="panel-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label>Tên :</label>
								<input 
									type="text"
									className="form-control" 
									name="name"
									value={this.state.name}
									onChange={this.onChange}
								/>
							</div>
							<label>Trạng Thái :</label>
							<select 
								className="form-control" 
								required="required"
								name='status'
								value={this.state.status}
								onChange={this.onChange}
							>
								<option value={true}>Đã Kích Hoạt</option>
								<option value={false}>Chưa Kích Hoạt</option>
							</select>
							<br />
							<div className="text-center">
								<button type="submit" className="btn btn-success">
									{id !== '' ? "Cập nhật" : "Thêm"}
								</button>&nbsp;
								<button type="reset" className="btn btn-danger" onClick={this.onCloseForm}>Hủy Bỏ</button>
							</div>
						</form>
					</div>
				</div>
            </Fragment>
        );
    }
}

export default TaskForm;