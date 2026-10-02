'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileCheck, X, FileText } from 'lucide-react';

export interface AnimatedFileUploadProps {
  accept?: string;
  maxSize?: number; // in bytes
  onFilesSelected?: (files: File[]) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedFileUpload({
  accept = '*',
  maxSize = 10 * 1024 * 1024,
  onFilesSelected,
  className = '',
  style = {},
}: AnimatedFileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return;
    setError(null);
    const valid: File[] = [];

    Array.from(incoming).forEach((f) => {
      if (f.size > maxSize) {
        setError(`File "${f.name}" exceeds maximum size of ${(maxSize / (1024 * 1024)).toFixed(0)}MB`);
      } else {
        valid.push(f);
      }
    });

    const updated = [...files, ...valid];
    setFiles(updated);
    if (onFilesSelected) onFilesSelected(updated);
  };

  const removeFile = (idx: number) => {
    const updated = files.filter((_, i) => i !== idx);
    setFiles(updated);
    if (onFilesSelected) onFilesSelected(updated);
  };

  return (
    <div
      className={`animated-file-upload ${className}`}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', ...style }}
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onDragEnter={() => setDragActive(true)}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        style={{
          borderRadius: '1rem',
          border: `2px dashed ${
            dragActive ? 'var(--color-red, #E10600)' : 'var(--border, rgba(15, 23, 42, 0.15))'
          }`,
          background: dragActive
            ? 'rgba(225, 6, 0, 0.05)'
            : 'var(--card-bg, rgba(248, 250, 252, 0.6))',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />

        <motion.div
          animate={{ y: dragActive ? -5 : 0 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(225, 6, 0, 0.1)',
            color: 'var(--color-red, #E10600)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
          }}
        >
          <Upload size={24} />
        </motion.div>

        <h4 style={{ margin: '0 0 0.25rem', fontSize: '1rem', fontWeight: 700, color: 'var(--text-main, #0f172a)' }}>
          Drop your files here, or <span style={{ color: 'var(--color-red, #E10600)' }}>browse</span>
        </h4>
        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
          Supports images, PDFs, CAD models up to {(maxSize / (1024 * 1024)).toFixed(0)}MB
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '0.5rem 0.85rem',
            borderRadius: '0.5rem',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            fontSize: '0.85rem',
          }}
        >
          {error}
        </motion.div>
      )}

      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <AnimatePresence>
            {files.map((file, idx) => (
              <motion.div
                key={file.name + idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.65rem',
                  background: 'var(--card-bg, #ffffff)',
                  border: '1px solid var(--border, rgba(15, 23, 42, 0.1))',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                  <FileText size={20} style={{ color: 'var(--color-red, #E10600)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main, #0f172a)' }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileCheck size={18} style={{ color: '#22c55e' }} />
                  <button
                    onClick={() => removeFile(idx)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default AnimatedFileUpload;
