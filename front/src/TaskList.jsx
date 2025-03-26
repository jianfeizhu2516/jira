import React, { useState, useEffect } from 'react';
import './TaskList.scss';
import Header from './Header';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    task: '',
    description: '',
    status: 'To Do',
    assignee: '',
    dueDate: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.username);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await fetch(`/api/tasks/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setTasks(tasks.map(t => (t.id === formData.id ? formData : t)));
      resetForm();
    } else {
      try {
        const res = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error('Failed to create task');
        const newTask = await res.json();

        setTasks([...tasks, newTask]);
        resetForm();
      } catch (error) {
        console.error('Error creating task:', error.message);
      }
    }
  };

  const handleEdit = (task) => {
    setFormData(task);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTasks(tasks.filter(t => t.id !== id));
    });
  };

  const resetForm = () => {
    setFormData({
      id: null,
      task: '',
      description: '',
      status: 'To Do',
      assignee: '',
      dueDate: '',
    });
    setIsEditing(false);
    setShowForm(false);
  };

  const filteredTasks = tasks.filter(task => {
    return (statusFilter === 'All' || task.status === statusFilter) &&
           (assigneeFilter === 'All' || task.assignee === assigneeFilter);
  });

  return (
    <>
      <Header username={username} />
      <div className="task-list-page">
        <div className="task-list-container">
          <div className="filters">
            <div className="filter-selects">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              <select value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}>
                <option value="All">All Assignees</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
              </select>
            </div>
            <button className="add-task-button" onClick={() => setShowForm(true)}>Add Task</button>
          </div>

          {showForm && (
            <form className="task-form" onSubmit={handleSubmit}>
              <label>Task Title</label>
              <input
                type="text"
                value={formData.task}
                onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                required
              />

              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              <div className="form-row">
                <div>
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                <div>
                  <label>Assignee</label>
                  <select
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                  >
                    <option value="">Select Assignee</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                  </select>
                </div>
              </div>

              <label>Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />

              <div className="form-actions">
                <button type="button" onClick={resetForm}>Cancel</button>
                <button type="submit">{isEditing ? 'Update Task' : 'Create Task'}</button>
              </div>
            </form>
          )}

          <table className="task-table">
            <thead>
              <tr>
                <th>Task</th><th>Status</th><th>Assignee</th><th>Due Date</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id}>
                  <td>{task.task}</td>
                  <td>{task.status}</td>
                  <td>{task.assignee}</td>
                  <td>{task.dueDate}</td>
                  <td>
                    <button onClick={() => handleEdit(task)}>Edit</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TaskList;