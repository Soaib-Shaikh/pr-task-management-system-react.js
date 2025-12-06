import React from "react";
import { FaPlus } from "react-icons/fa";

const TaskForm = ({ task, handleChange, handleSubmit, darkMode }) => {
  const tasks = ["Learning", "Programing", "Designing", "Developing"];

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6">
        <div className={`card shadow-sm border-0 ${darkMode?'dark-mode':''}`}>
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0"><FaPlus /> Add New Task</h5>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Task Title</label>
                <input type="text" name="title" value={task.title || ""} onChange={handleChange} className={`form-control ${darkMode?'dark-mode':''}`} placeholder="Enter task title..." />
              </div>

              <div className="mb-3">
                <label className="form-label">Task Description</label>
                <textarea name="description" value={task.description || ""} onChange={handleChange} rows={3} className={`form-control ${darkMode?'dark-mode':''}`} placeholder="Enter details..."></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select name="category" value={task.category || ""} onChange={handleChange} className={`form-select ${darkMode?'dark-mode':''}`}>
                  <option value="" disabled>--- Select Category ---</option>
                  {tasks.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select name="priority" value={task.priority || ""} onChange={handleChange} className={`form-select ${darkMode?'dark-mode':''}`}>
                  <option value="" disabled>--- Select Priority ---</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input type="date" name="dueDate" value={task.dueDate || ""} onChange={handleChange} className={`form-control ${darkMode?'dark-mode':''}`} />
              </div>

              <button className={`btn w-100 ${darkMode?'btn-dark-mode':'btn-primary'}`}>Save Task</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
