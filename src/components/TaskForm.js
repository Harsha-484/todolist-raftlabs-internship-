import React, { useEffect } from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import moment from "moment";
import { Task } from "../types";

const { Option } = Select;

const TaskForm = ({ onSubmit, editingTask }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingTask) {
      // If editingTask is not null, pre-fill the form with the editingTask values
      form.setFieldsValue({
        title: editingTask.title,
        description: editingTask.description,
        dueDate: moment(editingTask.dueDate),
        priority: editingTask.priority,
        status: editingTask.status,
      });
    }
  }, [editingTask, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const task: Task = {
        ...values,
        dueDate: values.dueDate.toDate(),
      };
      onSubmit(task);
      form.resetFields();
    });
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#1890ff" }}>
        {editingTask ? "Edit Task" : "Add Task"}
      </h2>
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true, message: "Please select a due date" }]}
      >
        <DatePicker showTime />
      </Form.Item>
      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true, message: "Please select a priority" }]}
      >
        <Select>
          <Option value="high">High</Option>
          <Option value="medium">Medium</Option>
          <Option value="low">Low</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select a status" }]}
      >
        <Select>
          <Option value="in-progress">In Progress</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
