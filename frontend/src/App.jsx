import { useEffect, useState } from "react";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "./api";
import "./app.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const handleAdd = async () => {
    if (!text.trim()) return;
    await addTodo(text, deadline);
    setText("");
    setDeadline("");
    fetchTodos();
  };

  const handleToggle = async (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    await toggleTodo(id);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div id="root">
      <h1>Todo App</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New todo"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="deadline-input"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((todo) => {
    const isOverdue = todo.deadline && new Date(todo.deadline) < new Date();

    return (
      <li key={todo.id} className={todo.completed ? "completed" : ""}>
        <span onClick={() => handleToggle(todo.id)}>
          {todo.title}
        </span>
        {todo.deadline && (
          <span
            className={`deadline ${todo.completed ? "completed" : isOverdue ? "overdue" : "upcoming"}`}
          >
            (Due: {todo.deadline})
          </span>
        )}
        <button onClick={() => handleDelete(todo.id)}>❌</button>
      </li>
    );
  })}
      </ul>
    </div>
  );
}

export default App;
