import { Fragment, useState, useEffect } from 'react';
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';
import './App.css';


function App() {

  const [todos, setTodos] = useState([]);

    //Show todo list

    const getTodos = async () => {
      try {
          
        const response = await fetch("http://localhost:5000/todos");
        const jsonData = await response.json();

        setTodos(jsonData);

      } catch (err) {
          console.error(err.message);
      }
    }

    useEffect(() => {
        getTodos();
    }, []);

    //Add todo
    const idMax = (todos) => {
      const todoMax = todos.map(todo => todo.todo_id);
      return Math.max(...todoMax);
    }
    const idMax2 = idMax(todos);
    const onSubmit = (data) => {
      setTodos([...todos, data]);
    }

    //Update todo function
    const onUpdate = (data) => {
      const todoUpdate = todos.filter(todo => todo.todo_id !== data.todo_id);
      setTodos([...todoUpdate, data]);
    }


    //Delete todo function

    const deleteTodo = async id => {
      try {
        await fetch(`http://localhost:5000/todos/${id}`, {
          method: "DELETE"
        });

        setTodos(todos.filter(todo => todo.todo_id !== id));
      } catch (err) {
          console.error(err.message);
      }
    }

  return (
    <Fragment>
      <div className = "container">
        <InputTodo 
          onSubmit = {onSubmit}  
          idMax = {idMax2} 
        />
        <ListTodo 
          todoList = {todos} 
          deleteTodo = {deleteTodo}
          onUpdate = {onUpdate}
        />
      </div>
    </Fragment>
  );
}

export default App;
