import React, { useState } from "react";
import { List, Button, Input, Space, Row, Col } from "antd";

const TaskList = ({ tasks, onDelete, onEdit }) => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);

  const sortedTasks = tasks
    .slice()
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const filteredTasks = sortedTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase()) &&
      (statusFilter ? task.status === statusFilter : true)
  );

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Row justify="start" gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Input
            placeholder="Search tasks"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </Col>
        <Col span={12}>
          <Space>
            <Button onClick={() => setStatusFilter(null)}>All</Button>
            <Button onClick={() => setStatusFilter("in-progress")}>
              In Progress
            </Button>
            <Button onClick={() => setStatusFilter("completed")}>
              Completed
            </Button>
          </Space>
        </Col>
      </Row>
      <List
        dataSource={filteredTasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => onEdit(task.id)}>
                Edit
              </Button>,
              <Button type="link" onClick={() => onDelete(task.id)}>
                Delete
              </Button>,
            ]}
            style={{
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          >
            <List.Item.Meta
              title={<strong>{task.title}</strong>}
              description={
                <div>
                  <div>
                    <strong>Due Date:</strong>{" "}
                    {task.dueDate.toISOString().split("T")[0]}
                  </div>
                  <div>
                    <strong>Priority:</strong> {task.priority}
                  </div>
                  <div>
                    <strong>Status:</strong> {task.status}
                  </div>
                </div>
              }
            />
            <div>{task.description}</div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TaskList;
