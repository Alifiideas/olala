import { useEffect, useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

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

  return (
    <section>
      <h1>Todo App (Python Connected)</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>
    </section>
  );
}

export default Todo;


