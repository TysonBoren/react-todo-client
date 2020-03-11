import React from 'react';
import ReactDOM from 'react-dom';
import "./styles.css"

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            todo: "",
        }
    }


    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            todo: event.target.value
        })
    }

    addTodo = (event) => {
        console.log('I added a todo')
        event.preventDefault()
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
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

