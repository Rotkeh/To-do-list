import { useState } from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [tasks, setTasks] = useState<{ task: string; isDone: boolean }[]>([]);

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTasks([...tasks, { task: userInput, isDone: false }]);
    setUserInput("");
  }

  function toggleDone(task: object) {
    setTasks(tasks.map((t) => (t === task ? { ...t, isDone: !t.isDone } : t)));
  }

  function removeTask(task: object) {
    setTasks(tasks.filter((t) => t !== task));
  }

  function clearTasks() {
    setTasks([]);
  }

  return (
    <section>
      <h1>To do list</h1>
      <form onSubmit={addTask}>
        <input
          onChange={(event) => {
            setUserInput(event.target.value);
          }}
          type="text"
          placeholder="enter new task"
          value={userInput}
          className="task_input"
        />
        <button type="submit">Add task</button>
      </form>
      <button onClick={clearTasks}>Clear Tasks</button>
      <h2>
        Tasks left: {tasks.filter((task) => task.isDone === false).length}
      </h2>
      <ul className="task_list">
        {tasks.map((task, index) => (
          <li key={index} className={task.isDone ? "done" : ""}>
            <button onClick={() => toggleDone(task)}>
              {task.isDone ? "Undo" : "Done"}
            </button>

            {task.task}

            <button onClick={() => removeTask(task)}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
