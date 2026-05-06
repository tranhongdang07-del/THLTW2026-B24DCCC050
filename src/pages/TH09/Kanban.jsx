import { useContext } from "react";
import { TaskContext } from "./context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, Tag, Row, Col } from "antd";

const getColor = (p) => {
  if (p === "high") return "red";
  if (p === "medium") return "orange";
  return "green";
};

export default function Kanban() {
  const { tasks, setTasks } = useContext(TaskContext);

  const columns = {
    todo: tasks.filter(t => t.status === "todo"),
    doing: tasks.filter(t => t.status === "doing"),
    done: tasks.filter(t => t.status === "done"),
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updated = tasks.map(t =>
      t.id === result.draggableId
        ? { ...t, status: result.destination.droppableId }
        : t
    );

    setTasks(updated);
  };

  const renderColumn = (key, title) => (
    <Col span={8}>
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      <Droppable droppableId={key}>
        {(p) => (
          <div
            ref={p.innerRef}
            {...p.droppableProps}
            style={{
              minHeight: 400,
              background: "#f5f5f5",
              padding: 10,
              borderRadius: 10,
            }}
          >
            {columns[key].map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(p) => (
                  <Card
                    ref={p.innerRef}
                    {...p.draggableProps}
                    {...p.dragHandleProps}
                    style={{ marginBottom: 10 }}
                  >
                    <b>{task.title}</b>
                    <p>{task.description}</p>

                    <Tag color={getColor(task.priority)}>
                      {task.priority}
                    </Tag>

                    <p>📅 {task.deadline}</p>

                    <div>
                      {task.tags?.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </Card>
                )}
              </Draggable>
            ))}
            {p.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row gutter={16}>
        {renderColumn("todo", "📝 Cần làm")}
        {renderColumn("doing", "🚀 Đang làm")}
        {renderColumn("done", "✅ Hoàn thành")}
      </Row>
    </DragDropContext>
  );
}