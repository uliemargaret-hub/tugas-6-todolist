import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  return (
    <div style={{ backgroundColor: '#f4fbf7', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Container className="py-5" style={{ maxWidth: '850px' }}>
        
        {/* Header Estetik dengan Judul Baru */}
        <div className="bg-white p-4 rounded-4 shadow-sm border border-success-subtle mb-4">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge rounded-pill bg-success" style={{ width: '8px', height: '8px', padding: 0 }}></span>
            <span className="text-success fw-bold small" style={{ letterSpacing: '0.5px' }}>PRODUCTIVITY SPACE</span>
          </div>
          
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
            <div>
              <h1 className="fw-bold text-dark mb-1" style={{ fontSize: '1.9rem', fontFamily: 'system-ui, sans-serif' }}>
                ✨ My To Do List
              </h1>
              <p className="text-muted small mb-0">Atur agenda harianmu dengan lebih mudah.</p>
            </div>
            <Button 
              variant="success" 
              className="rounded-pill px-4 py-2 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2"
              onClick={handleShowForm}
              style={{ backgroundColor: '#0f766e', border: 'none' }}
            >
              <span className="fs-5 leading-none">+</span> Add Task
            </Button>
          </div>
        </div>

        {/* Tab Filter Kategori */}
        <div className="d-flex gap-2 mb-4 overflow-auto pb-2">
          {['All', 'To Do', 'In Progress', 'Done'].map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? 'success' : 'light'}
              className={`rounded-pill px-4 py-2 fw-medium border-0 shadow-sm ${
                filter === cat ? 'text-white' : 'text-secondary bg-white'
              }`}
              style={filter === cat ? { backgroundColor: '#0f766e' } : {}}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Daftar Task */}
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          showEditForm={showEditForm}
        />

        {/* Modal Form */}
        <TaskForm
          show={showForm}
          handleClose={handleCloseForm}
          addTask={addTask}
          editTask={editTask}
          taskToEdit={taskToEdit}
        />
      </Container>
    </div>
  );
}

App.displayName = 'App';
export default App;