import React, { Component} from "react";

class TodoItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            done: this.props.item.done
        }
    }

    toggleDone = () => {
        fetch(`https://tdb-flask-todo-api.herokuapp.com/todo/${this.props.item.id}`, {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                done: !this.state.done
            })
        })
        .then(() => {
            this.setState({
                done: !this.state.done
            })
        })
        .catch(error => {
            console.log('Todo patch error', error)
        })
    }



    render() {
        return (
            <div className="todo-item">
                <input 
                type="checkbox" 
                defaultChecked={this.state.done}
                onClick={this.toggleDone}
                />
                <button onClick={() => this.props.deleteItem(this.props.item.id)}> delete me </button>
                <p className={this.state.done ? "done" : null }>{this.props.item.title}</p>
            </div>
        )
    }
}

export default TodoItem