/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import { ReactNode, useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';
import styles from './layout.module.css';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const saved = localStorage.getItem('adminSettings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.darkMode) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
        if (parsed.compactView) {
          document.documentElement.setAttribute('data-compact', 'true');
        } else {
          document.documentElement.removeAttribute('data-compact');
        }
        if (parsed.animations === false) {
          document.documentElement.setAttribute('data-no-animations', 'true');
        } else {
          document.documentElement.removeAttribute('data-no-animations');
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div className={styles.main}>
          <Header onToggleSidebar={toggleSidebar} />
          <main className={styles.content}>
            {children}
          </main>
        </div>
        {isSidebarOpen && <div className={styles.overlay} onClick={closeSidebar} />}
      </div>
    </ProtectedRoute>
  );
}
