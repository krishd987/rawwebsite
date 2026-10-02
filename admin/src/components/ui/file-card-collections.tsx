'use client';

import React from 'react';
import {
  FileText,
  FileCode,
  FileSpreadsheet,
  FileArchive,
  FilePieChart,
  FileImage,
  Video,
  FileJson,
  FileSpreadsheet as FileCsv,
  File as GenericFile,
} from 'lucide-react';

export type FileFormat =
  | 'txt'
  | 'doc'
  | 'pdf'
  | 'md'
  | 'mdx'
  | 'xls'
  | 'csv'
  | 'zip'
  | 'tar'
  | 'ppt'
  | 'pptx'
  | 'json'
  | 'css'
  | 'code'
  | 'png'
  | 'jpg'
  | 'img'
  | 'video';

export interface FileCardProps {
  formatFile: FileFormat;
  fileName?: string;
  fileSize?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function FileCard({
  formatFile,
  fileName,
  fileSize = '1.2 MB',
  className = '',
  style = {},
}: FileCardProps) {
  const getIconAndColor = (format: FileFormat) => {
    switch (format) {
      case 'pdf':
        return { icon: FileText, color: '#ef4444', label: 'PDF Document' };
      case 'doc':
        return { icon: FileText, color: '#3b82f6', label: 'Word Document' };
      case 'txt':
      case 'md':
      case 'mdx':
        return { icon: FileText, color: '#64748b', label: 'Text / Markdown' };
      case 'xls':
      case 'csv':
        return { icon: FileCsv, color: '#10b981', label: 'Spreadsheet' };
      case 'zip':
      case 'tar':
        return { icon: FileArchive, color: '#f59e0b', label: 'Archive' };
      case 'ppt':
      case 'pptx':
        return { icon: FilePieChart, color: '#f97316', label: 'Presentation' };
      case 'json':
        return { icon: FileJson, color: '#8b5cf6', label: 'JSON Data' };
      case 'css':
      case 'code':
        return { icon: FileCode, color: '#06b6d4', label: 'Source Code' };
      case 'png':
      case 'jpg':
      case 'img':
        return { icon: FileImage, color: '#ec4899', label: 'Image File' };
      case 'video':
        return { icon: Video, color: '#8b5cf6', label: 'Video Media' };
      default:
        return { icon: GenericFile, color: 'var(--color-red, #E10600)', label: 'File' };
    }
  };

  const { icon: Icon, color } = getIconAndColor(formatFile);
  const displayName = fileName || `document.${formatFile}`;

  return (
    <div
      className={`file-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '110px',
        padding: '1.25rem 0.85rem',
        borderRadius: '1rem',
        background: 'var(--card-bg, #ffffff)',
        border: '1px solid var(--border, rgba(15, 23, 42, 0.12))',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        cursor: 'pointer',
        ...style,
      }}
    >
      {/* Format Badge */}
      <span
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          fontSize: '0.65rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          padding: '2px 6px',
          borderRadius: '4px',
          background: `${color}15`,
          color: color,
        }}
      >
        {formatFile}
      </span>

      {/* Main SVG Icon */}
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '0.75rem',
          background: `${color}10`,
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.75rem',
        }}
      >
        <Icon size={24} strokeWidth={1.75} />
      </div>

      <span
        style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--text-main, #0f172a)',
          textAlign: 'center',
          width: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {displayName}
      </span>

      <span
        style={{
          fontSize: '0.7rem',
          color: '#94a3b8',
          marginTop: '2px',
        }}
      >
        {fileSize}
      </span>
    </div>
  );
}

export default FileCard;
