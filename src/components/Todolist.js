import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    const storedInput = localStorage.getItem("todoInput");
    if (storedInput) {
      setTodoInput(storedInput);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoInput", todoInput);
  }, [todoInput]);

  const addTodo = () => {
    if (todoInput.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: todoInput, completed: false },
      ]);
      setTodoInput("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="Todo ">
      <Card>
        <Card.Body>
          <Card.Title className="head">
            <h1>ToDo List</h1>
          </Card.Title>
          <input
            className="input"
            type="text"
            placeholder="Enter the task..."
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <Button onClick={addTodo} id="btn">
            Add
          </Button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    fontSize: "bold"
                  }}
                >
                  {todo.text}
                </span>
                <Button className="remove" onClick={() => removeTodo(todo.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TodoList;
