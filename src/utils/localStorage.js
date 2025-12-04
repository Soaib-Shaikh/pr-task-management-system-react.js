export const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];

export const saveTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));

export const addTask = (task) => {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  return tasks;
};

export const updateTask = (id, updatedTask) => {
  const tasks = getTasks().map(task =>
    task.id === id ? { ...task, ...updatedTask } : task
  );
  saveTasks(tasks);
  return tasks;
};

export const deleteTask = (id) => {
  const tasks = getTasks().filter(task => task.id !== id);
  saveTasks(tasks);
  return tasks;
};

export const toggleTask = (id) => {
  const tasks = getTasks().map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks(tasks);
  return tasks;
};
