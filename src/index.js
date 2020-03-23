import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";


import "./styles.css"
import TodoItem from './todo-item';


class App extends React.Component {
    constructor() {
        super()

        this.state = {
            todo: "",
            todos: [],
        }
    }

    deleteItem = (id) => {
        fetch(`https://tdb-flask-todo-api.herokuapp.com/todo/${id}`, {
            method: "DELETE",
            
        })
        .then(response => {
            this.setState({
                todos: this.state.todos.filter(item => {
                    return item.id !== id
                })
            })
        })
        .catch(error => {
            console.log("delete item error", error)
        })
    }

    renderTodos = () => {
        return this.state.todos.map((item) => {
            return <TodoItem key={item.id} item={item} deleteItem={this.deleteItem}/>
        })
    }

    componentDidMount() {
        fetch('https://tdb-flask-todo-api.herokuapp.com/todos')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    todos: data
                })
            })
    }


    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            todo: event.target.value
        })
    }

    addTodo = (event) => {
        event.preventDefault()
        console.log('post successful')

        axios({
            method: "post",
            url: "https://tdb-flask-todo-api.herokuapp.com/todo",
            header: {
                "content-type": "application/json"
            },
            data: {
                title: this.state.todo,
                done: false

            }
        })
        .then(data => {
            console.log(data)
            this.setState({
                todos: [...this.state.todos, data.data],
                todo: "",
            })
        })
        .catch(error => {
            console.log("add todo error", error)
        })
    }


    render() {
        return (
            <div className="app">
                <h1>Todo List</h1>
                        
                <form className="add-todo" onSubmit={this.addTodo}>
                    <input
                        type="text"
                        placeholder="Add Todo"
                        value={this.state.todo}
                        onChange={this.handleChange}
                    />

                    <button type='submit'>Add</button>

                    
                </form>
                
            {this.renderTodos()}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

