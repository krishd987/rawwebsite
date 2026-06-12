'use client';

import { motion, type Variants } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './tasks.module.css';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface TaskFile {
  label: string;
  file: string; // path under /tasks/
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
      { label: 'Electronics Task 1', file: 'E_1.pdf' },
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
      { label: 'Mechanical Task 1', file: 'M_1.pdf' },
      { label: 'Mechanical Task 2', file: 'M_2.pdf' },
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
    id: 'matplotlib',
    icon: '📊',
    title: 'Matplotlib / Data',
    description: 'Data analysis, visualisation and Python plotting tasks using Matplotlib.',
    color: '#e67e22',
    tasks: [
      { label: 'Matplotlib Task 1', file: 'ML_1.pdf' },
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
            Download your domain task below, complete it, and submit it along with your
            registration. Tasks are available across all technical and non-technical domains.
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
            { step: '01', icon: '📥', text: 'Download your domain task PDF' },
            { step: '02', icon: '🛠️', text: 'Complete the task on your own' },
            { step: '03', icon: '📝', text: 'Register and mention the task done' },
          ].map((s, i) => (
            <motion.div
              key={i}
              className={styles.howCard}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
            >
              <span className={styles.howStep}>{s.step}</span>
              <span className={styles.howIcon}>{s.icon}</span>
              <p className={styles.howText}>{s.text}</p>
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
                        <p className={styles.taskCardFormat}>PDF Document</p>
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
                      <a
                        href={`/tasks/${task.file}`}
                        download
                        className={styles.btnDownload}
                        style={{ background: cat.color }}
                      >
                        ⬇ Download
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
