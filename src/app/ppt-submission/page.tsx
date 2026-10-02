import PptSubmissionForm from '../components/PptSubmissionForm';
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';
import styles from './page.module.css';

export default function PptSubmissionPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
        <AnimatedGridPattern
          numSquares={35}
          maxOpacity={0.08}
          width={50}
          height={50}
          duration={3.5}
          repeatDelay={1.2}
          strokeDasharray={0}
          style={{
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)',
          }}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      </div>
      <main className={styles.main} style={{ position: 'relative', zIndex: 1 }}>
        <PptSubmissionForm />
      </main>
    </div>
  );
}
