import PptSubmissionForm from '../components/PptSubmissionForm';
import KineticGrid from '@/components/ui/kinetic-grid';
import styles from './page.module.css';

export default function PptSubmissionPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <KineticGrid style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: -1 }} />
      <main className={styles.main} style={{ position: 'relative', zIndex: 1 }}>
        <PptSubmissionForm />
      </main>
    </div>
  );
}
