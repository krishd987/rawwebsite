/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Linkedin, Youtube, Github, Twitter, Bot } from 'lucide-react';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerColumns = [
    {
      title: 'Product',
      links: [
        { label: 'Overview', href: '/' },
        { label: 'Competitions', href: '/competitions' },
        { label: 'Robots Gallery', href: '/robots-gallery' },
        { label: 'Innovations', href: '/about#mission' },
        { label: "MOSAIC '26", href: '/mosaic-26' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Core Team', href: '/team' },
        { label: 'Faculty Mentors', href: '/team#mentors' },
        { label: 'Alumni Network', href: '/team#alumni' },
        { label: 'SFIT Affiliation', href: 'https://www.sfit.ac.in' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Recruitment', href: '/register' },
        { label: 'PPT Submission', href: '/ppt-submission' },
        { label: 'Sponsorship Deck', href: '/sponsors' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Help & FAQ', href: '/contact' },
      ],
    },
  ];

  const socialLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/teamraw_sfit', icon: <Instagram size={17} /> },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/team-raw-sfit', icon: <Linkedin size={17} /> },
    { label: 'YouTube', href: 'https://www.youtube.com/@teamrawsfit2026', icon: <Youtube size={17} /> },
    { label: 'GitHub', href: 'https://github.com', icon: <Github size={17} /> },
    { label: 'Twitter', href: 'https://twitter.com', icon: <Twitter size={17} /> },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top 4-Column Grid Section */}
        <div className={styles.topSection}>
          {/* Brand Column (Left) */}
          <div className={styles.brandSection}>
            <Link href="/" className={styles.brandHeader}>
              <div className={styles.logoBadge}>
                <Image
                  src="/logo 1.png"
                  alt="Team RAW Logo"
                  width={34}
                  height={34}
                  className={styles.brandLogoImg}
                />
              </div>
              <span className={styles.brandTitle}>TEAM RAW</span>
            </Link>

            <p className={styles.brandDescription}>
              The official robotics research & competition team of St. Francis Institute of Technology (SFIT).
            </p>

            {/* Social Icons Row */}
            <div className={styles.socialIcons}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={styles.socialIcon}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 3 Nav Links Columns */}
          {footerColumns.map((col) => (
            <div key={col.title} className={styles.linksColumn}>
              <h4 className={styles.columnTitle}>{col.title}</h4>
              <ul className={styles.linksList}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.linkItem}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
