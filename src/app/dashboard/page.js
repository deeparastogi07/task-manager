"use client";

import { useEffect, useState } from "react";
import { createTask, getTasks, updateTask, deleteTask } from "@/lib/api";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  const fetchTasks = async () => {
    const data = await getTasks(token);
    setTasks(data.tasks || []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {

  console.log("Create button clicked");

  const token = localStorage.getItem("token");

  console.log("Token:", token);

  const res = await createTask(
    { title, description },
    token
  );

  console.log("API response:", res);

  fetchTasks();
  setTitle("");
  setDescription("");
};

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    fetchTasks();
  };

  const handleComplete = async (task) => {
    await updateTask(
      {
        id: task._id,
        title: task.title,
        description: task.description,
        status: "completed",
      },
      token
    );

    fetchTasks();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Task Dashboard</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleCreate}>Create Task</button>

      <hr />

      <h2>Your Tasks</h2>

      {tasks.map((task) => (
        <div key={task._id} style={{ marginBottom: "20px" }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>

          <button onClick={() => handleComplete(task)}>
            Mark Complete
          </button>

          <button onClick={() => handleDelete(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}