'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, File, X, CheckCircle2 } from 'lucide-react';

export interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FileUpload({
  onFilesSelected,
  accept = '*',
  multiple = true,
  maxSizeMB = 10,
  className = '',
  style = {},
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles || incomingFiles.length === 0) return;
    setError(null);
    const validFiles: File[] = [];

    Array.from(incomingFiles).forEach((file) => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File ${file.name} exceeds maximum limit of ${maxSizeMB}MB.`);
        return;
      }
      validFiles.push(file);
    });

    const newFileList = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(newFileList);
    if (onFilesSelected) {
      onFilesSelected(newFileList);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (onFilesSelected) {
      onFilesSelected(updated);
    }
  };

  return (
    <div
      className={`file-upload-wrapper ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        ...style,
      }}
    >
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${
            dragActive ? 'var(--color-red, #E10600)' : 'var(--border, rgba(15, 23, 42, 0.15))'
          }`,
          borderRadius: '0.85rem',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          background: dragActive
            ? 'rgba(225, 6, 0, 0.04)'
            : 'var(--card-bg, rgba(248, 250, 252, 0.5))',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />

        <div
          style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            background: 'rgba(225, 6, 0, 0.1)',
            color: 'var(--color-red, #E10600)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <UploadCloud size={24} />
        </div>

        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main, #0f172a)' }}>
            <span style={{ color: 'var(--color-red, #E10600)' }}>Click to upload</span> or drag and drop
          </p>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#64748b' }}>
            SVG, PNG, JPG, CAD, or PDF (max {maxSizeMB}MB)
          </p>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            fontSize: '0.85rem',
          }}
        >
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {files.map((file, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.6rem 0.85rem',
                borderRadius: '0.5rem',
                background: 'var(--card-bg, #f8fafc)',
                border: '1px solid var(--border, rgba(15, 23, 42, 0.08))',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflow: 'hidden' }}>
                <File size={18} style={{ color: 'var(--color-red, #E10600)', flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {file.name}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', flexShrink: 0 }}>
                  ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} style={{ color: '#22c55e' }} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    padding: '2px',
                    display: 'flex',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
