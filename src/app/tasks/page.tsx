'use client';

import { motion, type Variants } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './tasks.module.css';

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  {
    id: 'mechanical',
    icon: '⚙️',
    label: 'Mechanical',
    color: '#e10600',
  },
  {
    id: 'electronics',
    icon: '🔌',
    label: 'Electronics',
    color: '#0a7ecb',
  },
  {
    id: 'software',
    icon: '💻',
    label: 'Software',
    color: '#00a651',
  },
  {
    id: 'management',
    icon: '📋',
    label: 'Management',
    color: '#f39c12',
  },
];

type Status = 'completed' | 'in-progress' | 'upcoming';

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  status: Status;
  progress: number; // 0-100
  tags: string[];
}

const tasks: Task[] = [
  // Mechanical
  {
    id: 1,
    title: 'Robot Chassis Design',
    description: 'Design and fabricate the primary chassis structure using aluminium extrusions for the competition robot, ensuring optimal weight distribution and rigidity.',
    category: 'mechanical',
    status: 'completed',
    progress: 100,
    tags: ['CAD', 'Fabrication', 'Aluminium'],
  },
  {
    id: 2,
    title: 'Gripper Mechanism',
    description: 'Develop a 2-DOF gripper capable of picking cylindrical objects of varying diameters. Includes servo integration and force feedback considerations.',
    category: 'mechanical',
    status: 'in-progress',
    progress: 65,
    tags: ['Servo', 'Gripper', '2-DOF'],
  },
  {
    id: 3,
    title: 'Wheel & Drive Train Assembly',
    description: 'Assemble the mecanum wheel drive train for omnidirectional movement. Includes motor coupling, belt tensioning, and alignment verification.',
    category: 'mechanical',
    status: 'completed',
    progress: 100,
    tags: ['Mecanum', 'Drive Train', 'Motor'],
  },
  {
    id: 4,
    title: 'Pneumatic Arm System',
    description: 'Design a pneumatic actuator-based arm for rapid deployment tasks. Requires pressure regulation, solenoid valve integration, and safety testing.',
    category: 'mechanical',
    status: 'upcoming',
    progress: 10,
    tags: ['Pneumatics', 'Actuator', 'Safety'],
  },

  // Electronics
  {
    id: 5,
    title: 'Main Control Board',
    description: 'Design and test a custom PCB integrating STM32 microcontroller, motor driver interfaces, sensor headers, and power regulation circuits.',
    category: 'electronics',
    status: 'completed',
    progress: 100,
    tags: ['PCB', 'STM32', 'Power'],
  },
  {
    id: 6,
    title: 'Sensor Array Integration',
    description: 'Integrate IR sensors, encoders, ultrasonic range finders, and a 9-DOF IMU onto the robot. Validate readings with calibration routines.',
    category: 'electronics',
    status: 'in-progress',
    progress: 75,
    tags: ['Sensors', 'IMU', 'Encoders'],
  },
  {
    id: 7,
    title: 'Wireless Communication Module',
    description: 'Set up ESP32-based Wi-Fi/Bluetooth bridge for real-time telemetry, remote debugging, and operator control during testing phases.',
    category: 'electronics',
    status: 'in-progress',
    progress: 50,
    tags: ['ESP32', 'Bluetooth', 'Telemetry'],
  },
  {
    id: 8,
    title: 'Battery Management System',
    description: 'Design BMS for LiPo pack with over-current, over-voltage, and temperature protection. Includes state-of-charge estimation and balance charging.',
    category: 'electronics',
    status: 'upcoming',
    progress: 5,
    tags: ['BMS', 'LiPo', 'Safety'],
  },

  // Software
  {
    id: 9,
    title: 'ROS 2 Navigation Stack',
    description: 'Implement ROS 2 Nav2 stack with SLAM-based mapping using a 2D lidar. Configure costmaps, planners, and recovery behaviours for arena navigation.',
    category: 'software',
    status: 'in-progress',
    progress: 55,
    tags: ['ROS 2', 'SLAM', 'Nav2'],
  },
  {
    id: 10,
    title: 'Computer Vision Pipeline',
    description: 'Build an OpenCV + YOLO object detection pipeline to identify task-specific objects. Optimised for real-time inference on Jetson Nano.',
    category: 'software',
    status: 'in-progress',
    progress: 40,
    tags: ['OpenCV', 'YOLO', 'Jetson'],
  },
  {
    id: 11,
    title: 'Motion Control Algorithms',
    description: 'Implement PID and model-predictive controllers for mecanum drive, arm joints, and gripper. Includes tuning tools and simulation validation.',
    category: 'software',
    status: 'completed',
    progress: 100,
    tags: ['PID', 'Control', 'Simulation'],
  },
  {
    id: 12,
    title: 'Task Execution State Machine',
    description: 'Design and implement a hierarchical finite state machine that orchestrates the full competition task sequence with error recovery.',
    category: 'software',
    status: 'upcoming',
    progress: 15,
    tags: ['FSM', 'Automation', 'Planning'],
  },

  // Management
  {
    id: 13,
    title: 'Documentation & Reports',
    description: 'Maintain technical documentation, design review records, competition reports, and a knowledge base for future team members.',
    category: 'management',
    status: 'in-progress',
    progress: 60,
    tags: ['Docs', 'Reports', 'Wiki'],
  },
  {
    id: 14,
    title: 'Workshop & Training Sessions',
    description: 'Organise weekly workshops covering ROS, embedded systems, PCB design, and mechanical fabrication for new and existing members.',
    category: 'management',
    status: 'in-progress',
    progress: 70,
    tags: ['Training', 'Workshop', 'Upskilling'],
  },
  {
    id: 15,
    title: 'Sponsor Outreach',
    description: 'Identify, contact, and negotiate with potential sponsors for hardware, funding, and industry partnerships for the upcoming competition cycle.',
    category: 'management',
    status: 'upcoming',
    progress: 20,
    tags: ['Sponsorship', 'Outreach', 'Partnership'],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusMeta: Record<Status, { label: string; className: string; icon: string }> = {
  completed:   { label: 'Completed',   className: styles.statusCompleted,  icon: '✓' },
  'in-progress': { label: 'In Progress', className: styles.statusProgress,   icon: '◐' },
  upcoming:    { label: 'Upcoming',    className: styles.statusUpcoming,   icon: '○' },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function TasksPage() {
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const upcomingCount = tasks.filter(t => t.status === 'upcoming').length;
  const overallProgress = Math.round(
    tasks.reduce((sum, t) => sum + t.progress, 0) / totalTasks
  );

  return (
    <main>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.heroEyebrow}>TEAM RAW · WORK IN PROGRESS</span>
          <h1 className={styles.heroTitle}>
            Our <span className={styles.accent}>Tasks</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A transparent look at what Team RAW is building, testing, and planning
            across mechanical, electronics, software, and management domains.
          </p>
        </motion.div>

        {/* Overall progress bar */}
        <motion.div
          className={styles.overallBar}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className={styles.overallBarLabel}>
            <span>Overall Completion</span>
            <strong>{overallProgress}%</strong>
          </div>
          <div className={styles.overallBarTrack}>
            <motion.div
              className={styles.overallBarFill}
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ delay: 0.7, duration: 1.2, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── Stats row ── */}
      <section className={styles.statsRow}>
        {[
          { value: totalTasks,      label: 'Total Tasks',    color: '#0a1a3a' },
          { value: completedCount,  label: 'Completed',      color: '#00a651' },
          { value: inProgressCount, label: 'In Progress',    color: '#0a7ecb' },
          { value: upcomingCount,   label: 'Upcoming',       color: '#f39c12' },
        ].map((s, i) => (
          <motion.div
            key={i}
            className={styles.statCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className={styles.statValue} style={{ color: s.color }}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </motion.div>
        ))}
      </section>

      {/* ── Task categories ── */}
      {categories.map((cat) => {
        const catTasks = tasks.filter(t => t.category === cat.id);
        const catDone = catTasks.filter(t => t.status === 'completed').length;

        return (
          <section key={cat.id} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon} style={{ background: cat.color }}>
                {cat.icon}
              </div>
              <div>
                <h2 className={styles.categoryTitle}>{cat.label}</h2>
                <p className={styles.categoryMeta}>
                  {catDone} / {catTasks.length} tasks completed
                </p>
              </div>
              <div className={styles.categoryProgress}>
                <div className={styles.categoryProgressTrack}>
                  <motion.div
                    className={styles.categoryProgressFill}
                    style={{ background: cat.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.round((catDone / catTasks.length) * 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
                <span className={styles.categoryProgressPct} style={{ color: cat.color }}>
                  {Math.round((catDone / catTasks.length) * 100)}%
                </span>
              </div>
            </div>

            <motion.div
              className={styles.taskGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {catTasks.map(task => {
                const sm = statusMeta[task.status];
                return (
                  <motion.div
                    key={task.id}
                    className={styles.taskCard}
                    variants={cardVariants}
                    whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(0,0,0,0.12)` }}
                  >
                    {/* Top row */}
                    <div className={styles.taskTop}>
                      <span className={`${styles.statusBadge} ${sm.className}`}>
                        <span className={styles.statusIcon}>{sm.icon}</span>
                        {sm.label}
                      </span>
                      <span
                        className={styles.categoryDot}
                        style={{ background: cat.color }}
                        title={cat.label}
                      />
                    </div>

                    {/* Content */}
                    <h3 className={styles.taskTitle}>{task.title}</h3>
                    <p className={styles.taskDesc}>{task.description}</p>

                    {/* Progress bar */}
                    <div className={styles.progressWrap}>
                      <div className={styles.progressHeader}>
                        <span className={styles.progressLabel}>Progress</span>
                        <span className={styles.progressPct}>{task.progress}%</span>
                      </div>
                      <div className={styles.progressTrack}>
                        <motion.div
                          className={styles.progressFill}
                          style={{ background: cat.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${task.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className={styles.tags}>
                      {task.tags.map(tag => (
                        <span key={tag} className={styles.tag} style={{ borderColor: cat.color, color: cat.color }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>
        );
      })}

      {/* ── CTA ── */}
      <motion.section
        className={styles.cta}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.ctaTitle}>Want to contribute?</h2>
        <p className={styles.ctaText}>
          Team RAW is always looking for passionate SFIT students to join and work on exciting robotics projects.
        </p>
        <div className={styles.ctaButtons}>
          <motion.a
            href="/register"
            className={styles.ctaBtnPrimary}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            Join the Team
          </motion.a>
          <motion.a
            href="/about"
            className={styles.ctaBtnSecondary}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            Learn More
          </motion.a>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
