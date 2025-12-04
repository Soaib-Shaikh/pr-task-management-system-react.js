import React from 'react'

const TaskForm = ({task, handleChange, handleSubmit}) => {
    const tasks = ['Learning', 'Programing', 'Designing', 'Developing'];
  return (
    <>
      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
            <form action="" method="post" onSubmit={handleSubmit}>
                <h2>Add Task</h2>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Task Title</label>
                    <input type="text" name="title" id="title" value={task.title || ''} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Task Description</label>
                    <textarea name="description" id="description" value={task.description || ''}  onChange={handleChange} rows={4} className='form-control'></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Task Category</label>
                    <select name="category" id="category" value={task.category || ''} onChange={handleChange} className='form-select'>
                        <option value="" disabled >--- select category ---</option>
                        {
                            tasks.map((category)=>(
                                <option value={category} selected={task.category == category} >{category}</option>
                            ))
                        }
                    </select>
                    
                </div>
                <div className="mb-3">
                        <label htmlFor="dueDate" className="form-label">Due Date</label>
                        <input type="date" name="dueDate" id="dueDate" onChange={handleChange} className='form-control' />
                    </div>

                <button className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default TaskForm
