/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Competitions', href: '/competitions' },
    { label: 'Robots', href: '/robots-gallery' },
    { label: 'Team', href: '/team' },
    { label: 'Gallery', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/teamraw_sfit',
      icon: <Instagram size={18} />,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/team-raw-sfit',
      icon: <Linkedin size={18} />,
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@teamrawsfit2026',
      icon: <Youtube size={18} />,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main 4-Column Section */}
        <div className={styles.grid}>
          {/* Column 1: Brand, Mission & SFIT Affiliation */}
          <div className={styles.brandCol}>
            {/* Team RAW Logo Image */}
            <div className={styles.logoWrap}>
              <Image
                src="/logo 1.png"
                alt="Team RAW SFIT Logo"
                width={170}
                height={80}
                className={styles.brandLogoImg}
                priority
              />
            </div>

            <h2 className={styles.brandTitle}>TEAM RAW</h2>
            <h3 className={styles.brandSubtitle}>Robotics & Aviation Wing</h3>

            <p className={styles.brandDescription}>
              Building the next generation of autonomous robots through innovation,
              engineering excellence, and collaborative teamwork.
            </p>

            <div className={styles.divider} />

            {/* Official Affiliation Box */}
            <div className={styles.affiliationSection}>
              <span className={styles.affiliationHeader}>OFFICIALLY AFFILIATED WITH</span>
              <div className={styles.collegeBadgeCard}>
                <Image
                  src="/collegelogo.png"
                  alt="St. Francis Institute of Technology Logo"
                  width={56}
                  height={56}
                  className={styles.collegeLogoImg}
                />
              </div>
              <p className={styles.collegeName}>St. Francis Institute of Technology</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.linksCol}>
            <h3 className={styles.colHeader}>QUICK LINKS</h3>
            <ul className={styles.linksList}>
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect With Us */}
          <div className={styles.connectCol}>
            <h3 className={styles.colHeader}>CONNECT WITH US</h3>
            <div className={styles.socialButtonsRow}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={styles.socialCircleBtn}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className={styles.contactCol}>
            <h3 className={styles.colHeader}>CONTACT INFO</h3>

            <div className={styles.contactGroup}>
              <h4 className={styles.contactSubHeader}>CONTACT EMAIL</h4>
              <a href="mailto:teamraw@sfit.ac.in" className={styles.contactLink}>
                teamraw@sfit.ac.in
              </a>
            </div>

            <div className={styles.contactGroup}>
              <h4 className={styles.contactSubHeader}>ADDRESS</h4>
              <div className={styles.addressBlock}>
                <p>St. Francis Institute of Technology</p>
                <p>Mount Poinsur, S.V.P. Road, Borivali (West)</p>
                <p>Mumbai - 400103, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {currentYear} Team RAW SFIT. All rights reserved.
          </p>

          <div className={styles.legalLinks}>
            <Link href="/contact" className={styles.legalItem}>
              Terms and Conditions
            </Link>
            <Link href="/contact" className={styles.legalItem}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
