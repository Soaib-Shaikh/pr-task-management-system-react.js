import React from "react";
import { FaTrash, FaEdit, FaSearch, FaSort } from "react-icons/fa";

const TaskList = ({ list, handleDelete, handleEdit, handleComplete, handleSearch, handleSort, startIndex, darkMode }) => {

  const getStatusBadge = (task) => {
    const today = new Date().setHours(0,0,0,0);
    const due = new Date(task.dueDate).setHours(0,0,0,0);

    if(task.completed){
      if(task.completedAt && task.completedAt<=due) return <span className="badge bg-success">Completed (On Time)</span>
      return <span className="badge bg-warning text-dark">Completed (Late)</span>
    }
    if(!task.completed && due<today) return <span className="badge bg-danger">Overdue</span>
    return <span className="badge bg-info">Pending</span>
  }

  return (
    <>
      <div className="row justify-content-center mt-4">
        <div className="col-md-4">
          <div className="input-group shadow-sm">
            <span className="input-group-text"><FaSearch /></span>
            <input type="text" className={`form-control ${darkMode?'dark-mode':''}`} placeholder="Search tasks..." onChange={handleSearch} />
          </div>
        </div>

        <div className="col-md-3 ms-2"> 
          <select className={`form-select shadow-sm ${darkMode?'dark-mode':''}`} onChange={(e)=>handleSort(e.target.value)}> 
            <option value="" selected disabled>Sort By</option> 
            <option value="priority-high">Priority: High → Low</option> 
            <option value="priority-low">Priority: Low → High</option> 
            <option value="asc">Creation Date: Old → New</option> 
            <option value="desc">Creation Date: New → Old</option> 
          </select> 
      </div>
      </div>

       
      

      <div className="row justify-content-center mt-4">
        <div className="col-11">
          <div className={`card shadow-sm border-0 ${darkMode?'dark-mode':''}`}>
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">Task List</h5>
            </div>

            <div className="card-body p-0">
              <table className={`table table-hover table-striped mb-0 text-center ${darkMode?'table-dark-mode':''}`}>
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Done</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {list.length>0 ? list.map((val,index)=>(
                    <tr key={val.id}>
                      <td>{startIndex+index+1}</td>
                      <td style={{textDecoration: val.completed?'line-through':'none'}}>{val.title}</td>
                      <td style={{textDecoration: val.completed?'line-through':'none'}}>{val.description}</td>
                      <td><span className="badge bg-info">{val.category}</span></td>
                      <td>
                        <span className={
                          val.priority==="High" ? "badge bg-danger" :
                          val.priority==="Medium" ? "badge bg-warning text-dark" :
                          "badge bg-success"
                        }>{val.priority}</span>
                      </td>
                      <td><span className="badge bg-dark">{val.dueDate}</span></td>
                      <td>{getStatusBadge(val)}</td>
                      <td><input type="checkbox" className="form-check-input" checked={val.completed} onChange={()=>handleComplete(val.id)}/></td>
                      <td>
                        <button className="btn btn-sm btn-outline-warning me-2" onClick={()=>handleEdit(val.id)}><FaEdit/></button>
                        <button className="btn btn-sm btn-outline-danger" disabled={!val.completed} onClick={()=>handleDelete(val.id)}><FaTrash/></button>
                      </td>
                    </tr>
                  )) : <tr><td colSpan="9" className="py-4">No tasks found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TaskList;
