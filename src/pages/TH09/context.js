import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export default function useTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) setTasks(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return { tasks, setTasks };
}