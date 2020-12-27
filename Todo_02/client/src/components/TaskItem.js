import React, { Component, Fragment } from 'react';

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id)
    }


    onRemove = () => {
        this.props.onRemove(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render() {

        const {task, index} = this.props;

        return (
            <Fragment>
                <tr>
                    <td className="text-center">{index + 1}</td>
                    <td>{task.name}</td>
                    <td className="text-center">
                        <span className={task.status?"label label-success m-w pointer-curser":"label label-primary m-w pointer-curser"}
                            onClick = {this.onUpdateStatus}
                        >
                            {task.status?'Đã kích hoạt':'Chưa kích hoat'}
                        </span>
                    </td>
                    <td className="text-center">
                        <button type="button" className="btn btn-info" onClick = {this.onUpdate}>
                            <span className="fa fa-pencil mr-5" />Sửa
                        </button>
                        &nbsp;
                        <button type="button" className="btn btn-default" onClick = {this.onRemove}>
                            <span className="fa fa-trash mr-5" />Xóa
                        </button>
                    </td>
                </tr>
            </Fragment>
        );
    }
}

export default TaskItem;