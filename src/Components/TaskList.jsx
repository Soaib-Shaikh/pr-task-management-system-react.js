import React from 'react'

const TaskList = ({
  list,
  totalPages,
  handleDelete,
  handleEdit,
  handleComplete,
  handleSearch,
  currentPage,
  startIndex,
  handlePagination,
  handlePrev,
  handleNext,
  handleSort
}) => {
  return (
    <>
      <div className="row d-flex justify-content-center mt-3">
        <div className="col-6">
          <input
            type="text"
            placeholder="Search by title, description or category"
            className="form-control mb-3"
            onChange={handleSearch}
          />
        </div>
        <div className="col-6 d-flex gap-2">

          <button
            className="btn btn-outline-primary"
            onClick={() => handleSort("asc")}
          >
            Sort: First → Last
          </button>

          <button
            className="btn btn-outline-primary"
            onClick={() => handleSort("desc")}
          >
            Sort: Last → First
          </button>

        </div>
      </div>

      <div className="row justify-content-center mt-3">
        <div className="col-10">
          <h5>Task List</h5>

          <table className='table table-bordered table-hover table-responsive table-striped text-center caption-top'>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Task Name</th>
                <th>Task Description</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {
                list.length > 0 ? list.map((val, index) => (
                  <tr key={val.id}>
                    <td>{startIndex + index + 1}</td>

                    <td style={{ textDecoration: val.completed ? "line-through" : "none" }}>
                      {val.title}
                    </td>

                    <td style={{ textDecoration: val.completed ? "line-through" : "none" }}>
                      {val.description}
                    </td>

                    <td style={{ textDecoration: val.completed ? "line-through" : "none" }}>
                      {val.category}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={val.completed}
                        onChange={() => handleComplete(val.id)}
                      />
                      {val.completed ? " Completed" : " Pending"}
                    </td>
                    <td>
                      <button className='btn btn-outline-danger me-2'
                        onClick={() => handleDelete(val.id)}
                        disabled={!val.completed}
                      >
                        Delete
                      </button>

                      <button className='btn btn-outline-warning'
                        onClick={() => handleEdit(val.id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                )) :
                  <tr>
                    <td colSpan={6}>No tasks found.</td>
                  </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className="row justify-content-center mt-3">
        <div className="col-12 d-flex gap-2 flex-wrap justify-content-center">

          <button
            className='btn btn-outline-secondary'
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={index}
                onClick={() => handlePagination(pageNum)}
                className={`btn ${currentPage === pageNum ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                {pageNum}
              </button>
            )
          })}

          <button
            className='btn btn-outline-secondary'
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next ▶
          </button>

        </div>
      </div>
    </>
  )
}

export default TaskList;
