'use client';

import { useState, useEffect } from 'react';
import styles from './submissions.module.css';

interface Submission {
  _id: string;
  fullName: string;
  pid: string;
  driveLink: string;
  status: 'pending' | 'reviewed';
  submittedAt: string;
  notes?: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, [selectedStatus]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      let url = '/api/submissions';
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        let data = result.data || [];
        if (selectedStatus !== 'all') {
          data = data.filter((sub: Submission) => sub.status === selectedStatus);
        }
        setSubmissions(data);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (submissionId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/submissions/${submissionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchSubmissions();
        if (selectedSubmission?._id === submissionId) {
          setSelectedSubmission({ ...selectedSubmission, status: newStatus as any });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (submissionId: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const response = await fetch(`/api/submissions/${submissionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSubmissions();
        setShowDetails(false);
        setSelectedSubmission(null);
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  const viewDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowDetails(true);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'reviewed':
        return styles.statusReviewed;
      default:
        return styles.statusPending;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const downloadCSV = () => {
    if (submissions.length === 0) {
      alert('No submissions available to download.');
      return;
    }

    const headers = ['Student Name', 'PID', 'Google Drive Link', 'Submitted Date', 'Status'];

    const escapeCSV = (val: any) => {
      if (val === null || val === undefined) return '';
      let str = String(val);
      str = str.replace(/"/g, '""');
      if (str.includes(',') || str.includes('\n') || str.includes('"')) {
        return `"${str}"`;
      }
      return str;
    };

    const rows = submissions.map(sub => [
      sub.fullName,
      sub.pid,
      sub.driveLink,
      formatDate(sub.submittedAt),
      sub.status
    ].map(escapeCSV).join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);

    let filename = 'task_submissions';
    if (selectedStatus !== 'all') {
      filename += `_${selectedStatus}`;
    }
    filename += `_${new Date().toISOString().split('T')[0]}.csv`;

    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Task Submissions</h1>
          <p className={styles.subtitle}>View and manage student Google Drive folder links</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{submissions.length}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {submissions.filter(s => s.status === 'pending').length}
            </span>
            <span className={styles.statLabel}>Pending</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {submissions.filter(s => s.status === 'reviewed').length}
            </span>
            <span className={styles.statLabel}>Reviewed</span>
          </div>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Status Filter</label>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>

        <button onClick={fetchSubmissions} className={styles.refreshBtn}>
          🔄 Refresh
        </button>

        <button onClick={downloadCSV} className={styles.downloadBtn}>
          📥 Download CSV
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading submissions...</div>
      ) : submissions.length === 0 ? (
        <div className={styles.empty}>
          <p>No submissions found</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>PID</th>
                <th>Google Drive Folder Link</th>
                <th>Submitted Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub._id}>
                  <td className={styles.nameCell}>{sub.fullName}</td>
                  <td className={styles.pidCell}>{sub.pid}</td>
                  <td>
                    <a 
                      href={sub.driveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.driveLink}
                    >
                      Open Google Drive Folder 📤
                    </a>
                  </td>
                  <td className={styles.dateCell}>{formatDate(sub.submittedAt)}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusBadgeClass(sub.status)}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <button onClick={() => viewDetails(sub)} className={styles.viewBtn}>
                      👁️ Details
                    </button>
                    <select
                      value={sub.status}
                      onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                      className={styles.statusSelect}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                    </select>
                    <button onClick={() => handleDelete(sub._id)} className={styles.deleteBtn}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedSubmission && (
        <div className={styles.modal} onClick={() => setShowDetails(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Submission Details</h2>
              <button onClick={() => setShowDetails(false)} className={styles.closeBtn}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.detailSection}>
                <h3>Student Information</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Team Name</label>
                    <p>{selectedSubmission.teamName || '—'}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Leader Name</label>
                    <p>{selectedSubmission.fullName}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <label>PID</label>
                    <p>{selectedSubmission.pid}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Problem Statement</label>
                    <p>{selectedSubmission.problemStatement || '—'}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <label>PPT File Link</label>
                    <p>
                      <a 
                        href={selectedSubmission.driveLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.driveLinkLarge}
                      >
                        {selectedSubmission.driveLink}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h3>Evaluation Status</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Submitted At</label>
                    <p>{formatDate(selectedSubmission.submittedAt)}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Current Status</label>
                    <span className={`${styles.statusBadge} ${getStatusBadgeClass(selectedSubmission.status)}`}>
                      {selectedSubmission.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <select
                value={selectedSubmission.status}
                onChange={(e) => handleStatusChange(selectedSubmission._id, e.target.value)}
                className={styles.statusSelectLarge}
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
              </select>
              <button onClick={() => handleDelete(selectedSubmission._id)} className={styles.deleteBtnLarge}>
                Delete Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
