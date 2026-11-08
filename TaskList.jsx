import React from 'react';
import { Button, Card, Badge } from 'react-bootstrap';

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  // Lencana Prioritas sesuai ketentuan modul (merah: High, kuning: Medium, hijau: Low)[cite: 22]
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return <Badge bg="danger" className="px-3 py-2 rounded-pill fw-normal">Priority: High</Badge>;
      case 'Medium':
        return <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill fw-normal">Priority: Medium</Badge>;
      case 'Low':
        return <Badge bg="success" className="px-3 py-2 rounded-pill fw-normal">Priority: Low</Badge>;
      default:
        return <Badge bg="secondary" className="px-3 py-2 rounded-pill fw-normal">{priority}</Badge>;
    }
  };

  // Indikator Status & Lingkaran Progres di sebelah tombol aksi
  const getProgressIndicator = (status) => {
    switch (status) {
      case 'Done':
        return (
          <div className="d-flex align-items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="3">
              <circle cx="12" cy="12" r="9" strokeDasharray="56.5" strokeDashoffset="0" />
            </svg>
            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-normal">Done</span>
          </div>
        );
      case 'In Progress':
        return (
          <div className="d-flex align-items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0dcaf0" strokeWidth="3">
              <circle cx="12" cy="12" r="9" strokeDasharray="56.5" strokeDashoffset="28" />
            </svg>
            <span className="badge bg-info bg-opacity-10 text-info px-3 py-2 rounded-pill fw-normal">In Progress</span>
          </div>
        );
      case 'To Do':
      default:
        return (
          <div className="d-flex align-items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="3">
              <circle cx="12" cy="12" r="9" strokeDasharray="56.5" strokeDashoffset="56.5" />
            </svg>
            <span className="badge bg-secondary bg-opacity-10 text-secondary px-3 py-2 rounded-pill fw-normal">To Do</span>
          </div>
        );
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-5 bg-white rounded-4 shadow-sm p-4 border border-success-subtle">
        <div className="mb-2 fs-3">🌱</div>
        <h5 className="fw-semibold text-success">Belum ada tugas yang ditambahkan</h5>
        <p className="small mb-0 text-muted">Silakan klik tombol <span className="fw-bold text-success">"+ Add Task"</span> di atas untuk mulai membuat agenda harimu.</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {tasks.map((task) => (
        <Card className="border-0 shadow-sm rounded-4 p-2 bg-white border border-success-subtle hover-shadow" key={task.id}>
          <Card.Body className="d-flex justify-content-between align-items-center py-3 px-4">
            <div>
              <span className="text-success small fw-bold d-block mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>TASK</span>
              <h4 className="fw-bold text-dark mb-3 fs-5">{task.name}</h4>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                {getPriorityBadge(task.priority)}
                {getProgressIndicator(task.status)}
              </div>
            </div>

            {/* Tombol Aksi & Lingkaran Progres dipindah ke sebelah sini */}
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex gap-2">
                <Button
                  variant="light"
                  size="sm"
                  className="rounded-circle p-2 d-flex align-items-center justify-content-center text-success border border-success-subtle shadow-sm"
                  style={{ width: '38px', height: '38px' }}
                  onClick={() => showEditForm(task)}
                  title="Edit"
                >
                  ✏️
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  className="rounded-circle p-2 d-flex align-items-center justify-content-center text-danger border border-danger-subtle shadow-sm"
                  style={{ width: '38px', height: '38px' }}
                  onClick={() => deleteTask(task.id)}
                  title="Delete"
                >
                  🗑️
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;