import './App.css';
import React, { Fragment } from 'react';
import TaskForm from './components/TaskForm';
import Controll from './components/TaskControll';
import TaskList from './components/TaskList';

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      tasks : [],
      isDisPlayForm : false,
      taskEditing : null,
      filter : {
        name : '',
        status : -1
      },
      keyword : '',
      sort : {
        by : 'name',
        value : 1
      }
    }
  }

  
  componentWillMount() {
    if(localStorage && localStorage.getItem('tasks')) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState ({
        tasks : tasks
      });
    }
  }
  
  // onGenerationData = () => {
  //   var tasks = [
  //     {
  //       id : this.generateId(),
  //       name : "Html",
  //       status : true
  //     },
  //     {
  //       id : this.generateId(),
  //       name : "css",
  //       status : false
  //     },
  //     {
  //       id : this.generateId(),
  //       name : "javascript",
  //       status : true
  //     }
  //   ];
    
  //   this.setState({
  //     tasks : tasks
  //   });

  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }

  s4() {
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateId () {
    return this.s4() + this.s4() + '-' + this.s4()  + '-' + this.s4() + '-' + this.s4() + '-' + this.s4()
            + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4() + '-' + this.s4();
  }

  onToggleForm = () => {
    if(this.state.isDisPlayForm && this.state.taskEditing !== null){
      this.setState({
        isDisPlayForm : true,
        taskEditing : null
      });
    }else {
      this.setState({
        isDisPlayForm : !this.state.isDisPlayForm,
        taskEditing : null
      });
    }
    
  }

  onCloseForm = () => {
    this.setState({
      isDisPlayForm : false
    });
  }

  onShowForm = () => {
    this.setState({
      isDisPlayForm : true
    });
  }

  onSubmit = (data) => {
    var {tasks} = this.state;
    if(data.id === ''){
      data.id = this.generateId();
      this.setState ({
        tasks : [...tasks, data],
        taskEditing : null
      });
      localStorage.setItem('tasks', JSON.stringify([...tasks, data]));
    } else {
      let index = this.findIndex(data.id);
      tasks[index] = data;
      this.setState ({
        tasks : tasks,
        taskEditing : null
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onUpdateStatus = (id) => {
    let {tasks} = this.state;
    let index = this.findIndex(id);
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
      this.setState ({
        tasks : tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  findIndex = (id) => {
    let {tasks} = this.state;
    let result = -1;
    tasks.forEach((task, index) => {
      if(task.id === id){
        result = index;
      }
    });
    return result;
  }

  onRemove = (id) => {
    let {tasks} = this.state;
    let newTasks = tasks.filter(task => task.id !== id);
    this.setState ({
      tasks : newTasks
    });

    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }


  onUpdate = (id) => {
    let {tasks} = this.state;
    let index = this.findIndex(id);
    let taskEditing = tasks[index];
    this.setState({
      taskEditing : taskEditing
    });
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter : {
        name : filterName.toLowerCase(),
        status : filterStatus
      }
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword : keyword
    });
  }

  onSort = (data) => {
    this.setState({
      sort : data
    });
  }

  render () {  
    let {tasks, isDisPlayForm, taskEditing, filter, keyword, sort} = this.state;
    console.log(sort);
    if(filter){
      if(filter.name){
        tasks = tasks.filter(task => task.name.toLowerCase().indexOf(filter.name) !== -1);
      }
      tasks = tasks.filter(task => {
        if(filter.status === -1){
          return task;
        }else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }

    if(keyword){
      tasks = tasks.filter(task => task.name.toLowerCase().indexOf(keyword.keyword) !== -1);
    }

    
    if(sort.by === 'name'){
      tasks.sort((a, b) => {
        if(a.name > b.name) return sort.value;
        else {
          if(a.name < b.name) return -sort.value;
          return 0;
        }
      });
    }else{
      tasks.sort((a, b) => {
        if(a.status > b.status) return -sort.value;
        else {
          if(a.status < b.status) return sort.value;
          return 0;
        }
      });
    }

    const elementTaskForm = isDisPlayForm ? <TaskForm 
                                                onSubmit = {this.onSubmit} 
                                                onCloseForm = {this.onCloseForm} 
                                                taskEditing = {taskEditing}
                                              /> : '';
    return (
      <Fragment>
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div className="row">
            <div className={isDisPlayForm ? "col-xs-3 col-sm-3 col-md-3 col-lg-3" : " "}>
              {elementTaskForm}
            </div>
            <div className={isDisPlayForm ? "col-xs-9 col-sm-9 col-md-9 col-lg-9" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
              <button type="button" className="btn btn-primary" onClick = {this.onToggleForm}>
                <span className="fa fa-plus mr-5" />Thêm Công Việc
              </button>
              <div className="row mt-15">
                <Controll onSearch = {this.onSearch} onSort = {this.onSort} sort = {sort}/>
              </div>
              <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList 
                    tasks = {tasks} 
                    onUpdate = {this.onUpdate}
                    onRemove = {this.onRemove}
                    onFilter = {this.onFilter}
                    onUpdateStatus = {this.onUpdateStatus}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } 
}

export default App;
