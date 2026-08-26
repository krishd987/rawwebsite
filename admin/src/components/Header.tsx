/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

export default function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { admin, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  // Get initials from email
  const getInitials = () => {
    if (!admin?.email) return 'A';
    return admin.email.charAt(0).toUpperCase();
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onToggleSidebar} aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h1>Admin Dashboard</h1>
      </div>
      <div className={styles.right}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>
            {admin?.name || admin?.email || 'Admin'}
          </span>
          <img 
            src="/logo-white.png" 
            alt="Team Raw Avatar" 
            className={styles.avatar} 
            style={{ objectFit: 'contain', padding: '4px', background: 'var(--primary)' }} 
          />
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
}
