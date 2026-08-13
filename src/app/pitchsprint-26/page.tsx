'use client';

import { useState, useEffect } from 'react';
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
    icon: '📊',
    title: 'PPT Format',
    description: "Official PitchSprint '26 Idea Presentation format. Download the template to prepare your pitch deck.",
    color: '#e10600',
    tasks: [
      { label: "PitchSprint '26 Idea Presentation Format", file: '../pitchsprint-files/PitchSprint26-IDEA-Presentation-Format.pdf' },
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

interface HackathonSection {
  id: number;
  icon: string;
  title: string;
  badge?: string;
  content: React.ReactNode;
}

const hackathonSections = (styles: Record<string, string>): HackathonSection[] => [
  {
    id: 1,
    icon: '',
    title: "What is PitchSprint '26?",
    content: (
      <div>
        <p className={styles.sihText}>
          <strong>PitchSprint &apos;26</strong> is SFIT&apos;s college-level internal hackathon. It provides students with a platform to solve pressing real-world challenges, showcase engineering excellence, and present their ideas.
        </p>
        <div className={styles.sihHighlightCard}>
          <h4>Inculcating Innovation</h4>
          <p>PitchSprint &apos;26 aims to nurture a culture of product design, engineering excellence, and collaborative problem-solving among engineering and technology students.</p>
        </div>
        <ul className={styles.sihList}>
          <li><strong>Edition:</strong> PitchSprint &apos;26</li>
          <li><strong>Format:</strong> Internal hackathon screening and evaluation by industry experts.</li>
          <li><strong>Eligibility:</strong> Open to all active students of St. Francis Institute of Technology (SFIT).</li>
        </ul>
      </div>
    )
  },
  {
    id: 2,
    icon: '',
    title: 'Who Can Participate?',
    content: (
      <div>
        <p className={styles.sihText}>
          Participation in PitchSprint &apos;26 must follow these strict composition guidelines:
        </p>
        <div className={styles.sihGrid}>
          <div className={styles.sihCardItem}>

            <h5>Team Size</h5>
            <p>Exactly <strong>6 members</strong> per team. No more, no less.</p>
          </div>
          <div className={styles.sihCardItem}>

            <h5>Gender Diversity</h5>
            <p>At least <strong>1 female member</strong> is mandatory in every team.</p>
          </div>
          <div className={styles.sihCardItem}>

            <h5>Same College</h5>
            <p>All members must be active students of <strong>SFIT</strong>.</p>
          </div>
          <div className={styles.sihCardItem}>

            <h5>Interdepartmental</h5>
            <p>Interdepartmental teams are allowed. Members can be from <strong>different branches</strong>.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    icon: '',
    title: 'Note for Registrations',
    content: (
      <div>
        <p className={styles.sihText}>
          To register your team for PitchSprint &apos;26, please review these key instructions:
        </p>
        <div className={styles.sihHighlightCard}>
          <h4>Team Leader Registration Only</h4>
          <p>
            Only the <strong>Team Leader</strong> should fill out and submit the registration form for the entire team. Individual team members do not need to register separately.
          </p>
        </div>
        <div className={styles.sihHighlightCard} style={{ marginTop: '1rem', borderLeftColor: '#25D366', background: 'rgba(37, 211, 102, 0.05)' }}>
          <h4 style={{ color: '#128C7E' }}>Join Official WhatsApp Group</h4>
          <p>
            It is mandatory for the Team Leader to join the official coordination group to receive announcements, problem statements, and pitching guidelines:
          </p>
          <a
            href="https://chat.whatsapp.com/placeholder-link"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.75rem',
              padding: '0.6rem 1.25rem',
              backgroundColor: '#25D366',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.88rem',
              boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)'
            }}
          >
            💬 Join WhatsApp Group
          </a>
        </div>
      </div>
    )
  },
  {
    id: 4,
    icon: '',
    title: 'Important Dates',
    badge: 'Critical',
    content: (
      <div>
        <p className={styles.sihText}>
          Please keep a close eye on these milestones. Missing deadlines will result in automatic disqualification from the round.
        </p>
        <div className={styles.tableContainer}>
          <table className={styles.sihTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Milestone / Event</th>
                <th>Deadline / Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Internal Team Registration</td>
                <td><span className={styles.dateBadge}>17th - 22nd August 2026</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Problem Statement Submission</td>
                <td><span className={styles.dateBadge}>25th - 28th August 2026</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>SFIT PitchSprint &apos;26 Hackathon Round (Jury Pitch)</td>
                <td><span className={styles.dateBadge}>29th August 2026</span></td>
              </tr>
              <tr>
                <td>4</td>
                <td>PitchSprint &apos;26 Grand Finale Announcement</td>
                <td><span className={styles.dateBadge}>TBA</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  {
    id: 5,
    icon: '',
    title: 'Tracks & Problem Statements',
    content: (
      <div className={styles.sihHighlightCard}>
        <h4>Important Notice</h4>
        <p>Problem statements will be released on <strong>24th of August</strong>.</p>
      </div>
    )
  },
  {
    id: 6,
    icon: '',
    title: "How PitchSprint '26 Works",
    content: (
      <div>
        <p className={styles.sihText}>
          The road from team formation to the PitchSprint &apos;26 final round:
        </p>
        <div className={styles.sihTimeline}>
          <div className={styles.sihTimelineItem}>
            <div className={styles.sihTimelineBadge}>1</div>
            <div className={styles.sihTimelineContent}>
              <h6>Team Setup & Registration</h6>
              <p>Form your team of 6 (minimum 1 female). Submit the internal registration form before the deadline.</p>
            </div>
          </div>
          <div className={styles.sihTimelineItem}>
            <div className={styles.sihTimelineBadge}>2</div>
            <div className={styles.sihTimelineContent}>
              <h6>Domain Tasks & Code Review</h6>
              <p>Complete the domain recruitment tasks (listed below) to qualify and show technical execution capabilities.</p>
            </div>
          </div>
          <div className={styles.sihTimelineItem}>
            <div className={styles.sihTimelineBadge}>3</div>
            <div className={styles.sihTimelineContent}>
              <h6>Jury Presentation Pitch</h6>
              <p>Present your solution PPT and MVP/simulation at the SFIT PitchSprint &apos;26 Hackathon round.</p>
            </div>
          </div>
          <div className={styles.sihTimelineItem}>
            <div className={styles.sihTimelineBadge}>4</div>
            <div className={styles.sihTimelineContent}>
              <h6>Final Pitching</h6>
              <p>Selected top teams will pitch at the grand PitchSprint &apos;26 finale.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 7,
    icon: '',
    title: 'Common Mistakes to Avoid',
    content: (
      <div>
        <p className={styles.sihText}>
          Pay extreme attention to these common pitfalls that have led to immediate disqualification in previous editions:
        </p>
        <div style={{ background: 'rgba(225, 6, 0, 0.05)', borderLeft: '4px solid #e10600', padding: '1rem', borderRadius: '4px' }}>
          <ul className={styles.sihList} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: 0, paddingLeft: '1.25rem' }}>
            <li><strong>1. No Female Teammate:</strong> Absolute showstopper. At least <strong>1 female</strong> is <strong>strictly required</strong>.</li>
            <li><strong>2. Incomplete PPT:</strong> Changing slide layouts, omitting team names, or deleting the <strong>problem statement ID slide</strong>.</li>
            <li><strong>3. Plagiarized Projects:</strong> Copy-pasting popular GitHub repos. <strong>Plagiarism scans</strong> are run by national organizers.</li>
            <li><strong>4. Hardcoded Mockups:</strong> Showing screens that have <strong>zero actual logic</strong> or functionality during evaluation.</li>
            <li><strong>5. Poor Pitch Timing:</strong> Not allocating time for the <strong>prototype demo</strong> during the short jury pitch.</li>
            <li><strong>6. Siloed Contributions:</strong> If the speaker knows everything but other teammates <strong>cannot answer simple questions</strong>.</li>
            <li><strong>7. Choosing Incompatible Tracks:</strong> Submitting a pure software solution under the <strong>hardware track</strong> to avoid software competition.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 8,
    icon: '',
    title: 'Contact & Queries',
    content: (
      <div>
        <p className={styles.sihText}>
          For queries regarding team registration, event rules, or submissions, reach out to the PitchSprint &apos;26 coordinators:
        </p>
        <div className={styles.contactsGrid}>
          <div className={styles.contactCard}>
            <div className={styles.contactIconWrap}></div>
            <div className={styles.contactDetails}>
              <span className={styles.contactRole}>PitchSprint &apos;26 Coordinator</span>
              <h5 className={styles.contactName}>Pal Rajak</h5>
              <a href="tel:+917208697241" className={styles.contactPhone}>+91 72086 97241</a>
            </div>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactIconWrap}></div>
            <div className={styles.contactDetails}>
              <span className={styles.contactRole}>PitchSprint &apos;26 Coordinator</span>
              <h5 className={styles.contactName}>Jhoshua Coutinho</h5>
              <a href="tel:+918976357005" className={styles.contactPhone}>+91 89763 57005</a>
            </div>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactIconWrap}></div>
            <div className={styles.contactDetails}>
              <span className={styles.contactRole}>PitchSprint &apos;26 Coordinator</span>
              <h5 className={styles.contactName}>Zion Naranje</h5>
              <a href="tel:+918355818735" className={styles.contactPhone}>+91 83558 18735</a>
            </div>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactIconWrap}></div>
            <div className={styles.contactDetails}>
              <span className={styles.contactRole}>PitchSprint &apos;26 Coordinator</span>
              <h5 className={styles.contactName}>Rich Rodrigues</h5>
              <a href="tel:+918828242446" className={styles.contactPhone}>+91 88282 42446</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
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
  useEffect(() => {
    document.title = "NAVKRITI '26 | Team RAW Hackathon Portal";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Official NAVKRITI '26 hackathon and task submission portal of Robotics and Aviation Wing (RAW) for Smart India Hackathon.");
  }, []);

  const totalTasks = categories.reduce((s, c) => s + c.tasks.length, 0);

  const [activeTab, setActiveTab] = useState(0);
  const sections = hackathonSections(styles);

  const getFileUrl = (file: string) => {
    if (file.startsWith('..')) {
      return file.substring(2);
    }
    return `/pitchsprint-26/${file}`;
  };

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitFormData, setSubmitFormData] = useState({
    teamName: '',
    fullName: '',
    pid: '',
    problemStatement: '',
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
          <span className={styles.heroEyebrow}>PITCHSPRINT &apos;26</span>
          <h1 className={styles.heroTitle}>
            PitchSprint &apos;26 <span className={styles.accent}>Information Portal</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Review the PitchSprint &apos;26 rules, team specifications, crucial deadlines, and resources. Solve your domain tasks below to apply.
          </p>
        </motion.div>
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

      {/* ── PitchSprint Information Section ── */}
      <section className={styles.sihSection} id="pitchsprint-info">
        <div className={styles.sihDashboard}>
          {/* Tabs Navigation */}
          <div className={styles.sihTabsList}>
            {sections.map((sec, idx) => (
              <button
                key={sec.id}
                className={`${styles.sihTabButton} ${activeTab === idx ? styles.sihTabActive : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                <span className={styles.sihTabNumber}>{String(sec.id).padStart(2, '0')}</span>
                <span className={styles.sihTabIcon}>{sec.icon}</span>
                <span className={styles.sihTabLabel}>{sec.title}</span>
                {sec.badge && (
                  <span
                    className={styles.sihTabBadge}
                    style={{
                      background: sec.badge === 'Critical' ? '#e10600' : '#00a651'
                    }}
                  >
                    {sec.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content Pane */}
          <div className={styles.sihContentPane}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className={styles.sihContentBody}
              >
                <div className={styles.sihContentHeader}>
                  <span className={styles.sihContentIcon}>{sections[activeTab].icon}</span>
                  <div>
                    <span className={styles.sihContentEyebrow}>
                      Section {String(sections[activeTab].id).padStart(2, '0')}
                    </span>
                    <h3 className={styles.sihContentTitle}>{sections[activeTab].title}</h3>
                  </div>
                </div>
                <div className={styles.sihContentDetail}>
                  {sections[activeTab].content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>



      {/* ── Category sections ── */}
      <section className={styles.categoriesSection}>
        <div className={styles.categoriesInner}>
          {categories.filter(cat => cat.id === 'electronics').map((cat) => (
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
                        href={getFileUrl(task.file)}
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
                              href={`/pitchsprint-26/${task.file}`}
                              download
                              className={styles.dropdownItem}
                            >
                              📄 PDF Only
                            </a>
                            <a
                              href={`/pitchsprint-26/${task.zipFile}`}
                              download
                              className={styles.dropdownItem}
                            >
                              🗜️ ZIP Bundle
                            </a>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={getFileUrl(task.file)}
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
          <h2>Finished your Project?</h2>
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
                          teamName: '',
                          fullName: '',
                          pid: '',
                          problemStatement: '',
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
                        <label className={styles.formLabel}>Team Name *</label>
                        <input
                          type="text"
                          required
                          className={styles.formInput}
                          placeholder="e.g. Team Alfa"
                          value={submitFormData.teamName}
                          onChange={(e) => setSubmitFormData({ ...submitFormData, teamName: e.target.value })}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Leader Name *</label>
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
                        <label className={styles.formLabel}>Problem Statement Track *</label>
                        <select
                          required
                          className={styles.formSelect}
                          value={submitFormData.problemStatement}
                          onChange={(e) => setSubmitFormData({ ...submitFormData, problemStatement: e.target.value })}
                        >
                          <option value="" disabled>Select a Track / Theme</option>
                          <option value="SIH 2026 Track">Kuch BHi</option>
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Upload PPT File (.ppt, .pptx) *</label>
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
