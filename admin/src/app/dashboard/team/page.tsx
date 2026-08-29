/**
 * Author: Antigravity
 * Admin Page for Team Members Management Dashboard (CRUD)
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './team.module.css';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  department: string;
  domain?: string;
  domains?: string[];
  email?: string;
  phone?: string;
  linkedin?: string;
  imageUrl: string;
  category: 'core' | 'mentors' | 'members';
  responsibilities?: string[];
  createdAt?: string;
}

export default function TeamManagementPage() {
  const searchParams = useSearchParams();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal / Form display states
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'core' | 'mentors' | 'members'>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  
  // Form input states
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    category: 'members' as TeamMember['category'],
    department: 'Software',
    domain: '',
    email: '',
    phone: '',
    linkedin: '',
    imageUrl: '/placeholder-avatar.png',
  });
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  
  // Image Upload States
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [formImageError, setFormImageError] = useState(false);

  // Role and Domain dropdown/checkbox states
  const roleOptions = [
    'EXECUTIVE MEMBER',
    'Convener',
    'Co-Convener',
    'CRC',
    'Webmaster',
    'Social Media Lead',
    'Technical Head',
    'Publicity Head',
    'Documentation Head',
    'Treasurer',
    'Mentor'
  ];
  const [selectedRoleType, setSelectedRoleType] = useState('EXECUTIVE MEMBER');
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const handleDomainCheckboxChange = (domainId: string, checked: boolean) => {
    setSelectedDomains(prev => {
      if (checked) {
        return [...prev, domainId];
      } else {
        return prev.filter(id => id !== domainId);
      }
    });
  };
  
  // Toast notifications state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  };

  const getFullImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    const base = getApiUrl();
    return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const getInitials = (name: string) => {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      '#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', 
      '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // Fetch all team members
  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${getApiUrl()}/api/team`);
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      const data = await response.json();
      if (data.success) {
        setMembers(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch team members');
      }
    } catch (err) {
      console.error('Error fetching members:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Listen to searchParams to open add form if ?action=add is set
  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      openAddForm();
    }
  }, [searchParams]);

  // Open Form to Add Member
  const openAddForm = () => {
    setEditingMember(null);
    setFormImageError(false);
    setSelectedRoleType('EXECUTIVE MEMBER');
    setCustomRoleInput('');
    setSelectedDomains([]);
    setFormData({
      name: '',
      role: '',
      category: 'members',
      department: 'Software',
      domain: '',
      email: '',
      phone: '',
      linkedin: '',
      imageUrl: '/Ramjee.jpg', // Safe local fallback default
    });
    setResponsibilities(['']);
    setShowForm(true);
  };

  // Open Form to Edit Member
  const openEditForm = (member: TeamMember) => {
    setEditingMember(member);
    setFormImageError(false);
    
    // Set standard or custom role select option
    const isStandard = roleOptions.includes(member.role);
    if (isStandard) {
      setSelectedRoleType(member.role);
      setCustomRoleInput('');
    } else {
      setSelectedRoleType('Other');
      setCustomRoleInput(member.role);
    }
    
    // Set domains
    setSelectedDomains(member.domains || []);

    setFormData({
      name: member.name,
      role: member.role,
      category: member.category,
      department: member.department,
      domain: member.domain || '',
      email: member.email || '',
      phone: member.phone || '',
      linkedin: member.linkedin || '',
      imageUrl: member.imageUrl,
    });
    setResponsibilities(member.responsibilities && member.responsibilities.length > 0 ? [...member.responsibilities] : ['']);
    setShowForm(true);
  };

  // Close Form
  const closeForm = () => {
    setShowForm(false);
    setEditingMember(null);
  };

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Responsibility Changes
  const handleRespChange = (index: number, value: string) => {
    setResponsibilities(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addRespInput = () => {
    setResponsibilities(prev => [...prev, '']);
  };

  const removeRespInput = (index: number) => {
    setResponsibilities(prev => prev.filter((_, idx) => idx !== index));
  };

  // Handle File upload to Cloudinary via admin local upload endpoint
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size exceeds 5MB limit', 'error');
      return;
    }

    setUploadingImage(true);
    showToast('Uploading photo...', 'success');

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result as string;

        // Fetch local upload API
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileData: base64data,
            filename: file.name,
            folder: 'team-photos',
          }),
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setFormImageError(false);
          setFormData(prev => ({ ...prev, imageUrl: data.url }));
          showToast('Photo uploaded successfully!', 'success');
        } else {
          throw new Error(data.message || 'Upload failed');
        }
        setUploadingImage(false);
      };
    } catch (err) {
      console.error('Photo upload error:', err);
      showToast('Failed to upload image', 'error');
      setUploadingImage(false);
    }
  };

  // Save (Submit Form)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.role.trim() || !formData.imageUrl) {
      showToast('Name, Role, and Photo are required', 'error');
      return;
    }

    // Filter out empty responsibilities
    const cleanResponsibilities = responsibilities.filter(r => r.trim() !== '');

    const finalRole = selectedRoleType === 'Other' ? customRoleInput.trim() : selectedRoleType;
    if (!finalRole) {
      showToast('Role / Designation is required', 'error');
      return;
    }

    const memberPayload = {
      ...formData,
      role: finalRole,
      domains: selectedDomains,
      responsibilities: cleanResponsibilities,
    };

    try {
      const url = editingMember 
        ? `${getApiUrl()}/api/team/${editingMember._id}` 
        : `${getApiUrl()}/api/team`;
      
      const method = editingMember ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberPayload),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        showToast(editingMember ? 'Member details updated!' : 'Member added successfully!', 'success');
        closeForm();
        fetchMembers();
      } else {
        throw new Error(resData.message || 'Failed to save member');
      }
    } catch (err) {
      console.error('Error saving member:', err);
      showToast(err instanceof Error ? err.message : 'Failed to save member', 'error');
    }
  };

  // Delete Team Member
  const handleDeleteMember = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this member card? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${getApiUrl()}/api/team/${id}`, {
        method: 'DELETE',
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        showToast('Member card removed successfully', 'success');
        fetchMembers();
      } else {
        throw new Error(resData.message || 'Failed to delete member');
      }
    } catch (err) {
      console.error('Error deleting member:', err);
      showToast(err instanceof Error ? err.message : 'Failed to remove member', 'error');
    }
  };

  // Filtered members list based on query and selection filters
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || member.category === categoryFilter;
    
    const matchesDept = deptFilter === 'all' || member.department === deptFilter;
    
    return matchesSearch && matchesCategory && matchesDept;
  });

  // Calculate dynamic stats
  const coreCount = members.filter(m => m.category === 'core').length;
  const mentorCount = members.filter(m => m.category === 'mentors').length;
  const memberCount = members.filter(m => m.category === 'members').length;

  return (
    <div className={styles.teamPage}>
      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Team Members</h1>
          <p className={styles.subtitle}>Manage website team profiles, core roles, domains, and department heads</p>
        </div>
        <button className={styles.createButton} onClick={openAddForm}>
          + Add Team Member
        </button>
      </div>

      {/* Dynamic Statistics Panel */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Profiles</div>
          <div className={styles.statValue}>{loading ? '...' : members.length}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Core Team</div>
          <div className={styles.statValue}>{loading ? '...' : coreCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Mentors</div>
          <div className={styles.statValue}>{loading ? '...' : mentorCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>General Members</div>
          <div className={styles.statValue}>{loading ? '...' : memberCount}</div>
        </div>
      </div>

      {/* Form Card (Add/Edit Modal Drawer) */}
      {showForm && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>
            {editingMember ? `Edit Profile: ${editingMember.name}` : 'Add New Team Member'}
          </h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            
            {/* Image Upload Area */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Profile Photo *</label>
              <div className={styles.uploadContainer}>
                <div className={styles.previewWrapper}>
                  {(!formData.imageUrl || formImageError) ? (
                    <div className={styles.initialsAvatarLarge} style={{ backgroundColor: getAvatarColor(formData.name || 'New Member') }}>
                      {getInitials(formData.name || 'New Member')}
                    </div>
                  ) : (
                    <img 
                      src={getFullImageUrl(formData.imageUrl)} 
                      alt="Profile Preview" 
                      className={styles.avatarImage} 
                      onError={() => setFormImageError(true)} 
                    />
                  )}
                </div>
                <div className={styles.uploadButtonWrapper}>
                  <input
                    type="file"
                    id="team-photo-file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className={styles.uploadFileBtn}
                    onClick={() => document.getElementById('team-photo-file')?.click()}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? 'Uploading...' : 'Change Photo'}
                  </button>
                  <span className={styles.uploadHint}>Max 5MB. JPG, PNG or WebP formats supported.</span>
                </div>
              </div>
            </div>

            {/* Basic Info Row */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Full Name *</label>
                <input
                  className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="role">Role / Designation *</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <select
                    className={styles.select}
                    id="roleSelect"
                    value={selectedRoleType}
                    onChange={(e) => setSelectedRoleType(e.target.value)}
                    style={{ flex: 1, minWidth: '200px' }}
                  >
                    <option value="EXECUTIVE MEMBER">Executive Member</option>
                    <option value="Convener">Convener</option>
                    <option value="Co-Convener">Co-Convener</option>
                    <option value="CRC">CRC</option>
                    <option value="Webmaster">Webmaster</option>
                    <option value="Social Media Lead">Social Media Lead</option>
                    <option value="Technical Head">Technical Head</option>
                    <option value="Publicity Head">Publicity Head</option>
                    <option value="Documentation Head">Documentation Head</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Other">Other (Custom Role)</option>
                  </select>
                  {selectedRoleType === 'Other' && (
                    <input
                      className={styles.input}
                      type="text"
                      id="customRole"
                      value={customRoleInput}
                      onChange={(e) => setCustomRoleInput(e.target.value)}
                      placeholder="Enter custom role"
                      style={{ flex: 1, minWidth: '200px' }}
                      required
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Categorization Row */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="category">Category *</label>
                <select
                  className={styles.select}
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="core">Core Team</option>
                  <option value="mentors">Mentors</option>
                  <option value="members">General Members</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="department">Department *</label>
                <select
                  className={styles.select}
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="Management">Management</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Software">Software</option>
                  <option value="Alumni">Alumni</option>
                </select>
              </div>
            </div>

            {/* Domains Checkbox Group (Red Boxes on Website) */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Associated Domains (Renders red outline boxes on website)</label>
              <div className={styles.checkboxGroup}>
                {[
                  { id: 'mechanical', name: 'Mechanical' },
                  { id: 'electronics', name: 'Electronics' },
                  { id: 'software', name: 'Software' },
                  { id: 'rnd', name: 'R&D' },
                  { id: 'event', name: 'Event' },
                  { id: 'publicity', name: 'Publicity' },
                  { id: 'documentation', name: 'Documentation' },
                ].map((d) => (
                  <label key={d.id} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedDomains.includes(d.id)}
                      onChange={(e) => handleDomainCheckboxChange(d.id, e.target.checked)}
                    />
                    <span>{d.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Social details Row */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email Address</label>
                <input
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. john@sfit.ac.in"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="phone">Phone Number</label>
                <input
                  className={styles.input}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 9876543210"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="linkedin">LinkedIn Profile URL</label>
                <input
                  className={styles.input}
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="e.g. https://linkedin.com/in/username"
                />
              </div>
            </div>

            {/* Responsibilities list manager */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Responsibilities & Duties</label>
              <div className={styles.respList}>
                {responsibilities.map((resp, index) => (
                  <div key={index} className={styles.respItem}>
                    <input
                      className={styles.input}
                      type="text"
                      value={resp}
                      onChange={(e) => handleRespChange(index, e.target.value)}
                      placeholder="e.g. Led design of autonomous drive systems"
                    />
                    <button
                      type="button"
                      className={styles.removeRespBtn}
                      onClick={() => removeRespInput(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.addRespBtn}
                  onClick={addRespInput}
                >
                  + Add Responsibility Bullet
                </button>
              </div>
            </div>

            {/* Form actions */}
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={closeForm}>
                Cancel
              </button>
              <button type="submit" className={styles.submitButton}>
                {editingMember ? 'Save Changes' : 'Create Profile'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters & Search Controls */}
      <div className={styles.controlsSection}>
        <div className={styles.teamSearchBar}>
          <span className={styles.teamSearchIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            className={styles.teamSearchInput}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search team members by name or role designation..."
          />
        </div>

        <div className={styles.filterControls}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Category:</span>
            <select
              className={styles.filterSelect}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
            >
              <option value="all">All Categories</option>
              <option value="core">Core Team</option>
              <option value="mentors">Mentors</option>
              <option value="members">General Members</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Department:</span>
            <select
              className={styles.filterSelect}
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="Management">Management</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electronics">Electronics</option>
              <option value="Software">Software</option>
              <option value="Alumni">Alumni</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Team Cards */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: 600 }}>Loading team members list...</p>
        </div>
      ) : filteredMembers.length > 0 ? (
        <div className={styles.membersGrid}>
          {filteredMembers.map((member) => (
            <div key={member._id} className={styles.memberCard}>
              <div className={`${styles.cardHeader} ${
                member.name === 'Ramjee Yadav' || member._id === 'core1'
                  ? styles.ramjeeHeader
                  : member.category === 'core' 
                  ? styles.coreHeader 
                  : member.category === 'mentors' 
                  ? styles.mentorHeader 
                  : styles.memberHeader
              }`}>
                <span className={`${styles.categoryBadge} ${member.category === 'core' ? styles.coreBadge : member.category === 'mentors' ? styles.mentorBadge : styles.memberBadge}`}>
                  {member.category}
                </span>
                <div className={styles.adminPhotoWrapper}>
                  {(imageErrors[member._id] || !member.imageUrl) ? (
                    <div className={styles.initialsAvatar} style={{ backgroundColor: getAvatarColor(member.name) }}>
                      {getInitials(member.name)}
                    </div>
                  ) : (
                    <img 
                      src={getFullImageUrl(member.imageUrl)} 
                      alt={member.name} 
                      className={styles.adminProfilePhoto} 
                      onError={() => handleImageError(member._id)}
                    />
                  )}
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={member.name.length > 18 ? `${styles.memberName} ${styles.longName}` : styles.memberName}>
                  {member.name}
                </h3>
                <p className={styles.memberRole}>{member.role}</p>
                <span className={styles.departmentTag}>{member.department}</span>
                
                {/* Associated Domain Badges (Red Outline Boxes) */}
                <div className={styles.memberDomainsBadges}>
                  {(member.domains || []).map((domainId) => {
                    const abbreviation = domainId === 'rnd' ? 'R&D' : domainId.toUpperCase();
                    return (
                      <span key={domainId} className={styles.domainBadge}>
                        {abbreviation}
                      </span>
                    );
                  })}
                </div>
                
                {/* Social icons row */}
                <div className={styles.socialRow}>
                  {member.email && (
                    <a className={styles.socialLink} href={`mailto:${member.email}`} title="Email">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </a>
                  )}
                  {member.linkedin && (
                    <a className={styles.socialLink} href={member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.editBtn} onClick={() => openEditForm(member)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit
                </button>
                <button className={styles.deleteBtn} onClick={() => handleDeleteMember(member._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3 className={styles.emptyTitle}>No members found</h3>
          <p className={styles.emptyText}>Try adjusting your search criteria or filter tags to find who you're looking for.</p>
        </div>
      )}
    </div>
  );
}
