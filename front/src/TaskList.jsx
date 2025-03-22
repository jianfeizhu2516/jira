import React, { useState } from 'react';
import Header from './Header'; // 引入 Header 组件
import './TaskList.scss'; // 引入 TaskList 样式

const TaskList = () => {
  const tasks = [
    {
      id: 1,
      task: 'Implement login functionality',
      status: 'To Do',
      assignee: 'John Doe',
      dueDate: 'Mar 15, 2025',
    },
    {
      id: 2,
      task: 'Design user interface',
      status: 'In Progress',
      assignee: 'Jane Smith',
      dueDate: 'Mar 20, 2025',
    },
  ];

  const [statusFilter, setStatusFilter] = useState('All Status');
  const [assigneeFilter, setAssigneeFilter] = useState('All Assignees');

  const filteredTasks = tasks.filter((task) => {
    return (
      (statusFilter === 'All Status' || task.status === statusFilter) &&
      (assigneeFilter === 'All Assignees' || task.assignee === assigneeFilter)
    );
  });

  return (
    <div className="task-list-page">
      <Header /> {/* 添加 Header 组件 */}
      <div className="task-list-container">
        <div className="filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
          >
            <option value="All Assignees">All Assignees</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
          </select>
        </div>

        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.task}</td>
                <td>{task.status}</td>
                <td>{task.assignee}</td>
                <td>{task.dueDate}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;