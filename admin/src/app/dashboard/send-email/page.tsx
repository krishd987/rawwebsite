'use client';

import { useState, useEffect } from 'react';
import styles from './send-email.module.css';

interface Competition {
  _id: string;
  name: string;
}

interface Registrant {
  _id: string;
  fullName: string;
  email: string;
  status: string;
}

export default function SendEmailPage() {
  const [recipients, setRecipients] = useState<string>('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [templateType, setTemplateType] = useState<string>('custom');
  const [sending, setSending] = useState(false);
  const [emailConfigured, setEmailConfigured] = useState<boolean | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);

  // Competition email fetch state
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<string>('');
  const [registrants, setRegistrants] = useState<Registrant[]>([]);
  const [selectedRegistrantIds, setSelectedRegistrantIds] = useState<Set<string>>(new Set());
  const [loadingRegistrants, setLoadingRegistrants] = useState(false);

  useEffect(() => {
    checkEmailConfig();
    fetchCompetitions();
  }, []);

  const checkEmailConfig = async () => {
    try {
      const response = await fetch('/api/check-email-config');
      const result = await response.json();
      setEmailConfigured(result.configured);
    } catch (error) {
      console.error('Error checking email config:', error);
      setEmailConfigured(false);
    }
  };

  const fetchCompetitions = async () => {
    try {
      const response = await fetch('/api/competitions');
      const result = await response.json();
      if (result.success) {
        setCompetitions(result.data);
      }
    } catch (error) {
      console.error('Error fetching competitions:', error);
    }
  };

  const fetchRegistrantsForCompetition = async (competitionId: string) => {
    if (!competitionId) {
      setRegistrants([]);
      setSelectedRegistrantIds(new Set());
      return;
    }
    setLoadingRegistrants(true);
    try {
      const response = await fetch(`/api/registrations?competitionId=${competitionId}`);
      const result = await response.json();
      if (result.success) {
        setRegistrants(result.data);
        // Pre-select all by default
        setSelectedRegistrantIds(new Set(result.data.map((r: Registrant) => r._id)));
      }
    } catch (error) {
      console.error('Error fetching registrants:', error);
    } finally {
      setLoadingRegistrants(false);
    }
  };

  const handleCompetitionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedCompetitionId(id);
    fetchRegistrantsForCompetition(id);
  };

  const toggleRegistrant = (id: string) => {
    setSelectedRegistrantIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAllRegistrants = () =>
    setSelectedRegistrantIds(new Set(registrants.map(r => r._id)));

  const clearAllRegistrants = () =>
    setSelectedRegistrantIds(new Set());

  const applySelectedEmails = () => {
    const emails = registrants
      .filter(r => selectedRegistrantIds.has(r._id))
      .map(r => r.email);
    setRecipients(prev => {
      const existing = prev.trim();
      return existing ? `${existing}\n${emails.join('\n')}` : emails.join('\n');
    });
  };

  const validateEmails = (emailString: string): string[] => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailString
      .split(/[,\n;]/)
      .map(e => e.trim())
      .filter(e => e.length > 0 && emailRegex.test(e));
  };

  const handleSendEmails = async () => {
    if (!subject.trim()) { alert('Please enter an email subject'); return; }
    if (!message.trim()) { alert('Please enter an email message'); return; }
    if (!recipients.trim()) { alert('Please enter at least one email address'); return; }

    const validEmails = validateEmails(recipients);
    if (validEmails.length === 0) {
      alert('No valid email addresses found. Please check your input.');
      return;
    }

    const rawCount = recipients.split(/[,\n;]/).filter(e => e.trim()).length;
    const invalidCount = rawCount - validEmails.length;
    if (invalidCount > 0) {
      if (!confirm(`Found ${invalidCount} invalid email(s). Continue sending to ${validEmails.length} valid email(s)?`)) return;
    }

    setSending(true);
    try {
      const totalSizeMB = attachments.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024);
      if (totalSizeMB > 10) {
        if (!confirm(`Total attachment size is ${totalSizeMB.toFixed(2)}MB. Large attachments may fail on deployment. Continue?`)) {
          setSending(false);
          return;
        }
      }

      let response: Response;

      if (attachments.length > 0) {
        const formData = new FormData();
        formData.append('recipients', JSON.stringify(validEmails));
        formData.append('subject', subject);
        formData.append('message', message);
        formData.append('templateType', templateType);
        attachments.forEach(file => formData.append('attachments', file));
        response = await fetch('/api/send-direct-email', { method: 'POST', body: formData });
      } else {
        response = await fetch('/api/send-direct-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recipients: validEmails, subject, message, templateType }),
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      if (result.success) {
        alert(`Email sent successfully to ${result.sentCount} recipient(s)!`);
        setRecipients('');
        setSubject('');
        setMessage('');
        setAttachments([]);
      } else {
        alert('Failed to send emails: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert('Error sending emails: ' + errorMessage);
    } finally {
      setSending(false);
    }
  };

  const recipientCount = validateEmails(recipients).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', display: 'inline-block', verticalAlign: 'middle' }}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          Send Email
        </h1>
        <p className={styles.subtitle}>Send emails directly with Team RAW template to multiple recipients</p>
      </div>

      {emailConfigured === false && (
        <div className={styles.warningBanner}>
          <span className={styles.warningIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </span>
          <span>
            Email is not configured. Please set up EMAIL_USER and EMAIL_PASS environment variables.
            See <strong>EMAIL_SETUP.md</strong> for instructions.
          </span>
        </div>
      )}

      <div className={styles.formContainer}>

        {/* ── Fetch Emails by Competition ── */}
        <div className={styles.formSection}>
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }}>
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
              <path d="M12 2a6 6 0 0 1 6 6v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z"></path>
            </svg>
            Fetch Emails by Competition
          </h3>
          <p className={styles.helpText}>
            Select a competition to load all registered students and choose who to contact
          </p>

          <select
            className={styles.templateSelect}
            value={selectedCompetitionId}
            onChange={handleCompetitionChange}
            disabled={sending}
          >
            <option value="">— Select a competition —</option>
            {competitions.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          {loadingRegistrants && (
            <p className={styles.helpText} style={{ marginTop: '0.75rem' }}>Loading registrants…</p>
          )}

          {!loadingRegistrants && selectedCompetitionId && registrants.length === 0 && (
            <p className={styles.helpText} style={{ marginTop: '0.75rem', color: '#e10600' }}>
              No registrations found for this competition.
            </p>
          )}

          {!loadingRegistrants && registrants.length > 0 && (
            <div className={styles.registrantBox}>
              <div className={styles.registrantHeader}>
                <span className={styles.registrantCount}>
                  {selectedRegistrantIds.size} / {registrants.length} selected
                </span>
                <div className={styles.registrantActions}>
                  <button type="button" onClick={selectAllRegistrants} className={styles.smallBtn}>
                    Select All
                  </button>
                  <button type="button" onClick={clearAllRegistrants} className={styles.smallBtn}>
                    Clear All
                  </button>
                </div>
              </div>

              <div className={styles.registrantList}>
                {registrants.map(r => (
                  <label key={r._id} className={styles.registrantItem}>
                    <input
                      type="checkbox"
                      checked={selectedRegistrantIds.has(r._id)}
                      onChange={() => toggleRegistrant(r._id)}
                    />
                    <span className={styles.registrantName}>{r.fullName}</span>
                    <span className={styles.registrantEmail}>{r.email}</span>
                    <span className={`${styles.statusChip} ${
                      r.status === 'approved' ? styles.chipApproved :
                      r.status === 'rejected' ? styles.chipRejected :
                      styles.chipPending
                    }`}>{r.status}</span>
                  </label>
                ))}
              </div>

              <button
                type="button"
                onClick={applySelectedEmails}
                className={styles.applyBtn}
                disabled={selectedRegistrantIds.size === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }}>
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add {selectedRegistrantIds.size} email{selectedRegistrantIds.size !== 1 ? 's' : ''} to Recipients
              </button>
            </div>
          )}
        </div>

        {/* ── Template ── */}
        <div className={styles.formSection}>
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            Select Email Template
          </h3>
          <p className={styles.helpText}>Choose a pre-built template or use custom message format</p>
          <select
            className={styles.templateSelect}
            value={templateType}
            onChange={(e) => setTemplateType(e.target.value)}
            disabled={sending}
          >
            <option value="custom">Custom Message (Basic Template)</option>
            <option value="inquiry">Template 1: General Inquiry Response</option>
            <option value="collaboration">Template 2: Collaboration Request</option>
            <option value="licensing">Template 3: Licensing/Permission Request</option>
            <option value="event">Template 4: Event Invitation</option>
            <option value="recruitment">Template 5: Recruitment/Team Communication</option>
            <option value="quick">Template 6: Quick Professional Response</option>
          </select>
        </div>

        {/* ── Recipients ── */}
        <div className={styles.formSection}>
          <h3>Recipients</h3>
          <p className={styles.helpText}>
            Enter email addresses separated by commas, semicolons, or new lines — or use the competition picker above
          </p>
          <textarea
            className={styles.recipientsInput}
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            placeholder="example1@email.com, example2@email.com&#10;example3@email.com"
            rows={6}
            disabled={sending}
          />
          {recipients && (
            <p className={styles.recipientCount}>
              Valid email addresses: <strong>{recipientCount}</strong>
            </p>
          )}
        </div>

        {/* ── Subject ── */}
        <div className={styles.formSection}>
          <h3>Subject</h3>
          <input
            type="text"
            className={styles.subjectInput}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
            disabled={sending}
          />
        </div>

        {/* ── Message ── */}
        <div className={styles.formSection}>
          <h3>Message</h3>
          <p className={styles.helpText}>
            Compose your message. It will be sent with Team RAW&apos;s professional email template.
          </p>
          <textarea
            className={styles.messageInput}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            rows={12}
            disabled={sending}
          />
        </div>

        {/* ── Attachments ── */}
        <div className={styles.formSection}>
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }}>
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
            Attachments
          </h3>
          <p className={styles.helpText}>
            Add files to attach. <strong>Important:</strong> Total size should be under 4MB for reliable delivery. Each file max 25MB.
          </p>
          <input
            type="file"
            className={styles.fileInput}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              const oversized = files.find(f => f.size > 25 * 1024 * 1024);
              if (oversized) {
                alert(`File "${oversized.name}" exceeds 25MB limit`);
                e.target.value = '';
                return;
              }
              const currentSize = attachments.reduce((sum, f) => sum + f.size, 0);
              const newSize = files.reduce((sum, f) => sum + f.size, 0);
              if (currentSize + newSize > 4 * 1024 * 1024) {
                alert(`Total attachment size would exceed 4MB recommended limit.`);
              }
              setAttachments(prev => [...prev, ...files]);
              e.target.value = '';
            }}
            multiple
            disabled={sending}
          />
          {attachments.length > 0 && (
            <div className={styles.attachmentsList}>
              {attachments.map((file, index) => (
                <div key={index} className={styles.attachmentItem}>
                  <span className={styles.fileName}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                  <button
                    onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                    className={styles.removeBtn}
                    disabled={sending}
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.templatePreview}>
          <h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }}>
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
            Email Template Info
          </h4>
          <p style={{ fontSize: '14px', marginBottom: '10px', color: '#444' }}>
            <strong>Selected:</strong> {
              templateType === 'custom' ? 'Custom Message' :
              templateType === 'inquiry' ? 'General Inquiry Response' :
              templateType === 'collaboration' ? 'Collaboration Request' :
              templateType === 'licensing' ? 'Licensing/Permission Request' :
              templateType === 'event' ? 'Event Invitation' :
              templateType === 'recruitment' ? 'Recruitment Communication' :
              'Quick Professional Response'
            }
          </p>
          <ul>
            <li>Uses EMAIL_TEMPLATE.txt format</li>
            <li>Simple, professional plain text</li>
            <li>Team RAW branding automatically added</li>
            <li>Complete contact information included</li>
            <li>Compatible with all email clients</li>
          </ul>
          <p style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
            Your message will be wrapped with the selected Team RAW template
          </p>
        </div>

        <div className={styles.actions}>
          <button
            onClick={handleSendEmails}
            className={styles.sendBtn}
            disabled={sending || emailConfigured === false || !recipients.trim() || !subject.trim() || !message.trim()}
          >
            {sending ? (
              <span>Sending...</span>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }}>
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Send Email
              </>
            )}
          </button>
          <button
            onClick={() => {
              if (confirm('Clear all fields?')) {
                setRecipients('');
                setSubject('');
                setMessage('');
              }
            }}
            className={styles.clearBtn}
            disabled={sending}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }}>
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Clear
          </button>
        </div>

      </div>
    </div>
  );
}
