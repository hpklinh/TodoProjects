import React, { Component, Fragment } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1 //all : -1, active : 1 , deactive : 0
        }
    }


    onChange = (e) => {
        let target = e.target;
        let name =  target.name;
        let value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        );
        this.setState ({
            [name] : value
        });
    }


    render() {
        const {tasks} = this.props;
        const {filterName, filterStatus} = this.state;
        const elementTasks = tasks.map((task, index) => {
            return <TaskItem
                        task = {task}
                        key = {index}
                        index = {index}
                        onRemove = {this.props.onRemove}
                        onUpdate = {this.props.onUpdate}
                        onUpdateStatus = {this.props.onUpdateStatus}
                    />
        });

        return (
            <Fragment>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">Tên</th>
                            <th className="text-center">Trạng Thái</th>
                            <th className="text-center">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td />
                            <td>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name = "filterName"
                                    value = {filterName}
                                    onChange = {this.onChange}
                                />
                            </td>
                                <td>
                                    <select 
                                        className="form-control"
                                        name = "filterStatus"
                                        value = {filterStatus}
                                        onChange = {this.onChange}
                                    >
                                        <option value={-1}>Tất Cả</option>
                                        <option value={0}>Chưa kích hoạt</option>
                                        <option value={1}>Đã Kích Hoạt</option>
                                    </select>
                                </td>
                            <td />
                        </tr>
                        {elementTasks}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default TaskList;