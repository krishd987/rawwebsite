/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, Clock, Sparkles, Send, CheckCircle2, RotateCcw, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneOrYear: '',
    roleOrCollege: '',
    subject: '',
    inquiryType: 'general',
    message: '',
    preferredChannel: 'email',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const interestOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sponsorship', label: 'Sponsorship & Partnerships' },
    { value: 'collaboration', label: 'Competition Collaboration' },
    { value: 'membership', label: 'Student Recruitment / Joining' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneOrYear: '',
      roleOrCollege: '',
      subject: '',
      inquiryType: 'general',
      message: '',
      preferredChannel: 'email',
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || formData.firstName || 'Anonymous';

    try {
      const response = await fetch('/api/contact/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email: formData.email,
          inquiryType: formData.inquiryType,
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) throw new Error(data.errors.join('. '));
        throw new Error(data.message || 'Failed to send message');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── shared input style ──────────────────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'Montserrat, sans-serif',
    padding: '0.7rem 1rem',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    fontSize: '0.9rem',
    color: 'var(--color-text-primary)',
    background: 'var(--color-bg-secondary)',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    marginBottom: '0.4rem',
    fontFamily: 'Montserrat, sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '0.35rem',
  };

  const sectionSubStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    color: 'var(--color-text-muted)',
    lineHeight: 1.6,
    margin: 0,
  };

  const dividerStyle: React.CSSProperties = {
    borderTop: '1px solid var(--color-border)',
    margin: '0.25rem 0',
  };

  const pillStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding: '0.35rem 0.75rem',
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
    fontFamily: 'var(--font-mono, monospace)',
  };

  return (
    <section
      id="contact"
      style={{
        padding: '2rem 1rem 4rem',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Card */}
      <div
        style={{
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-lg)',
          padding: '2rem 2.5rem',
        }}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--color-border)',
            marginBottom: '1.75rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono, monospace)',
                color: 'var(--color-red)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.4rem',
              }}
            >
              <Sparkles size={13} />
              Get In Touch With Team RAW
            </div>
            <h2
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.6rem',
                fontWeight: 800,
                color: 'var(--color-text-primary)',
                margin: '0 0 0.35rem',
              }}
            >
              Contact &amp; Inquiry
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              Connect with our robotics committee leads, discuss sponsorships, or submit technical collaborations.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span style={pillStyle}>
              <MapPin size={12} style={{ color: 'var(--color-red)' }} />
              SFIT Lab 027
            </span>
            <span style={pillStyle}>
              <Clock size={12} style={{ color: '#60a5fa' }} />
              Response: ~24 hrs
            </span>
          </div>
        </div>

        {/* ── Success State ──────────────────────────────────────────────── */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ padding: '3rem 1rem', textAlign: 'center' }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                color: 'rgb(34, 197, 94)',
              }}
            >
              <CheckCircle2 size={34} />
            </div>
            <h3
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '0.75rem',
              }}
            >
              Inquiry Submitted Successfully!
            </h3>
            <p
              style={{
                color: 'var(--color-text-secondary)',
                maxWidth: '440px',
                margin: '0 auto 1.5rem',
                fontSize: '0.9rem',
                lineHeight: 1.6,
              }}
            >
              Thank you for reaching out to Team RAW. Our team leads will review your inquiry and get back to you within 24 hours.
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://chat.whatsapp.com/GyG30cxCudSK9aPdNLFy6W"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.5rem',
                borderRadius: '10px',
                background: '#25D366',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                marginBottom: '1rem',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              <MessageCircle size={16} />
              Join our WhatsApp Community
            </a>

            <div>
              <button
                onClick={() => { setIsSubmitted(false); handleReset(); }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1.25rem',
                  borderRadius: '8px',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                }}
                type="button"
              >
                <RotateCcw size={13} />
                Submit Another Inquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* Error banner */}
            {error && (
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: 'var(--color-red)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* ── Section 1: Personal Info ─────────────────────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
              <div>
                <h3 style={sectionHeadingStyle}>Personal information</h3>
                <p style={sectionSubStyle}>
                  Provide your identity so our team leads can get in touch with you directly.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={labelStyle}>
                      First name <span style={{ color: 'var(--color-red)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Emma"
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Crown"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>
                    Email address <span style={{ color: 'var(--color-red)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="emma@company.com"
                    required
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={labelStyle}>Phone / Graduation Year</label>
                    <input
                      type="text"
                      name="phoneOrYear"
                      value={formData.phoneOrYear}
                      onChange={handleChange}
                      placeholder="+91 9876543210 or 2026"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Role / Organization</label>
                    <input
                      type="text"
                      name="roleOrCollege"
                      value={formData.roleOrCollege}
                      onChange={handleChange}
                      placeholder="Engineering Lead / SFIT Student"
                      style={inputStyle}
                    />
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', display: 'block' }}>
                      Optional: organization or college department.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={dividerStyle} />

            {/* ── Section 2: Inquiry Details ───────────────────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
              <div>
                <h3 style={sectionHeadingStyle}>Inquiry &amp; Collaboration</h3>
                <p style={sectionSubStyle}>
                  Specify the nature of your request regarding robotics sponsorship or collaboration.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={labelStyle}>Subject / Project name</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Robocon 2026 Sponsorship"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Inquiry category</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      style={{
                        ...inputStyle,
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.85rem center',
                        paddingRight: '2.5rem',
                      }}
                    >
                      {interestOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>
                    Message description <span style={{ color: 'var(--color-red)' }}>*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    minLength={10}
                    placeholder="Provide details about your ideas, questions, sponsorship terms, or how we can collaborate..."
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
                    <span>Kept strictly confidential within Team RAW.</span>
                    <span style={{ color: formData.message.length >= 10 ? 'rgb(34,197,94)' : 'var(--color-text-muted)' }}>
                      {formData.message.length} / 10 min chars
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={dividerStyle} />

            {/* ── Section 3: Communication Preferences ─────────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
              <div>
                <h3 style={sectionHeadingStyle}>Communication preferences</h3>
                <p style={sectionSubStyle}>
                  Select your preferred channel for receiving replies from Team RAW.
                </p>
              </div>
              <div>
                <label style={{ ...labelStyle, marginBottom: '0.75rem' }}>Preferred follow-up channel</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {[
                    { id: 'email', label: 'Email response (official thread)' },
                    { id: 'phone', label: 'Phone call / WhatsApp message' },
                    { id: 'in_person', label: 'In-person meeting at SFIT Robotics Lab (Room 027)' },
                  ].map((option) => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'Montserrat, sans-serif',
                      }}
                    >
                      <input
                        type="radio"
                        name="preferredChannel"
                        value={option.id}
                        checked={formData.preferredChannel === option.id}
                        onChange={handleChange}
                        style={{ accentColor: 'var(--color-red)', width: 15, height: 15 }}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div style={dividerStyle} />

            {/* ── Actions ──────────────────────────────────────────────── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.25rem' }}>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '8px',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  transition: 'background 0.2s ease',
                }}
              >
                <RotateCcw size={13} />
                Reset
              </button>

              <button
                type="submit"
                disabled={isSubmitting || formData.message.length < 10 || !formData.email || !formData.firstName}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '8px',
                  background: (isSubmitting || formData.message.length < 10 || !formData.email || !formData.firstName)
                    ? 'var(--color-bg-secondary)'
                    : 'var(--color-red)',
                  border: 'none',
                  color: (isSubmitting || formData.message.length < 10 || !formData.email || !formData.firstName)
                    ? 'var(--color-text-muted)'
                    : '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: (isSubmitting || formData.message.length < 10 || !formData.email || !formData.firstName) ? 'not-allowed' : 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '0.03em',
                  transition: 'background 0.2s ease',
                  boxShadow: '0 4px 12px rgba(225, 6, 0, 0.2)',
                }}
              >
                {isSubmitting ? (
                  <>
                    <div
                      style={{
                        width: 13,
                        height: 13,
                        border: '2px solid rgba(255,255,255,0.4)',
                        borderTopColor: '#ffffff',
                        borderRadius: '50%',
                        animation: 'spin 0.7s linear infinite',
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    Send Inquiry
                  </>
                )}
              </button>
            </div>

            {/* Spinner keyframe */}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </form>
        )}
      </div>
    </section>
  );
}
