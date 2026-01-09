import { useEffect, useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // VIEW todos
  useEffect(() => {
    fetch("http://127.0.0.1:5000/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // ADD todo
  const addTodo = async () => {
    if (!text.trim()) return;

    const res = await fetch("http://127.0.0.1:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const updatedTodos = await res.json();
    setTodos(updatedTodos);
    setText("");
  };

  // DELETE todo
  const deleteTodo = async (index) => {
    const res = await fetch(`http://127.0.0.1:5000/todos/${index}`, {
      method: "DELETE"
    });

    const updatedTodos = await res.json();
    setTodos(updatedTodos);
  };

  return (
    <section>
      <h1>Todo App (Python Connected)</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add todo"
        />
        <button onClick={addTodo}>➕ Add</button>
      </div>

      {todos.length === 0 && <p>No todos yet 👀</p>}

      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            {todo}
            <button onClick={() => deleteTodo(i)}>❌</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Todo;


