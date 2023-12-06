import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const { Header, Content } = Layout;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (task) => {
    if (editingTask) {
      // If editingTask is not null, it means we are editing an existing task
      setTasks(tasks.map((t) => (t.id === editingTask.id ? task : t)));
      setEditingTask(null);
    } else {
      // If editingTask is null, it means we are adding a new task
      setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
    }
  };

  return (
    <Layout>
      <Header style={{ paddingBottom: "100px", color: "#ffffff" }}>
        <h1>Task Manager</h1>
      </Header>
      <Content>
        <Row justify="center" style={{ padding: "20px" }}>
          <Col span={12}>
            <TaskForm onSubmit={addTask} editingTask={editingTask} />
          </Col>
        </Row>
        <Row justify="center">
          <Col span={12}>
            <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
