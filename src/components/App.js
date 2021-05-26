import React from 'react';
import ToDoList from './ToDoList'
import NavBar from './NavBar'
import AddTask from './AddTask';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import initialData from '../initialData';
import uniqueid from 'uniqueid'
import Fetching from './Fetching'
class App extends React.Component {

    state = {
        tasks: [],
        fetching: true
    }

    componentDidMount = () => {
        let delay = Math.floor(Math.random() * 5000)
        setTimeout(() => {
            this.setState({
                fetching: false,
                tasks: initialData
            })
        }, delay)
    }

    onToggleCompleted = (taskId) => {
        let taskToUpdate = this.state.tasks.find(task => task.id === taskId)
        taskToUpdate.completed = !taskToUpdate.completed

        this.setState(prevState => (
            prevState.tasks.map(task => {
                return task.id === taskId ? taskToUpdate : task
            })  
        ))
    }

    onAddTask = (newTaskName) => {
        let newTask = {
            id: uniqueid(),
            name: newTaskName,
            completed: false
        }
        this.setState(prevState => ({
            tasks: [...prevState.tasks, newTask]
        }))
    }

    onDeletedCompleted = () => {
        this.setState(prevState => {
            let newState = prevState.tasks.filter(task => !task.completed)
            return {
                tasks: newState
            }
        })
    }
    render(){
        return (
            <section id="todo">
                {this.state.fetching ? <Fetching /> : null}
                <BrowserRouter>
                    <Switch>
                        <Route path="/add-task" render={(props) => <AddTask {...props} onAddTask = {this.onAddTask} />} />
                        <Route path="/:filter?" render={(props) => <ToDoList {...props} tasks={this.state.tasks} onToggleCompleted={this.onToggleCompleted} />} />
                    </Switch>
                    <NavBar onDeletedCompleted = {this.onDeletedCompleted}/>
                </BrowserRouter>
            </section>
        )
    }
    
}

export default App