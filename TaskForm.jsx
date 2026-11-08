import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const TaskForm = ({ show, handleClose, addTask, editTask, taskToEdit }) => {
  const [task, setTask] = useState({ name: '', priority: 'Medium', status: 'To Do' });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({ name: '', priority: 'Medium', status: 'To Do' });
    }
  }, [taskToEdit, show]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name.trim()) return;

    if (taskToEdit) {
      editTask(task);
    } else {
      addTask(task);
    }

    setTask({ name: '', priority: 'Medium', status: 'To Do' });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0 pb-0 bg-light">
        <Modal.Title className="fw-bold text-success fs-5">
          {taskToEdit ? '✨ Edit Task' : '✨ Tambah Task Baru'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light pt-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="taskName">
            <Form.Label className="text-muted small fw-bold">NAMA KEGIATAN</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Contoh: Belajar React JS..."
              value={task.name}
              onChange={handleChange}
              className="rounded-3 py-2 border-success-subtle bg-white shadow-sm"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskPriority">
            <Form.Label className="text-muted small fw-bold">PRIORITAS</Form.Label>
            <Form.Select 
              name="priority" 
              value={task.priority} 
              onChange={handleChange} 
              className="rounded-3 py-2 border-success-subtle bg-white shadow-sm"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4" controlId="taskStatus">
            <Form.Label className="text-muted small fw-bold">STATUS</Form.Label>
            <Form.Select 
              name="status" 
              value={task.status} 
              onChange={handleChange} 
              className="rounded-3 py-2 border-success-subtle bg-white shadow-sm"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="light" className="rounded-pill px-4 text-secondary shadow-sm" onClick={handleClose}>
              Batal
            </Button>
            <Button variant="success" type="submit" className="rounded-pill px-4 shadow-sm" style={{ backgroundColor: '#0f766e', border: 'none' }}>
              {taskToEdit ? 'Simpan' : 'Tambah Task'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskForm;