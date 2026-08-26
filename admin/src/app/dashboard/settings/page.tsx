/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './settings.module.css';

interface SettingsState {
  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  
  // System Preferences
  autoBackup: boolean;
  dataSync: boolean;
  errorReporting: boolean;
  
  // Appearance
  darkMode: boolean;
  compactView: boolean;
  animations: boolean;
  
  // Data Management
  analyticsTracking: boolean;
  activityLogging: boolean;
}

interface ModalState {
  isOpen: boolean;
  action: 'clearData' | 'resetSettings' | null;
  confirmText: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    autoBackup: true,
    dataSync: true,
    errorReporting: true,
    darkMode: false,
    compactView: false,
    animations: true,
    analyticsTracking: true,
    activityLogging: true,
  });

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    action: null,
    confirmText: '',
  });

  const [saveIndicator, setSaveIndicator] = useState<string | null>(null);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Apply settings to document element dynamically
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    if (settings.compactView) {
      document.documentElement.setAttribute('data-compact', 'true');
    } else {
      document.documentElement.removeAttribute('data-compact');
    }

    if (!settings.animations) {
      document.documentElement.setAttribute('data-no-animations', 'true');
    } else {
      document.documentElement.removeAttribute('data-no-animations');
    }
  }, [settings]);

  // Toggle setting and save
  const toggleSetting = (key: keyof SettingsState) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(newSettings);
    localStorage.setItem('adminSettings', JSON.stringify(newSettings));
    
    // Show save indicator
    setSaveIndicator(key);
    setTimeout(() => setSaveIndicator(null), 2000);
  };

  // Open confirmation modal
  const openModal = (action: 'clearData' | 'resetSettings') => {
    setModal({
      isOpen: true,
      action,
      confirmText: '',
    });
  };

  // Close modal
  const closeModal = () => {
    setModal({
      isOpen: false,
      action: null,
      confirmText: '',
    });
  };

  // Handle dangerous action
  const handleDangerousAction = () => {
    if (modal.action === 'clearData') {
      // Clear all data
      localStorage.clear();
      alert('All data has been cleared successfully.');
    } else if (modal.action === 'resetSettings') {
      // Reset to defaults
      const defaultSettings: SettingsState = {
        emailNotifications: true,
        pushNotifications: true,
        weeklyDigest: false,
        autoBackup: true,
        dataSync: true,
        errorReporting: true,
        darkMode: false,
        compactView: false,
        animations: true,
        analyticsTracking: true,
        activityLogging: true,
      };
      setSettings(defaultSettings);
      localStorage.setItem('adminSettings', JSON.stringify(defaultSettings));
      alert('Settings have been reset to defaults.');
    }
    closeModal();
  };

  // Get modal content based on action
  const getModalContent = () => {
    if (modal.action === 'clearData') {
      return {
        title: 'Clear All Data',
        message: 'This will permanently delete all stored data including contact messages, analytics history, and cached information.',
        impact: 'This will delete approximately 150+ records from the database.',
        confirmPhrase: 'DELETE ALL DATA',
      };
    } else if (modal.action === 'resetSettings') {
      return {
        title: 'Reset All Settings',
        message: 'This will reset all preferences to their default values. Your data will not be affected.',
        impact: 'All 11 settings will be restored to their factory defaults.',
        confirmPhrase: 'RESET SETTINGS',
      };
    }
    return null;
  };

  const modalContent = getModalContent();

  return (
    <div className={styles.settingsPage}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>
          Manage your preferences and system configuration
        </p>
      </div>

      {/* Notifications Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </span>
            Notifications
          </h2>
          <p className={styles.sectionDescription}>
            Control how and when you receive notifications
          </p>
        </div>
        <div className={styles.sectionBody}>
          <SettingItem
            label="Email Notifications"
            description="Receive important updates and alerts via email"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            }
            checked={settings.emailNotifications}
            onChange={() => toggleSetting('emailNotifications')}
            showSaveIndicator={saveIndicator === 'emailNotifications'}
            tooltip="You'll receive notifications about new contacts, system alerts, and important updates"
          />
          <SettingItem
            label="Push Notifications"
            description="Get real-time browser notifications for urgent events"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            }
            checked={settings.pushNotifications}
            onChange={() => toggleSetting('pushNotifications')}
            showSaveIndicator={saveIndicator === 'pushNotifications'}
            tooltip="Browser notifications require permission and work when this tab is open"
          />
          <SettingItem
            label="Weekly Digest"
            description="Receive a summary of platform activity every Monday"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            }
            checked={settings.weeklyDigest}
            onChange={() => toggleSetting('weeklyDigest')}
            showSaveIndicator={saveIndicator === 'weeklyDigest'}
            tooltip="A comprehensive email with analytics, new contacts, and key metrics"
          />
        </div>
      </section>

      {/* System Preferences Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </span>
            System Preferences
          </h2>
          <p className={styles.sectionDescription}>
            Configure automatic system behavior and maintenance
          </p>
        </div>
        <div className={styles.sectionBody}>
          <SettingItem
            label="Automatic Backup"
            description="Automatically backup data every 24 hours"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
            }
            checked={settings.autoBackup}
            onChange={() => toggleSetting('autoBackup')}
            showSaveIndicator={saveIndicator === 'autoBackup'}
            tooltip="Backups are stored locally and can be restored from the data management panel"
          />
          <SettingItem
            label="Data Synchronization"
            description="Keep data synced across all your devices"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
            }
            checked={settings.dataSync}
            onChange={() => toggleSetting('dataSync')}
            showSaveIndicator={saveIndicator === 'dataSync'}
            tooltip="Uses browser sync storage to keep settings consistent across devices"
          />
          <SettingItem
            label="Error Reporting"
            description="Automatically send error reports to help improve the platform"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M18 11.05V5.3a2.6 2.6 0 0 0-5.2 0v5.75L10 9.2a2.6 2.6 0 0 0-3.68 3.68l4.42 4.42c2.2 2.2 5.18 3.7 8.26 3.7h.8a2 2 0 0 0 2-2v-3.68c0-.7-.3-1.38-.83-1.85l-2.97-2.42z"></path>
              </svg>
            }
            checked={settings.errorReporting}
            onChange={() => toggleSetting('errorReporting')}
            showSaveIndicator={saveIndicator === 'errorReporting'}
            tooltip="Anonymous error reports help us fix bugs and improve stability"
          />
        </div>
      </section>

      {/* Appearance Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.02983 19.1713 5.28522 19.2627 5.5262 19.2025C5.76718 19.1423 5.95254 18.9407 6.00288 18.7025C6.09638 18.262 6.1466 17.808 6.1466 17.3462C6.1466 14.9458 8.0924 13 10.4928 13H11.5385C12.3457 13 13 12.3457 13 11.5385V10.5C13 9.67157 13.6716 9 14.5 9H17.5C18.3284 9 19 8.32843 19 7.5V6.5C19 4.01472 16.9853 2 14.5 2"></path>
              </svg>
            </span>
            Appearance
          </h2>
          <p className={styles.sectionDescription}>
            Customize the look and feel of the admin panel
          </p>
        </div>
        <div className={styles.sectionBody}>
          <SettingItem
            label="Dark Mode"
            description="Switch to a darker color scheme for reduced eye strain"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            }
            checked={settings.darkMode}
            onChange={() => toggleSetting('darkMode')}
            showSaveIndicator={saveIndicator === 'darkMode'}
            tooltip="Switch between Light and Dark themes instantly"
          />
          <SettingItem
            label="Compact View"
            description="Display more content by reducing spacing and padding"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
            }
            checked={settings.compactView}
            onChange={() => toggleSetting('compactView')}
            showSaveIndicator={saveIndicator === 'compactView'}
            tooltip="Compact view optimizes layout for smaller screens"
          />
          <SettingItem
            label="Animations"
            description="Enable smooth transitions and animated UI elements"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            }
            checked={settings.animations}
            onChange={() => toggleSetting('animations')}
            showSaveIndicator={saveIndicator === 'animations'}
            tooltip="Disable animations for better performance on slower devices"
          />
        </div>
      </section>

      {/* Data Management Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </span>
            Data Management
          </h2>
          <p className={styles.sectionDescription}>
            Control data collection and storage preferences
          </p>
        </div>
        <div className={styles.sectionBody}>
          <SettingItem
            label="Analytics Tracking"
            description="Allow collection of usage data to improve the platform"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            }
            checked={settings.analyticsTracking}
            onChange={() => toggleSetting('analyticsTracking')}
            showSaveIndicator={saveIndicator === 'analyticsTracking'}
            tooltip="Analytics help us understand feature usage and make informed improvements"
          />
          <SettingItem
            label="Activity Logging"
            description="Log all admin actions for audit and security purposes"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            }
            checked={settings.activityLogging}
            onChange={() => toggleSetting('activityLogging')}
            showSaveIndicator={saveIndicator === 'activityLogging'}
            tooltip="Activity logs can be reviewed in the security settings panel"
          />
        </div>
      </section>

      {/* Danger Zone */}
      <section className={styles.dangerZone}>
        <div className={styles.dangerHeader}>
          <h2 className={styles.dangerTitle}>
            <span className={styles.dangerWarningIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', color: 'rgb(239, 68, 68)' }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </span>
            Danger Zone
          </h2>
          <p className={styles.dangerDescription}>
            Irreversible actions that permanently affect your data and settings
          </p>
        </div>
        <div className={styles.dangerBody}>
          <div className={styles.dangerActions}>
            <div className={styles.dangerAction}>
              <div className={styles.dangerActionInfo}>
                <h4>Clear All Data</h4>
                <p>
                  Permanently delete all contact messages, analytics data, and cached information.
                </p>
                <div className={styles.dangerImpact}>
                  <span></span>
                  <span>This will delete 150+ records</span>
                </div>
              </div>
              <button
                className={styles.dangerButton}
                onClick={() => openModal('clearData')}
              >
                <span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></span>
                Clear Data
              </button>
            </div>

            <div className={styles.dangerAction}>
              <div className={styles.dangerActionInfo}>
                <h4>Reset All Settings</h4>
                <p>
                  Restore all preferences to their factory default values. Your data will remain intact.
                </p>
                <div className={styles.dangerImpact}>
                  <span></span>
                  <span>This will reset all 11 settings</span>
                </div>
              </div>
              <button
                className={styles.dangerButton}
                onClick={() => openModal('resetSettings')}
              >
                <span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg></span>
                Reset Settings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {modal.isOpen && modalContent && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>
                  <span className={styles.modalIcon}></span>
                  {modalContent.title}
                </h3>
                <p className={styles.modalMessage}>{modalContent.message}</p>
                <div className={styles.modalImpact}>
                  <strong>Impact:</strong>
                  <p>{modalContent.impact}</p>
                </div>
              </div>
              <div className={styles.modalBody}>
                <label htmlFor="confirmInput">
                  <p style={{ margin: '0 0 0.75rem 0', color: '#0a1a3a', fontWeight: 600 }}>
                    Type <code style={{ 
                      padding: '0.25rem 0.5rem', 
                      background: 'rgba(10, 26, 58, 0.1)', 
                      borderRadius: '4px',
                      fontWeight: 700
                    }}>{modalContent.confirmPhrase}</code> to confirm:
                  </p>
                </label>
                <input
                  id="confirmInput"
                  type="text"
                  className={styles.confirmInput}
                  value={modal.confirmText}
                  onChange={(e) => setModal({ ...modal, confirmText: e.target.value })}
                  placeholder={modalContent.confirmPhrase}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && modal.confirmText === modalContent.confirmPhrase) {
                      handleDangerousAction();
                    } else if (e.key === 'Escape') {
                      closeModal();
                    }
                  }}
                />
                <p className={styles.confirmHint}>
                  This action cannot be undone. Please be certain.
                </p>
                <div className={styles.modalActions}>
                  <button
                    className={`${styles.modalButton} ${styles.modalButtonCancel}`}
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className={`${styles.modalButton} ${styles.modalButtonConfirm}`}
                    onClick={handleDangerousAction}
                    disabled={modal.confirmText !== modalContent.confirmPhrase}
                  >
                    {modalContent.title}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Setting Item Component */
interface SettingItemProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  showSaveIndicator: boolean;
  tooltip: string;
}

function SettingItem({
  label,
  description,
  icon,
  checked,
  onChange,
  showSaveIndicator,
  tooltip,
}: SettingItemProps) {
  return (
    <div className={styles.settingItem}>
      <div className={styles.settingInfo}>
        <h3 className={styles.settingLabel}>
          <span className={styles.settingLabelIcon}>{icon}</span>
          {label}
          <span className={styles.tooltipIcon} title={tooltip}>
            ?
          </span>
        </h3>
        <p className={styles.settingDescription}>{description}</p>
      </div>
      <div className={styles.toggleWrapper}>
        <label className={`${styles.toggle} ${checked ? styles.active : ''}`}>
          <input
            type="checkbox"
            className={styles.toggleInput}
            checked={checked}
            onChange={onChange}
            aria-label={label}
          />
          <span className={styles.toggleSlider} />
        </label>
        {showSaveIndicator && (
          <span className={styles.saveIndicator}>Saved ✓</span>
        )}
      </div>
    </div>
  );
}
