import { useEffect, useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // fetch todos from Python
  useEffect(() => {
    fetch("http://127.0.0.1:5000/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // add todo
  const addTodo = async () => {
    if (!text) return;

    await fetch("http://127.0.0.1:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    setTodos([...todos, text]);
    setText("");
  };

  // delete todo
  const deleteTodo = async (index) => {
    await fetch(`http://127.0.0.1:5000/todos/${index}`, {
      method: "DELETE"
    });

    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <section>
      <h1>Todo App (Python Connected)</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>

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
