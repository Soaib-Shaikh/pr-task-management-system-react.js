import React, { useEffect, useState } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import { addTask, deleteTask, getTasks, toggleTask, updateTask } from './utils/localstorage';


function App() {
  const [task, setTask] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Load tasks from localStorage
  useEffect(() => {
    const tasks = getTasks();
    setTaskList(tasks);
    setData(tasks);
  }, []);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  // Add or Update task
  const handleSubmit = (e) => {
    e.preventDefault();


    if (!editId) {
      const newTask = { ...task, id: Date.now(), createdAt: Date.now(), completed: false };
      addTask(newTask);
      setTaskList(prev => [newTask, ...prev]);
      setData(prev => [newTask, ...prev]);
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
    const updatedList = toggleTask(id);
    setTaskList(updatedList);
    setData(updatedList);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase().trim();
    if (!value) return setData(taskList);


    const filtered = taskList.filter(task =>
      task.title?.toLowerCase().includes(value) ||
      task.description?.toLowerCase().includes(value) ||
      task.category?.toLowerCase().includes(value)
    );

    setData(filtered);
    setCurrentPage(1);


  };

  const handleSort = (type) => {
    const sorted = [...data].sort((a, b) =>
      type === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
    );
    setData(sorted);
    setCurrentPage(1);
  };

  const handlePagination = (page) => setCurrentPage(page);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className={`container mt-3 ${darkMode ? 'dark-mode' : ''}`}>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-secondary" onClick={() => setDarkMode(prev => !prev)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'} </button> </div>

      <TaskForm
        task={task}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <TaskList
        list={currentItems}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleComplete={handleComplete}
        handleSearch={handleSearch}
        handleSort={handleSort}
        currentPage={currentPage}
        startIndex={indexOfFirstItem}
        totalPages={totalPages}
        handlePagination={handlePagination}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>

  );
}

export default App;
