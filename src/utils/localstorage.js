export const getTasks = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

export const addTask = (task) => {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return tasks;
};

export const deleteTask = (id) => {
  const tasks = getTasks().filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return tasks;
};

export const updateTask = (id, updatedTask) => {
  const tasks = getTasks().map((task) =>
    task.id === id ? { ...task, ...updatedTask } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return tasks;
};

export const toggleTask = (id) => {
  const tasks = getTasks().map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return tasks;
};
