import React from 'react';
import './DarkMode.css';

const Dashboard = ({ tasks, darkMode }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const categories = [...new Set(tasks.map(t => t.category))];

  return (
    <div className={`dashboard mb-4 ${darkMode ? 'dark-mode-bg' : ''}`}>
      <h2 className={`mb-4 text-center ${darkMode?'dark-mode-text':''}`}>Dashboard</h2>
      <div className="stats-cards d-flex flex-wrap justify-content-center gap-3">

        <div className={`card stat-card text-center p-3 shadow-sm border-0 ${darkMode?'dark-mode':''}`}>
          <div className="card-body">
            <h5 className="card-title">Total Tasks</h5>
            <p className="card-text display-6">{totalTasks}</p>
          </div>
        </div>

        <div className={`card stat-card text-center p-3 shadow-sm border-0 ${darkMode?'dark-mode':''}`}>
          <div className="card-body bg-success text-white rounded">
            <h5 className="card-title">Completed Tasks</h5>
            <p className="card-text display-6">{completedTasks}</p>
          </div>
        </div>

        <div className={`card stat-card text-center p-3 shadow-sm border-0 ${darkMode?'dark-mode':''}`}>
          <div className="card-body bg-warning text-dark rounded">
            <h5 className="card-title">Pending Tasks</h5>
            <p className="card-text display-6">{pendingTasks}</p>
          </div>
        </div>

        <div className={`card stat-card text-center p-3 shadow-sm border-0 ${darkMode?'dark-mode':''}`}>
          <div className="card-body rounded">
            <h5 className="card-title mb-2">Categories</h5>
            <ul className="list-group list-group-flush">
              {categories.map((cat,i)=>(
                <li key={i} className={`list-group-item py-1 ${darkMode?'dark-mode':''}`}>{cat}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
