/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import React, { useState, useEffect } from 'react';
import styles from './analytics.module.css';

interface TeamStats {
  total: number;
  byCategory: { core: number; mentors: number; members: number; alumni: number };
  byDepartment: Record<string, number>;
  trend?: number;
}

interface GalleryStats {
  total: number;
  byCategory: Record<string, number>;
  trend?: number;
}

interface ContactStats {
  total: number;
  byStatus: { new: number; read: number; replied: number };
  trend?: number;
}

export default function Analytics() {
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null);
  const [galleryStats, setGalleryStats] = useState<GalleryStats | null>(null);
  const [contactStats, setContactStats] = useState<ContactStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      
      // Fetch contact messages
      const contactResponse = await fetch(`${apiUrl}/api/contact/messages`);
      const contactData = await contactResponse.json();
      
      // Fetch updates
      const updatesResponse = await fetch(`${apiUrl}/api/updates`);
      const updatesData = await updatesResponse.json();
      
      if (contactData.success && contactData.data) {
        const contacts = contactData.data;
        setContactStats({
          total: contacts.length,
          byStatus: {
            new: contacts.filter((c: any) => c.status === 'unread').length,
            read: contacts.filter((c: any) => c.status === 'read' && !c.replied).length,
            replied: contacts.filter((c: any) => c.replied).length,
          },
          trend: 0, // Calculate based on last period if needed
        });
      }

      // Mock team and gallery stats (can be replaced with real API calls later)
      setTeamStats({
        total: 24,
        byCategory: { core: 8, mentors: 4, members: 10, alumni: 2 },
        byDepartment: { Mechanical: 8, Electronics: 7, Software: 6, Management: 3 },
        trend: 12.5,
      });
      
      setGalleryStats({
        total: 156,
        byCategory: { robots: 42, events: 38, workshops: 28, competitions: 24, team: 14, milestones: 10 },
        trend: 8.3,
      });
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Fallback to mock data on error
      setContactStats({
        total: 0,
        byStatus: { new: 0, read: 0, replied: 0 },
        trend: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    const now = new Date();
    const diff = now.getTime() - lastUpdated.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return lastUpdated.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const renderTrend = (trend?: number) => {
    if (!trend) return null;
    const isPositive = trend > 0;
    return (
      <span className={`${styles.trend} ${isPositive ? styles.trendUp : styles.trendDown}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
      </span>
    );
  };

  const MetricCard = ({ 
    icon, 
    label, 
    value, 
    color, 
    trend, 
    loading 
  }: { 
    icon: React.ReactNode; 
    label: string; 
    value: number; 
    color: string; 
    trend?: number; 
    loading?: boolean;
  }) => (
    <div className={`${styles.metricCard} ${styles[color]}`} title={label}>
      {loading ? (
        <div className={styles.skeletonCard}>
          <div className={styles.skeletonIcon}></div>
          <div className={styles.skeletonText}></div>
        </div>
      ) : (
        <>
          <div className={styles.metricIcon}>{icon}</div>
          <div className={styles.metricContent}>
            <div className={styles.metricValue}>{value}</div>
            <div className={styles.metricLabel}>{label}</div>
          </div>
          {trend !== undefined && renderTrend(trend)}
        </>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Analytics Dashboard</h1>
          <p className={styles.subtitle}>Platform insights and metrics</p>
        </div>
        <div className={styles.metricsGrid}>
          {[...Array(6)].map((_, i) => (
            <MetricCard key={i} icon={<div />} label="" value={0} color="gray" loading={true} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Analytics Dashboard</h1>
          <p className={styles.subtitle}>Platform insights and performance metrics</p>
        </div>
        {lastUpdated && (
          <div className={styles.lastUpdated}>
            <span className={styles.updateIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </span>
            Last updated: {formatLastUpdated()}
          </div>
        )}
      </div>

      {/* Key Metrics Overview */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          </span>
          Key Metrics
        </h2>
        <div className={styles.metricsGrid}>
          <MetricCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            } 
            label="Total Members" 
            value={teamStats?.total || 0} 
            color="red" 
            trend={teamStats?.trend}
          />
          <MetricCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            } 
            label="Contact Messages" 
            value={contactStats?.total || 0} 
            color="blue" 
            trend={contactStats?.trend}
          />
          <MetricCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            } 
            label="Gallery Images" 
            value={galleryStats?.total || 0} 
            color="green" 
            trend={galleryStats?.trend}
          />
          <MetricCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M22 12h-6l-3 9L9 3l-3 9H2"></path>
              </svg>
            } 
            label="Unread Messages" 
            value={contactStats?.byStatus?.new || 0} 
            color="orange"
          />
          <MetricCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            } 
            label="Replied Messages" 
            value={contactStats?.byStatus?.replied || 0} 
            color="green"
          />
          <MetricCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            } 
            label="Mentors" 
            value={teamStats?.byCategory.mentors || 0} 
            color="purple"
          />
        </div>
      </div>

      <div className={styles.divider}></div>

      {/* Team Statistics */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </span>
          Team Statistics
        </h2>
        
        {teamStats && teamStats.total > 0 ? (
          <>
            <div className={styles.categoryGrid}>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ff9800' }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <div className={styles.categoryValue}>{teamStats.byCategory.core}</div>
                <div className={styles.categoryLabel}>Core Team</div>
              </div>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#03a9f4' }}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className={styles.categoryValue}>{teamStats.byCategory.mentors}</div>
                <div className={styles.categoryLabel}>Mentors</div>
              </div>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4caf50' }}>
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <div className={styles.categoryValue}>{teamStats.byCategory.members}</div>
                <div className={styles.categoryLabel}>Members</div>
              </div>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#9c27b0' }}>
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                  </svg>
                </div>
                <div className={styles.categoryValue}>{teamStats.byCategory.alumni}</div>
                <div className={styles.categoryLabel}>Alumni</div>
              </div>
            </div>

            <div className={styles.chartContainer}>
              <h3 className={styles.chartTitle}>Members by Department</h3>
              <div className={styles.barChart}>
                {Object.entries(teamStats.byDepartment).map(([dept, count]) => {
                  const maxCount = Math.max(...Object.values(teamStats.byDepartment));
                  const percentage = (count / maxCount) * 100;
                  return (
                    <div key={dept} className={styles.barItem}>
                      <div className={styles.barLabel}>{dept}</div>
                      <div className={styles.barWrapper}>
                        <div className={styles.bar} style={{ width: `${percentage}%` }}>
                          <span className={styles.barValue}>{count}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>No team data available</h3>
            <p className={styles.emptyText}>Team member statistics will appear here once data is available</p>
          </div>
        )}
      </div>

      <div className={styles.divider}></div>

      {/* Gallery Statistics */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </span>
          Gallery Statistics
        </h2>
        
        {galleryStats && galleryStats.total > 0 ? (
          <div className={styles.categoryGrid}>
            {Object.entries(galleryStats.byCategory).map(([category, count]) => (
              <div key={category} className={styles.categoryCard}>
                <div className={styles.categoryValue}>{count}</div>
                <div className={styles.categoryLabel}>{category.charAt(0).toUpperCase() + category.slice(1)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>No gallery data available</h3>
            <p className={styles.emptyText}>Gallery statistics will be displayed here once images are uploaded</p>
          </div>
        )}
      </div>

      <div className={styles.divider}></div>

      {/* Contact Messages Breakdown */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </span>
          Contact Messages Breakdown
        </h2>
        
        {contactStats && contactStats.total > 0 ? (
          <div className={styles.statusGrid}>
            <div className={`${styles.statusCard} ${styles.statusNew}`}>
              <div className={styles.statusIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ff9800' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className={styles.statusValue}>{contactStats.byStatus.new}</div>
              <div className={styles.statusLabel}>New Messages</div>
              <div className={styles.statusBar}>
                <div 
                  className={styles.statusFill} 
                  style={{ width: `${(contactStats.byStatus.new / contactStats.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className={`${styles.statusCard} ${styles.statusRead}`}>
              <div className={styles.statusIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#03a9f4' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className={styles.statusValue}>{contactStats.byStatus.read}</div>
              <div className={styles.statusLabel}>Read Messages</div>
              <div className={styles.statusBar}>
                <div 
                  className={styles.statusFill} 
                  style={{ width: `${(contactStats.byStatus.read / contactStats.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className={`${styles.statusCard} ${styles.statusReplied}`}>
              <div className={styles.statusIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4caf50' }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className={styles.statusValue}>{contactStats.byStatus.replied}</div>
              <div className={styles.statusLabel}>Replied</div>
              <div className={styles.statusBar}>
                <div 
                  className={styles.statusFill} 
                  style={{ width: `${(contactStats.byStatus.replied / contactStats.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>No contact messages yet</h3>
            <p className={styles.emptyText}>Message statistics will be shown here when users start contacting you</p>
          </div>
        )}
      </div>

      {/* System Health Summary */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
          </span>
          System Health
        </h2>
        <div className={styles.healthGrid}>
          <div className={styles.healthCard}>
            <div className={styles.healthStatus}>
              <span className={`${styles.healthDot} ${styles.healthGood}`}></span>
              <span className={styles.healthLabel}>Team Management</span>
            </div>
            <p className={styles.healthText}>
              {teamStats?.total || 0} members across {Object.keys(teamStats?.byDepartment || {}).length} departments
            </p>
          </div>
          <div className={styles.healthCard}>
            <div className={styles.healthStatus}>
              <span className={`${styles.healthDot} ${styles.healthGood}`}></span>
              <span className={styles.healthLabel}>Content Library</span>
            </div>
            <p className={styles.healthText}>
              {galleryStats?.total || 0} images in gallery
            </p>
          </div>
          <div className={styles.healthCard}>
            <div className={styles.healthStatus}>
              <span className={`${styles.healthDot} ${contactStats && contactStats.byStatus.new > 5 ? styles.healthWarning : styles.healthGood}`}></span>
              <span className={styles.healthLabel}>Communication</span>
            </div>
            <p className={styles.healthText}>
              {contactStats?.byStatus?.new || 0} unread message{contactStats && contactStats.byStatus?.new !== 1 ? 's' : ''} 
              {contactStats && contactStats.byStatus?.new > 5 ? ' - needs attention' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
