import { Tabs } from "antd";
import { useState } from "react";
import Dashboard from "./Dashboard";
import Kanban from "./Kanban";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import useTask, { TaskContext } from "./context";

export default function TH09() {
  const taskState = useTask();
  const [editing, setEditing] = useState(null);

  return (
    <TaskContext.Provider value={taskState}>
      <Tabs
        items={[
          { key: "1", label: "Dashboard", children: <Dashboard /> },
          { key: "2", label: "Kanban", children: <Kanban /> },
          { key: "3", label: "Danh sách", children: <TaskList setEditing={setEditing} /> },
          { key: "4", label: "Form", children: <TaskForm editing={editing} setEditing={setEditing} /> },
        ]}
      />
    </TaskContext.Provider>
  );
}