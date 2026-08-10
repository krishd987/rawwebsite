'use client';

import { useState } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './tasks.module.css';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface TaskFile {
  label: string;
  file: string; // path under /tasks/
  zipFile?: string; // optional zip bundle path
}

interface Category {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  tasks: TaskFile[];
}

const categories: Category[] = [
  {
    id: 'electronics',
    icon: '🔌',
    title: 'Electronics',
    description: 'Circuit design, PCB layout, embedded systems and sensor interfacing tasks.',
    color: '#0a7ecb',
    tasks: [
      { label: 'Electronics Task 1', file: 'E_1.pdf', zipFile: 'Electronics_Tasks.zip' },
      { label: 'Electronics Task 2', file: 'E_2.pdf' },
    ],
  },
  {
    id: 'mechanical',
    icon: '⚙️',
    title: 'Mechanical',
    description: 'CAD modelling, fabrication, structural design and mechanism tasks.',
    color: '#e10600',
    tasks: [
      { label: 'Mechanical Task 1', file: 'M_1.pdf', zipFile: 'Mechanical_Tasks.zip' },
      { label: 'Mechanical Task 2', file: 'M_2.pdf', zipFile: 'Mechanical_Tasks.zip' },
    ],
  },
  {
    id: 'software',
    icon: '💻',
    title: 'Software',
    description: 'Programming, algorithms, ROS, computer vision and automation tasks.',
    color: '#00a651',
    tasks: [
      { label: 'Software Task 1', file: 'SW_1.pdf' },
      { label: 'Software Task 2', file: 'SW_2.pdf' },
      { label: 'Software Task 3', file: 'SW_3.pdf' },
    ],
  },
  {
    id: 'hardware',
    icon: '🔧',
    title: 'Hardware',
    description: 'Hands-on hardware circuit building, testing and troubleshooting tasks.',
    color: '#8e44ad',
    tasks: [
      { label: 'Hardware Task 1', file: 'HC_1.pdf' },
      { label: 'Hardware Task 2', file: 'HC_2.pdf' },
    ],
  },
  {
    id: 'mathlabs',
    icon: '📊',
    title: 'Mathlabs / Data',
    description: 'Data analysis, visualisation and Python plotting tasks using Mathlabs.',
    color: '#e67e22',
    tasks: [
      { label: 'Mathlabs Task 1', file: 'ML_1.pdf' },
    ],
  },
  {
    id: 'pr',
    icon: '📣',
    title: 'Public Relations',
    description: 'Communication, content creation, outreach and team representation tasks.',
    color: '#16a085',
    tasks: [
      { label: 'Public Relations Task 1', file: 'PR_1.pdf' },
      { label: 'Public Relations Task 2', file: 'PR_2.pdf' },
    ],
  },
];

// ─── Animations ───────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function TasksPage() {
  const totalTasks = categories.reduce((s, c) => s + c.tasks.length, 0);

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitFormData, setSubmitFormData] = useState({
    fullName: '',
    pid: '',
    driveLink: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitFormData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(result.error || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('An unexpected error occurred. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <span className={styles.heroEyebrow}>TEAM RAW · SFIT RECRUITMENT</span>
          <h1 className={styles.heroTitle}>
            Recruitment <span className={styles.accent}>Tasks</span>
          </h1>
          <p className={styles.heroSubtitle}>
            First submit your registration, then download and complete your domain task. 
            Tasks are available across all technical and non-technical domains.
          </p>
          <div className={styles.heroMeta}>
            <span className={styles.heroMetaItem}>📁 {totalTasks} Tasks Available</span>
            <span className={styles.heroMetaDivider}>·</span>
            <span className={styles.heroMetaItem}>📂 {categories.length} Domains</span>
          </div>
        </motion.div>
      </section>

      {/* ── How it works ── */}
      <section className={styles.howSection}>
        <div className={styles.howInner}>
          {[
            { step: '01', icon: '📝', text: 'Register and select domain' },
            { step: '02', icon: '📥', text: 'Download your domain task PDF' },
            { 
              step: '03', 
              icon: '📤', 
              text: 'Submit Drive Link of your completed tasks',
              isInteractive: true,
              onClick: () => setIsSubmitModalOpen(true)
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              className={`${styles.howCard} ${s.isInteractive ? styles.howCardInteractive : ''}`}
              onClick={s.onClick}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
            >
              <span className={styles.howStep}>{s.step}</span>
              <span className={styles.howIcon}>{s.icon}</span>
              <p className={styles.howText}>{s.text}</p>
              {s.isInteractive && (
                <button 
                  className={styles.howCardBtn} 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    s.onClick?.(); 
                  }}
                >
                  Submit Task →
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Ready to apply CTA ── */}
      <motion.section
        className={styles.cta}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.ctaTitle}>Ready to apply?</h2>
        <p className={styles.ctaText}>
          Start by filling the Recruitment form first — then download your domain task and complete it.
        </p>
        <motion.a
          href="/register"
          className={styles.ctaBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          Fill the Form First →
        </motion.a>
      </motion.section>

      {/* ── Category sections ── */}
      <section className={styles.categoriesSection}>
        <div className={styles.categoriesInner}>
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              className={styles.categoryBlock}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
            >
              {/* Category header */}
              <div className={styles.catHeader}>
                <div className={styles.catIcon} style={{ background: cat.color }}>
                  {cat.icon}
                </div>
                <div className={styles.catInfo}>
                  <h2 className={styles.catTitle}>{cat.title}</h2>
                  <p className={styles.catDesc}>{cat.description}</p>
                </div>
                <span className={styles.catCount} style={{ color: cat.color }}>
                  {cat.tasks.length} task{cat.tasks.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Task cards */}
              <motion.div
                className={styles.taskGrid}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {cat.tasks.map((task) => (
                  <motion.div
                    key={task.file}
                    className={styles.taskCard}
                    variants={cardVariants}
                    whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(0,0,0,0.10)` }}
                  >
                    <div className={styles.taskCardTop}>
                      <div
                        className={styles.taskCardIconWrap}
                        style={{ background: `${cat.color}18`, border: `1.5px solid ${cat.color}30` }}
                      >
                        <span className={styles.taskCardIcon}>📄</span>
                      </div>
                      <div>
                        <p className={styles.taskCardLabel}>{task.label}</p>
                        <p className={styles.taskCardFormat}>
                          PDF Document{task.zipFile ? ' + ZIP Bundle' : ''}
                        </p>
                      </div>
                    </div>

                    <div className={styles.taskCardActions}>
                      <a
                        href={`/tasks/${task.file}`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.btnView}
                        style={{ borderColor: cat.color, color: cat.color }}
                      >
                        👁 View
                      </a>
                      
                      {task.zipFile ? (
                        <div className={styles.downloadDropdown}>
                          <button 
                            className={styles.btnDownloadMain}
                            style={{ background: cat.color }}
                          >
                            ⬇ Download ▼
                          </button>
                          <div className={styles.dropdownMenu}>
                            <a
                              href={`/tasks/${task.file}`}
                              download
                              className={styles.dropdownItem}
                            >
                              📄 PDF Only
                            </a>
                            <a
                              href={`/tasks/${task.zipFile}`}
                              download
                              className={styles.dropdownItem}
                            >
                              🗜️ ZIP Bundle
                            </a>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={`/tasks/${task.file}`}
                          download
                          className={styles.btnDownload}
                          style={{ background: cat.color }}
                        >
                          ⬇ Download
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Bottom Submit CTA ── */}
      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContent}>
          <h2>Finished your task?</h2>
          <p>Submit your Google Drive folder link containing all work files directly to our reviewers.</p>
          <button 
            className={styles.bottomCtaBtn}
            onClick={() => setIsSubmitModalOpen(true)}
          >
            Submit Completed Task →
          </button>
        </div>
      </section>

      {/* ── Submission Modal ── */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className={styles.modalOverlay} onClick={() => setIsSubmitModalOpen(false)}>
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  Task Submission <span className={styles.accent}>Portal</span>
                </h2>
                <button className={styles.btnClose} onClick={() => setIsSubmitModalOpen(false)}>
                  &times;
                </button>
              </div>

              <div className={styles.modalBody}>
                {submitSuccess ? (
                  <div className={styles.successCard}>
                    <div className={styles.successIcon}>✓</div>
                    <h3 className={styles.successTitle}>Submission Successful!</h3>
                    <p className={styles.successMsg}>
                      Thank you for submitting your task. Your Google Drive folder link has been received successfully.
                      Our domain reviewers will evaluate your submission.
                    </p>
                    <button
                      className={styles.btnDone}
                      onClick={() => {
                        setIsSubmitModalOpen(false);
                        setSubmitSuccess(false);
                        setSubmitFormData({
                          fullName: '',
                          pid: '',
                          driveLink: '',
                        });
                      }}
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Column 1: Instructions */}
                    <div className={styles.instructionsCol}>
                      <div className={styles.instructionSection}>
                        <h3 className={styles.sectionTitle}>📁 Google Drive Naming</h3>
                        <ul>
                          <li>Create a Google Drive folder containing all the files related to your work (images/photos, videos, code files, reports/documents, simulations/design files, etc.).</li>
                          <li>Name the main folder strictly as: <strong>PID_Name</strong> (Example: <code>123123_JohnDoe</code>).</li>
                          <li>Each file within the folder must be properly titled.</li>
                        </ul>
                      </div>

                      <div className={styles.instructionSection}>
                        <h3 className={styles.sectionTitle}>📂 Folder Structure & Links</h3>
                        <ul>
                          <li>If submitting multiple tasks, create subfolders: <code>E_1</code>, <code>SW_1</code>, <code>M_1</code> or other domain identifiers.</li>
                          <li>If using external links (GitHub, YouTube, Wokwi, etc.), include a separate document named <strong>Links</strong>.</li>
                          <li>List link titles clearly, paste corresponding links below them, and verify accessibility.</li>
                        </ul>
                      </div>

                      <div className={styles.instructionSection}>
                        <h3 className={styles.sectionTitle}>🖼️ Images & Reports</h3>
                        <ul>
                          <li>Add appropriate titles or captions to all images in your report.</li>
                          <li>Ensure photos, screenshots, and videos clearly represent the completed work.</li>
                          <li>Name files logically so they are easy to identify.</li>
                        </ul>
                      </div>

                      <div className={styles.alertBox}>
                        <h4>⚠️ Important Checklist</h4>
                        <ul>
                          <li><strong>Enable View Access:</strong> Give the necessary access permissions so it can be viewed by the reviewers.</li>
                          <li>Upload only <strong>ONE</strong> Drive folder link on the submission portal.</li>
                          <li>Incomplete or restricted Drive folders will lead to evaluation issues.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Column 2: Form */}
                    <form className={styles.formCol} onSubmit={handleFormSubmit}>
                      <h3>Submit Your Work</h3>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Full Name *</label>
                        <input
                          type="text"
                          required
                          className={styles.formInput}
                          placeholder="e.g. John Doe"
                          value={submitFormData.fullName}
                          onChange={(e) => setSubmitFormData({ ...submitFormData, fullName: e.target.value })}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>PID (6 digits) *</label>
                        <input
                          type="text"
                          required
                          pattern="\d{6}"
                          className={styles.formInput}
                          placeholder="e.g. 123123"
                          value={submitFormData.pid}
                          onChange={(e) => setSubmitFormData({ ...submitFormData, pid: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                        />
                      </div>


                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Google Drive Link *</label>
                        <input
                          type="url"
                          required
                          className={styles.formInput}
                          placeholder="https://drive.google.com/drive/folders/..."
                          value={submitFormData.driveLink}
                          onChange={(e) => setSubmitFormData({ ...submitFormData, driveLink: e.target.value })}
                        />
                        <span className={styles.infoHint}>Ensure general access is set to "Anyone with the link".</span>
                      </div>

                      {submitError && (
                        <div className={styles.errorMessage}>
                          {submitError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.btnSubmit}
                      >
                        {isSubmitting ? (
                          <>
                            <span className={styles.spinner}></span>
                            Submitting...
                          </>
                        ) : (
                          'Submit Task Link'
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
