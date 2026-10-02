'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface PaginationProps {
  totalPages?: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function PaginationComponent({
  totalPages = 8,
  initialPage = 1,
  onPageChange,
  className = '',
  style = {},
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('ellipsis');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }

    return pages.map((page, idx) => {
      if (page === 'ellipsis') {
        return (
          <span
            key={`ellipsis-${idx}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              color: '#94a3b8',
            }}
          >
            <MoreHorizontal size={16} />
          </span>
        );
      }

      const isActive = currentPage === page;
      return (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '0.5rem',
            border: isActive
              ? '1px solid var(--color-red, #E10600)'
              : '1px solid var(--border, rgba(15, 23, 42, 0.12))',
            background: isActive ? 'var(--color-red, #E10600)' : 'var(--card-bg, #ffffff)',
            color: isActive ? '#ffffff' : 'var(--text-main, #0f172a)',
            fontWeight: isActive ? 700 : 500,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <nav
      aria-label="Pagination"
      className={`pagination-component ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.35rem 0.65rem',
        borderRadius: '0.75rem',
        background: 'var(--card-bg, rgba(255, 255, 255, 0.8))',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--border, rgba(15, 23, 42, 0.12))',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
        ...style,
      }}
    >
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.25rem',
          padding: '0 0.75rem',
          height: '36px',
          borderRadius: '0.5rem',
          border: '1px solid var(--border, rgba(15, 23, 42, 0.12))',
          background: 'var(--card-bg, #ffffff)',
          color: currentPage === 1 ? '#cbd5e1' : 'var(--text-main, #0f172a)',
          fontWeight: 600,
          fontSize: '0.85rem',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <ChevronLeft size={16} />
        <span>Prev</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.25rem',
          padding: '0 0.75rem',
          height: '36px',
          borderRadius: '0.5rem',
          border: '1px solid var(--border, rgba(15, 23, 42, 0.12))',
          background: 'var(--card-bg, #ffffff)',
          color: currentPage === totalPages ? '#cbd5e1' : 'var(--text-main, #0f172a)',
          fontWeight: 600,
          fontSize: '0.85rem',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

export default PaginationComponent;
