import React, {Component} from 'react';
import randomstring from 'randomstring';


import './App.css';
import TaskForm from './components/TaskForm/TaskForm';
import Control from './components/Control/Control';
import TaskList from './components/TaskList/TaskList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],// id: unique, name, status
      isDisplayForm : false
    }
  }

  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  } 

  onGenerateData = () => {
    var tasks = [
      {
        id: this.generateID(),
        name: 'Hoc Lap Trinh',
        status: true
      },
      {
        id: this.generateID(),
        name: 'Di Boi',
        status: false
      },
      {
        id: this.generateID(),
        name: 'Ngu',
        status: false
      },
    ];
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  generateID() {
    return randomstring.generate(7);
  }

  onToggleForm = () => {
    this.setState({
      isDisplayForm : !this.state.isDisplayForm
    });
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm : false
    });
  }

  onSubmit = (data) => {
    var {tasks} = this.state; // tasks = this.state.tasks
    data.id = this.generateID(); // task
    tasks.push(data);
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } 

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    // console.log(index);
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onDeleteToDo = (id) => {
    var { tasks} = this.state;
    var index = this.findIndex(id);
    
    if(index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  findIndex = (id) => {
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task , index) => {
      if(task.id === id){
        result = index;
      }
    });
    return result;
  }

  render() {
    var {tasks, isDisplayForm} = this.state; //var tasks = this.state.tasks.
    var elmTaskForm = isDisplayForm ? <TaskForm AAA = {this.onCloseForm} onSubmit = {this.onSubmit}/> : "";

    return (
      <div className="App">
        Hello.
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div className="row">
            <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : "" }>
              {/* TaskFrom */}
  
              {/* <TaskForm /> */}
              {elmTaskForm}
            </div>
            <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'} >
              <button type="button" className="btn btn-primary" onClick = {this.onToggleForm}>
                <span className="fa fa-plus mr-5"></span> Thêm Công Việc
              </button>
  
              <button type="button" className="btn btn-primary" onClick = {this.onGenerateData}>
                <span className="fa fa-plus mr-5"></span> Generate Data
              </button>
              <div className="row mt-15">
  
                {/* Control */}
                <Control />
  
              </div>
              <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  {/* TaskList */}
                  <TaskList tasks = {tasks} onUpdateStatus = {this.onUpdateStatus} onDeleteToDo = {this.onDeleteToDo}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

