/**
 * Admin Competitions Management Page
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Reorder,
  motion,
  useDragControls,
  useMotionValue,
  animate,
  type DragControls,
  type MotionValue,
} from 'framer-motion';
import styles from './competitions.module.css';

const inactiveShadow = '0 2px 8px rgba(10, 26, 58, 0.06)';

function useRaisedShadow(value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow);

  useEffect(() => {
    let isActive = false;
    const unsubscribe = value.on('change', (latest) => {
      const wasActive = isActive;
      if (latest !== 0) {
        isActive = true;
        if (isActive !== wasActive) {
          animate(boxShadow, '0 16px 36px rgba(10, 26, 58, 0.18)');
        }
      } else {
        isActive = false;
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow);
        }
      }
    });
    return () => unsubscribe();
  }, [value, boxShadow]);

  return boxShadow;
}

interface ReorderHandleProps {
  dragControls: DragControls;
  isActive: boolean;
  onPress: () => void;
}

function ReorderHandle({ dragControls, isActive, onPress }: ReorderHandleProps) {
  return (
    <motion.button
      type="button"
      aria-label="Reorder field"
      title="Click and drag to reorder"
      animate={{ scale: isActive ? 0.88 : 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
        dragControls.start(e);
      }}
      className={styles.dragHandleBtn}
      style={{ touchAction: 'none' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
        className={styles.dragHandleIcon}
      >
        <circle cx="8" cy="6" r="2" />
        <circle cx="16" cy="6" r="2" />
        <circle cx="8" cy="12" r="2" />
        <circle cx="16" cy="12" r="2" />
        <circle cx="8" cy="18" r="2" />
        <circle cx="16" cy="18" r="2" />
      </svg>
    </motion.button>
  );
}

interface ReorderFieldItemProps {
  field: CustomField;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

function ReorderFieldItem({ field, index, isEditing, onEdit, onDelete }: ReorderFieldItemProps) {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <Reorder.Item
      value={field}
      id={field.id}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        setPressed(false);
      }}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      whileDrag={{
        scale: 1.015,
        zIndex: 50,
        cursor: 'grabbing',
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 35,
      }}
      className={`${styles.customFieldItem} ${isDragging ? styles.dragging : ''} ${isEditing ? styles.fieldItemEditing : ''}`}
    >
      <ReorderHandle
        dragControls={dragControls}
        isActive={isDragging || pressed}
        onPress={() => setPressed(true)}
      />

      <div className={styles.fieldOrder}>
        <span className={styles.orderNumber}>{index + 1}</span>
      </div>

      <div className={styles.fieldInfo}>
        <div className={styles.fieldTitleRow}>
          <strong>{field.label}</strong>
          {isEditing && <span className={styles.editingBadge}>Editing Now</span>}
        </div>
        <span className={styles.fieldMeta}>
          Type: {field.type}
          {field.type === 'checkbox' ? ` (${field.multiSelect ? 'multi-select' : 'single-select'})` : ''} •{' '}
          {field.required ? 'Required' : 'Optional'}
        </span>
        {field.placeholder && (
          <span className={styles.fieldPlaceholder}>
            Placeholder: &quot;{field.placeholder}&quot;
          </span>
        )}
        {field.options && field.options.length > 0 && (
          <span className={styles.fieldOptions}>
            Options: {field.options.join(', ')}
          </span>
        )}
        {field.type === 'file' && (
          <span className={styles.fieldMeta}>
            Accept: {field.fileAccept || 'Any'} • Max: {field.fileMaxSizeMB ?? 5}MB
          </span>
        )}
        {field.type === 'image' && field.imageUrl && (
          <img
            src={field.imageUrl}
            alt={field.label}
            style={{ width: 80, height: 80, objectFit: 'contain', marginTop: 4, borderRadius: 6, border: '1px solid #ddd' }}
          />
        )}
      </div>

      <div className={styles.fieldActions}>
        <button
          type="button"
          onClick={onEdit}
          className={`${styles.btnEdit} ${isEditing ? styles.btnEditActive : ''}`}
          title={isEditing ? 'Currently Editing' : 'Edit Field'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button
          type="button"
          onClick={onDelete}
          className={styles.btnDelete}
          title="Remove Field"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </Reorder.Item>
  );
}

interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkbox' | 'file' | 'image';
  imageUrl?: string;   // for type=image: URL of the image to display
  required: boolean;
  placeholder?: string;
  options?: string[];       // for select and checkbox types
  multiSelect?: boolean;    // for checkbox: allow many vs one
  fileAccept?: string;      // e.g. ".pdf,.docx,image/*"
  fileMaxSizeMB?: number;   // e.g. 5
}

interface Competition {
  _id: string;
  name: string;
  organizer: string;
  date: string;
  description: string;
  deadline: string;
  teamSize: string;
  imageUrl?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  notes?: string;
  isActive: boolean;
  registrationEnabled: boolean;
  registrationStartDate?: string;
  registrationEndDate?: string;
  customFields: CustomField[];
  createdAt: string;
  updatedAt: string;
}

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [attachmentNamePreview, setAttachmentNamePreview] = useState('');
  const [checkboxOptionInput, setCheckboxOptionInput] = useState('');

  // UX refs for redirecting to editing cards
  const formContainerRef = useRef<HTMLDivElement>(null);
  const fieldFormRef = useRef<HTMLDivElement>(null);
  const customFieldsSectionRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const fieldLabelInputRef = useRef<HTMLInputElement>(null);

  // Highlighting states for smooth visual redirection
  const [highlightForm, setHighlightForm] = useState(false);
  const [highlightFieldForm, setHighlightFieldForm] = useState(false);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    organizer: '',
    date: '',
    description: '',
    deadline: '',
    teamSize: '',
    imageUrl: '',
    attachmentUrl: '',
    attachmentName: '',
    notes: '',
    isActive: true,
    registrationEnabled: true,
    registrationStartDate: '',
    registrationEndDate: '',
    customFields: [] as CustomField[],
  });

  const [newField, setNewField] = useState<CustomField>({
    id: '',
    label: '',
    type: 'text',
    required: false,
    placeholder: '',
    options: [],
    multiSelect: false,
    fileAccept: '',
    fileMaxSizeMB: 5,
  });

  // Fetch competitions
  const fetchCompetitions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/competitions');
      const result = await response.json();
      if (result.success) {
        setCompetitions(result.data);
      }
    } catch (error) {
      console.error('Error fetching competitions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'imageUrl') {
      setImagePreview(value);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      setFormData(prev => ({
        ...prev,
        imageUrl: imageData,
      }));
      setImagePreview(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
    ];

    const allowedExtensions = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.txt'];
    const fileName = file.name.toLowerCase();

    const isAllowed = allowedTypes.includes(file.type) || allowedExtensions.some(ext => fileName.endsWith(ext));
    if (!isAllowed) {
      alert('Please select a PDF, DOC, DOCX, PPT, PPTX, or TXT file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Attachment size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const attachmentData = reader.result as string;
      setFormData(prev => ({
        ...prev,
        attachmentUrl: attachmentData,
        attachmentName: file.name,
      }));
      setAttachmentNamePreview(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveField = () => {
    if (!newField.label.trim()) {
      alert('Please enter a field label');
      return;
    }
    if (newField.type === 'image' && !newField.imageUrl) {
      alert('Please enter an image URL for the Image Display field');
      return;
    }

    if (editingFieldId) {
      // Update field in-place preserving its position in the list
      setFormData(prev => ({
        ...prev,
        customFields: prev.customFields.map(f =>
          f.id === editingFieldId ? { ...newField, id: editingFieldId } : f
        ),
      }));
      setEditingFieldId(null);
    } else {
      const field: CustomField = {
        ...newField,
        id: `field_${Date.now()}`,
      };

      setFormData(prev => ({
        ...prev,
        customFields: [...prev.customFields, field],
      }));
    }

    // Reset new field form
    setNewField({
      id: '',
      label: '',
      type: 'text',
      required: false,
      placeholder: '',
      options: [],
      multiSelect: false,
      fileAccept: '',
      fileMaxSizeMB: 5,
      imageUrl: '',
    });
    setCheckboxOptionInput('');
  };

  const handleCancelEditField = () => {
    setEditingFieldId(null);
    setNewField({
      id: '',
      label: '',
      type: 'text',
      required: false,
      placeholder: '',
      options: [],
      multiSelect: false,
      fileAccept: '',
      fileMaxSizeMB: 5,
      imageUrl: '',
    });
    setCheckboxOptionInput('');
  };

  const handleRemoveField = (fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields.filter(f => f.id !== fieldId),
    }));
    if (editingFieldId === fieldId) {
      handleCancelEditField();
    }
  };

  const handleEditField = (fieldId: string) => {
    const field = formData.customFields.find(f => f.id === fieldId);
    if (!field) return;

    setEditingFieldId(fieldId);
    setNewField({ ...field });
    setCheckboxOptionInput('');

    // Smoothly scroll and redirect user to the field editing card
    setTimeout(() => {
      if (fieldFormRef.current) {
        fieldFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (fieldLabelInputRef.current) {
        fieldLabelInputRef.current.focus({ preventScroll: true });
      }
      setHighlightFieldForm(true);
      setTimeout(() => setHighlightFieldForm(false), 1800);
    }, 60);
  };

  // ─── Checkbox option helpers ───
  const addCheckboxOption = () => {
    const trimmed = checkboxOptionInput.trim();
    if (!trimmed) return;
    setNewField(prev => ({ ...prev, options: [...(prev.options || []), trimmed] }));
    setCheckboxOptionInput('');
  };

  const removeCheckboxOption = (idx: number) => {
    setNewField(prev => ({
      ...prev,
      options: (prev.options || []).filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingCompetition
        ? `/api/competitions/${editingCompetition._id}`
        : '/api/competitions';
      
      const method = editingCompetition ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Competition ${editingCompetition ? 'updated' : 'created'} successfully!`);
        fetchCompetitions();
        resetForm();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving competition:', error);
      alert('Failed to save competition');
    }
  };

  const handleEdit = (competition: Competition) => {
    setEditingCompetition(competition);
    setFormData({
      name: competition.name,
      organizer: competition.organizer,
      date: competition.date,
      description: competition.description,
      deadline: competition.deadline,
      teamSize: competition.teamSize,
      imageUrl: competition.imageUrl || '',
      attachmentUrl: competition.attachmentUrl || '',
      attachmentName: competition.attachmentName || '',
      notes: competition.notes || '',
      isActive: competition.isActive,
      registrationEnabled: competition.registrationEnabled ?? true,
      registrationStartDate: competition.registrationStartDate || '',
      registrationEndDate: competition.registrationEndDate || '',
      customFields: competition.customFields || [],
    });
    setImagePreview(competition.imageUrl || '');
    setAttachmentNamePreview(competition.attachmentName || '');
    setEditingFieldId(null);
    setShowForm(true);

    // Smoothly scroll and redirect user to the editing card
    setTimeout(() => {
      if (formContainerRef.current) {
        formContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (nameInputRef.current) {
        nameInputRef.current.focus({ preventScroll: true });
      }
      setHighlightForm(true);
      setTimeout(() => setHighlightForm(false), 2000);
    }, 60);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this competition?')) return;

    try {
      const response = await fetch(`/api/competitions/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        alert('Competition deleted successfully!');
        fetchCompetitions();
      }
    } catch (error) {
      console.error('Error deleting competition:', error);
      alert('Failed to delete competition');
    }
  };

  const downloadRegistrationsCSV = async (competitionId: string, competitionName: string) => {
    try {
      const response = await fetch(`/api/registrations?competitionId=${competitionId}`);
      const result = await response.json();
      
      if (!result.success || !result.data || result.data.length === 0) {
        alert('No registrations found for this competition.');
        return;
      }

      const registrations = result.data;

      const headers = [
        'Full Name',
        'Email',
        'Phone',
        'Competition',
        'Status',
        'Submitted At',
        'Why Join',
        'Expectations'
      ];

      const comp = competitions.find(c => c._id === competitionId);
      const customFieldIds = comp?.customFields?.map(f => f.id) || [];
      const customFieldLabels = comp?.customFields?.map(f => f.label) || [];

      const allHeaders = [...headers, ...customFieldLabels];

      const escapeCSV = (val: any) => {
        if (val === null || val === undefined) return '';
        let str = typeof val === 'object' ? JSON.stringify(val) : String(val);
        str = str.replace(/"/g, '""');
        if (str.includes(',') || str.includes('\n') || str.includes('"')) {
          return `"${str}"`;
        }
        return str;
      };

      const rows = registrations.map((reg: any) => {
        const rowData = [
          reg.fullName,
          reg.email,
          reg.phone,
          reg.competition,
          reg.status,
          new Date(reg.submittedAt).toLocaleString(),
          reg.whyJoin,
          reg.expectations
        ];

        customFieldIds.forEach(id => {
          rowData.push(reg.customFields?.[id] ?? '');
        });

        return rowData.map(escapeCSV).join(',');
      });

      const csvContent = [allHeaders.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      
      const filename = `registrations_${competitionName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CSV:', error);
      alert('Failed to download CSV. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      organizer: '',
      date: '',
      description: '',
      deadline: '',
      teamSize: '',
      imageUrl: '',
      attachmentUrl: '',
      attachmentName: '',
      notes: '',
      isActive: true,
      registrationEnabled: true,
      registrationStartDate: '',
      registrationEndDate: '',
      customFields: [],
    });
    setImagePreview('');
    setAttachmentNamePreview('');
    setEditingCompetition(null);
    setEditingFieldId(null);
    setHighlightForm(false);
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Competitions Management</h1>
        <button
          className={styles.btnPrimary}
          onClick={() => {
            if (!showForm) {
              setEditingCompetition(null);
              setEditingFieldId(null);
              resetForm();
              setShowForm(true);
              setTimeout(() => {
                formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                nameInputRef.current?.focus({ preventScroll: true });
                setHighlightForm(true);
                setTimeout(() => setHighlightForm(false), 1800);
              }, 60);
            } else {
              setShowForm(false);
            }
          }}
        >
          {showForm ? 'Cancel' : '+ New Competition'}
        </button>
      </div>

      {showForm && (
        <div
          ref={formContainerRef}
          className={`${styles.formContainer} ${highlightForm ? styles.formHighlight : ''}`}
        >
          <div className={styles.formTitleRow}>
            <div>
              <h2>{editingCompetition ? `Edit Competition: ${editingCompetition.name}` : 'Create New Competition'}</h2>
              {editingCompetition && (
                <p className={styles.editingSubtitle}>
                  Updating details for <strong>{editingCompetition.name}</strong>
                </p>
              )}
            </div>
            <div className={styles.formTopActions}>
              {editingCompetition && (
                <button
                  type="button"
                  onClick={() => {
                    customFieldsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={styles.btnJumpToFields}
                >
                  ↓ Jump to Custom Fields ({formData.customFields.length})
                </button>
              )}
              <button type="button" onClick={resetForm} className={styles.btnSecondarySmall}>
                ✕ Close Form
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Basic Information */}
            <div className={styles.formSection}>
              <h3>Basic Information</h3>
              
              <div className={styles.formGroup}>
                <label>Competition Name *</label>
                <input
                  ref={nameInputRef}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., e-Yantra Robotics Competition 2026"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Organizer *</label>
                  <input
                    type="text"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., IIT Bombay"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Competition Date *</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., May 15-20, 2026"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Brief description of the competition..."
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Registration Deadline *</label>
                  <input
                    type="text"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., March 15, 2026"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Team Size *</label>
                  <input
                    type="text"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 3-5 members"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Image Upload (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <small style={{ color: '#666', fontSize: '0.85rem' }}>
                  Upload an image for the competition card. It will be saved and shown on the public website.
                </small>
              </div>

              {imagePreview && (
                <div className={styles.imagePreviewWrap}>
                  <label>Preview</label>
                  <img
                    src={imagePreview}
                    alt="Competition preview"
                    className={styles.imagePreview}
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label>Image URL (Optional)</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Supporting File Upload (PDF / DOC / DOCX / PPT / PPTX / TXT)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain"
                  onChange={handleAttachmentUpload}
                />
                <small style={{ color: '#666', fontSize: '0.85rem' }}>
                  Upload a document or presentation to attach to this competition.
                </small>
              </div>

              {attachmentNamePreview && (
                <div className={styles.attachmentPreviewWrap}>
                  <label>Selected File</label>
                  <div className={styles.attachmentPreview}>{attachmentNamePreview}</div>
                </div>
              )}

              <div className={styles.formGroup}>
                <label>Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Additional notes or instructions for this competition..."
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.switchLabel}>
                  <div className={styles.switch}>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                    />
                    <span className={styles.slider}></span>
                  </div>
                  <span>Active (Show in competitions list)</span>
                </label>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.switchLabel}>
                  <div className={styles.switch}>
                    <input
                      type="checkbox"
                      name="registrationEnabled"
                      checked={formData.registrationEnabled}
                      onChange={handleInputChange}
                    />
                    <span className={styles.slider}></span>
                  </div>
                  <span>Enable Registration (Allow students to register)</span>
                </label>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Registration Start Date (Optional)</label>
                  <input
                    type="datetime-local"
                    name="registrationStartDate"
                    value={formData.registrationStartDate}
                    onChange={handleInputChange}
                  />
                  <small style={{color: '#666', fontSize: '0.85rem'}}>Leave empty to start immediately</small>
                </div>

                <div className={styles.formGroup}>
                  <label>Registration End Date (Optional)</label>
                  <input
                    type="datetime-local"
                    name="registrationEndDate"
                    value={formData.registrationEndDate}
                    onChange={handleInputChange}
                  />
                  <small style={{color: '#666', fontSize: '0.85rem'}}>Leave empty for no end date</small>
                </div>
              </div>
            </div>

            {/* Custom Fields */}
            <div ref={customFieldsSectionRef} className={styles.formSection}>
              <div className={styles.sectionHeaderRow}>
                <div>
                  <h3>Custom Form Fields ({formData.customFields.length})</h3>
                  <p className={styles.helpText}>
                    Drag and reorder fields using the grip handle. Students will see fields in this exact order during registration.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    fieldFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    fieldLabelInputRef.current?.focus({ preventScroll: true });
                  }}
                  className={styles.btnAddNewFieldQuick}
                >
                  + Add New Field
                </button>
              </div>

              {/* Display existing custom fields with animated reordering */}
              {formData.customFields.length === 0 ? (
                <div className={styles.emptyFieldsBox}>
                  <p>No custom fields added yet.</p>
                  <small>Add fields below that students need to fill when registering for this competition.</small>
                </div>
              ) : (
                <Reorder.Group
                  axis="y"
                  values={formData.customFields}
                  onReorder={(newFields) => {
                    setFormData((prev) => ({
                      ...prev,
                      customFields: newFields,
                    }));
                  }}
                  className={styles.customFieldsList}
                >
                  {formData.customFields.map((field, index) => (
                    <ReorderFieldItem
                      key={field.id}
                      field={field}
                      index={index}
                      isEditing={editingFieldId === field.id}
                      onEdit={() => handleEditField(field.id)}
                      onDelete={() => handleRemoveField(field.id)}
                    />
                  ))}
                </Reorder.Group>
              )}

              {/* Add or Edit field form card */}
              <div
                ref={fieldFormRef}
                className={`${styles.addFieldForm} ${highlightFieldForm ? styles.fieldFormHighlight : ''} ${editingFieldId ? styles.fieldFormEditingMode : ''}`}
              >
                <div className={styles.fieldFormHeaderRow}>
                  <h4>
                    {editingFieldId ? (
                      <>
                        <span style={{ color: '#10b981' }}>✏️ Editing Field:</span>{' '}
                        {newField.label || 'Untitled'}
                      </>
                    ) : (
                      '+ Add New Custom Field'
                    )}
                  </h4>
                  {editingFieldId && (
                    <button
                      type="button"
                      onClick={handleCancelEditField}
                      className={styles.btnCancelEditField}
                    >
                      ✕ Cancel Edit
                    </button>
                  )}
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Field Label</label>
                    <input
                      ref={fieldLabelInputRef}
                      type="text"
                      value={newField.label}
                      onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                      placeholder="e.g., Project Title"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Field Type</label>
                    <select
                      value={newField.type}
                      onChange={(e) => setNewField({ ...newField, type: e.target.value as any })}
                    >
                      <option value="text">Text Input</option>
                      <option value="email">Email</option>
                      <option value="tel">Phone Number</option>
                      <option value="textarea">Text Area</option>
                      <option value="select">Dropdown</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="file">File Upload</option>
                      <option value="image">Image Display (e.g. QR code)</option>
                    </select>
                  </div>
                </div>

                {newField.type !== 'checkbox' && newField.type !== 'file' && (
                  <div className={styles.formGroup}>
                    <label>Placeholder (Optional)</label>
                    <input
                      type="text"
                      value={newField.placeholder || ''}
                      onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                      placeholder="Placeholder text..."
                    />
                  </div>
                )}

                {newField.type === 'select' && (
                  <div className={styles.formGroup}>
                    <label>Options (comma-separated)</label>
                    <input
                      type="text"
                      value={newField.options?.join(', ') || ''}
                      onChange={(e) => setNewField({ 
                        ...newField, 
                        options: e.target.value.split(',').map(o => o.trim()).filter(Boolean)
                      })}
                      placeholder="Option 1, Option 2, Option 3"
                    />
                  </div>
                )}

                {newField.type === 'checkbox' && (
                  <div className={styles.checkboxOptionsBuilder}>
                    <label>Checkbox Options</label>
                    <p className={styles.checkboxOptionsHint}>Add selectable options for this checkbox field.</p>

                    {/* Existing options list */}
                    {(newField.options || []).length > 0 && (
                      <div className={styles.checkboxOptionsList}>
                        {(newField.options || []).map((opt, i) => (
                          <div key={i} className={styles.checkboxOptionTag}>
                            <span>{opt}</span>
                            <button
                              type="button"
                              className={styles.checkboxOptionRemove}
                              onClick={() => removeCheckboxOption(i)}
                              title="Remove option"
                            >✕</button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add new option */}
                    <div className={styles.checkboxOptionInputRow}>
                      <input
                        type="text"
                        value={checkboxOptionInput}
                        onChange={(e) => setCheckboxOptionInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCheckboxOption(); } }}
                        placeholder="Type an option and press Enter or Add"
                      />
                      <button
                        type="button"
                        className={styles.btnAddOption}
                        onClick={addCheckboxOption}
                      >+ Add</button>
                    </div>

                    {/* Single vs multi-select toggle */}
                    <label className={styles.switchLabel} style={{ marginTop: '0.75rem' }}>
                      <div className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={!!newField.multiSelect}
                          onChange={(e) => setNewField({ ...newField, multiSelect: e.target.checked })}
                        />
                        <span className={styles.slider}></span>
                      </div>
                      <span>Allow multiple selections</span>
                    </label>
                  </div>
                )}

              {newField.type === 'file' && (
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Accepted File Types (Optional)</label>
                    <input
                      type="text"
                      value={newField.fileAccept || ''}
                      onChange={(e) => setNewField({ ...newField, fileAccept: e.target.value })}
                      placeholder="e.g. .pdf,.docx,image/*"
                    />
                    <small style={{ color: '#666', fontSize: '0.85rem' }}>
                      Leave empty to allow all files. Use MIME types or extensions like .pdf,.jpg,image/*
                    </small>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Max File Size (MB)</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={newField.fileMaxSizeMB ?? 5}
                      onChange={(e) => setNewField({ ...newField, fileMaxSizeMB: Number(e.target.value) })}
                    />
                  </div>
                </div>
              )}

              {newField.type === 'image' && (
                <div className={styles.formGroup}>
                  <label>Upload Image <span style={{ color: 'red' }}>*</span></label>

                  {/* File upload */}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ marginBottom: '0.5rem' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 5 * 1024 * 1024) {
                        alert('Image must be less than 5MB');
                        e.target.value = '';
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = () => setNewField({ ...newField, imageUrl: reader.result as string });
                      reader.readAsDataURL(file);
                    }}
                  />
                  <small style={{ color: '#666', fontSize: '0.85rem' }}>
                    Upload from device — or paste a URL below
                  </small>

                  {/* URL fallback */}
                  <input
                    type="url"
                    value={newField.imageUrl?.startsWith('data:') ? '' : (newField.imageUrl || '')}
                    onChange={(e) => setNewField({ ...newField, imageUrl: e.target.value })}
                    placeholder="https://example.com/qr-code.png"
                    style={{ marginTop: '0.5rem' }}
                  />

                  {/* Live preview */}
                  {newField.imageUrl && (
                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img
                        src={newField.imageUrl}
                        alt="Preview"
                        style={{ maxWidth: 180, maxHeight: 180, objectFit: 'contain', borderRadius: 8, border: '1px solid #ddd' }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <button
                        type="button"
                        onClick={() => setNewField({ ...newField, imageUrl: '' })}
                        style={{ fontSize: '0.8rem', color: '#e10600', background: 'none', border: '1px solid #e10600', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              )}


              <div className={styles.formGroup}>
                <label className={styles.switchLabel}>
                  <div className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={newField.required}
                      onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </div>
                  <span>Required Field</span>
                </label>
              </div>

                <div className={styles.fieldFormActionsRow}>
                  <button
                    type="button"
                    onClick={handleSaveField}
                    className={editingFieldId ? styles.btnUpdateField : styles.btnSecondary}
                  >
                    {editingFieldId ? '✓ Update Field' : '+ Add Field to List'}
                  </button>
                  {editingFieldId && (
                    <button
                      type="button"
                      onClick={handleCancelEditField}
                      className={styles.btnSecondary}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary}>
                {editingCompetition ? 'Update Competition' : 'Create Competition'}
              </button>
              <button type="button" onClick={resetForm} className={styles.btnSecondary}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Competitions List */}
      <div className={styles.competitionsList}>
        <h2>All Competitions ({competitions.length})</h2>
        
        {loading ? (
          <div className={styles.loading}>Loading competitions...</div>
        ) : competitions.length === 0 ? (
          <div className={styles.empty}>
            No competitions found. Create your first competition!
          </div>
        ) : (
          <div className={styles.grid}>
            {competitions.map((competition) => {
              // Check registration status
              const now = new Date();
              const startDate = competition.registrationStartDate ? new Date(competition.registrationStartDate) : null;
              const endDate = competition.registrationEndDate ? new Date(competition.registrationEndDate) : null;
              
              let registrationStatus = 'Disabled';
              let registrationColor = '#666';
              
              if (competition.registrationEnabled) {
                if (startDate && now < startDate) {
                  registrationStatus = 'Not Started';
                  registrationColor = '#ff9800';
                } else if (endDate && now > endDate) {
                  registrationStatus = 'Closed';
                  registrationColor = '#f44336';
                } else {
                  registrationStatus = 'Open';
                  registrationColor = '#4caf50';
                }
              }
              
              const isCurrentlyEditing = editingCompetition?._id === competition._id && showForm;

              return (
              <div
                key={competition._id}
                className={`${styles.card} ${isCurrentlyEditing ? styles.activeEditingCard : ''}`}
              >
                {isCurrentlyEditing && (
                  <span className={styles.activeEditingBadge}>✏️ Editing Now</span>
                )}
                <div className={styles.cardHeader}>
                  <h3>{competition.name}</h3>
                  <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                    <span className={`${styles.badge} ${competition.isActive ? styles.active : styles.inactive}`}>
                      {competition.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className={styles.badge} style={{backgroundColor: registrationColor, color: 'white'}}>
                      Registration: {registrationStatus}
                    </span>
                  </div>
                </div>
                
                <div className={styles.cardBody}>
                  <p><strong>Organizer:</strong> {competition.organizer}</p>
                  <p><strong>Date:</strong> {competition.date}</p>
                  <p><strong>Deadline:</strong> {competition.deadline}</p>
                  <p><strong>Team Size:</strong> {competition.teamSize}</p>
                  <p className={styles.description}>{competition.description}</p>
                  
                  {(competition.registrationStartDate || competition.registrationEndDate) && (
                    <div style={{marginTop: '10px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontSize: '0.9rem'}}>
                      {competition.registrationStartDate && (
                        <p style={{margin: '4px 0'}}><strong>Reg. Start:</strong> {new Date(competition.registrationStartDate).toLocaleString()}</p>
                      )}
                      {competition.registrationEndDate && (
                        <p style={{margin: '4px 0'}}><strong>Reg. End:</strong> {new Date(competition.registrationEndDate).toLocaleString()}</p>
                      )}
                    </div>
                  )}
                  
                  {competition.customFields.length > 0 && (
                    <p><strong>Custom Fields:</strong> {competition.customFields.length}</p>
                  )}
                </div>

                <div className={styles.cardActions}>
                  <button
                    onClick={() => handleEdit(competition)}
                    className={`${styles.btnEdit} ${isCurrentlyEditing ? styles.btnEditActive : ''}`}
                    title={isCurrentlyEditing ? 'Currently Editing this Competition' : 'Edit Competition'}
                  >
                    {isCurrentlyEditing ? 'Editing...' : 'Edit'}
                  </button>
                  <button
                    onClick={() => downloadRegistrationsCSV(competition._id, competition.name)}
                    className={styles.btnDownload}
                    title="Download Registrations CSV"
                  >
                    Download CSV
                  </button>
                  <button
                    onClick={() => handleDelete(competition._id)}
                    className={styles.btnDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
