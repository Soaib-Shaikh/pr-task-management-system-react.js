import React from 'react';

const DashboardStats = ({ tasks }) => {
const totalTasks = tasks.length;
const completedTasks = tasks.filter(t => t.completed).length;
const pendingTasks = totalTasks - completedTasks;

// Get categories dynamically
const categories = [...new Set(tasks.map(t => t.category))];

return ( <div className="dashboard"> <h2>Dashboard</h2> <div className="stats-cards"> <div className="card mb-3"> <div className="card-body"> <h5>Total Tasks</h5> <p>{totalTasks}</p> </div> </div>


    <div className="card mb-3">
      <div className="card-body">
        <h5>Completed Tasks</h5>
        <p>{completedTasks}</p>
      </div>
    </div>

    <div className="card mb-3">
      <div className="card-body">
        <h5>Pending Tasks</h5>
        <p>{pendingTasks}</p>
      </div>
    </div>

    <div className="card mb-3">
      <div className="card-body">
        <h5>Categories</h5>
        <ul>
          {categories.map((cat, i) => <li key={i}>{cat}</li>)}
        </ul>
      </div>
    </div>
  </div>
</div>


);
};

export default DashboardStats;
