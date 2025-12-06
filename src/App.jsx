import React, { useEffect, useState } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import Pagination from './Components/Pagination';
import DashboardStats from './Components/Dashboard';
import { addTask, deleteTask, getTasks, updateTask } from './utils/localstorage.js';
import Navbar from './Components/Navbar';
import './Components/DarkMode.css';


function App() {
  const [task, setTask] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem('currentPage');
    return saved ? Number(saved) : 1;
  });
  const [editId, setEditId] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const tasks = getTasks() || [];
    setTaskList(tasks);
    setData(tasks);
  }, []);

  // Save current page in localStorage
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }, [darkMode]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editId) {
      const newTask = { ...task, id: Date.now(), createdAt: Date.now(), completed: false };
      const updatedList = addTask(newTask);
      setTaskList(updatedList);
      setData(updatedList);
    } else {
      const updatedList = updateTask(editId, task);
      setTaskList(updatedList);
      setData(updatedList);
      setEditId(null);
    }
    setTask({});
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    const found = taskList.find(t => t.id === id);
    if (!found.completed) {
      alert("Only completed tasks can be deleted.");
      return;
    }
    const updatedList = deleteTask(id);
    setTaskList(updatedList);
    setData(updatedList);
  };

  const handleEdit = (id) => {
    const found = taskList.find(t => t.id === id);
    setTask(found);
    setEditId(id);
  };

  const handleComplete = (id) => {
    const updatedList = taskList.map(t =>
      t.id === id
        ? { ...t, completed: !t.completed, completedAt: !t.completed ? Date.now() : null }
        : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedList));
    setTaskList(updatedList);
    setData(updatedList);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase().trim();
    if (!value) return setData(taskList);
    const filtered = taskList.filter(task =>
      task.title?.toLowerCase().includes(value) ||
      task.description?.toLowerCase().includes(value) ||
      task.category?.toLowerCase().includes(value) ||
      task.priority?.toLowerCase().includes(value)
    );
    setData(filtered);
    setCurrentPage(1);
  };

  const handleSort = (type) => {
    let sorted = [...data];
    if (type === "priority-high") { const order = { High: 1, Medium: 2, Low: 3 }; sorted.sort((a, b) => order[a.priority] - order[b.priority]); }
    else if (type === "priority-low") { const order = { High: 3, Medium: 2, Low: 1 }; sorted.sort((a, b) => order[a.priority] - order[b.priority]); }
    else if (type === "asc") sorted.sort((a, b) => a.createdAt - b.createdAt);
    else if (type === "desc") sorted.sort((a, b) => b.createdAt - a.createdAt);
    setData(sorted);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <div className={`container mt-3 ${darkMode ? 'bg-dark text-light' : ''}`}>

        <div className="mb-3">
          <button className="btn btn-outline-primary" onClick={() => setShowDashboard(!showDashboard)}>
            {showDashboard ? "Hide Dashboard" : "Show Dashboard"}
          </button>
        </div>

        {showDashboard && <DashboardStats tasks={taskList} />}

        <TaskForm task={task} handleChange={handleChange} handleSubmit={handleSubmit} />

        <TaskList
          list={currentItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleComplete={handleComplete}
          handleSearch={handleSearch}
          handleSort={handleSort}
          currentPage={currentPage}
          startIndex={indexOfFirstItem}
          totalPages={Math.ceil(data.length / itemsPerPage)}
          handlePagination={(page) => setCurrentPage(page)}
        />

        <Pagination
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}

export default App;
