'use client';

import React from 'react';

export function SkeletonLoader({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`w-full max-w-6xl mx-auto p-6 sm:p-10 flex flex-col gap-10 bg-transparent select-none pointer-events-none ${className}`}
      style={{ width: '100%', minHeight: '60vh', ...style }}
    >
      {/* Header Skeleton */}
      <div className="flex justify-between items-center w-full border-b border-[#242424]/10 pb-6 shrink-0" style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.1)', paddingBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="h-6 w-28 bg-[#242424]/10 rounded-lg animate-pulse" style={{ height: '1.5rem', width: '7rem', backgroundColor: 'rgba(225, 6, 0, 0.12)', borderRadius: '0.5rem' }} />
        <div className="hidden sm:flex gap-8" style={{ display: 'flex', gap: '2rem' }}>
          <div className="h-4 w-16 bg-[#242424]/10 rounded-md animate-pulse" style={{ height: '1rem', width: '4rem', backgroundColor: 'rgba(15, 23, 42, 0.08)', borderRadius: '0.375rem' }} />
          <div className="h-4 w-16 bg-[#242424]/10 rounded-md animate-pulse" style={{ height: '1rem', width: '4rem', backgroundColor: 'rgba(15, 23, 42, 0.08)', borderRadius: '0.375rem' }} />
          <div className="h-4 w-16 bg-[#242424]/10 rounded-md animate-pulse" style={{ height: '1rem', width: '4rem', backgroundColor: 'rgba(15, 23, 42, 0.08)', borderRadius: '0.375rem' }} />
        </div>
        <div className="h-9 w-24 bg-[#242424]/10 rounded-full animate-pulse" style={{ height: '2.25rem', width: '6rem', backgroundColor: 'rgba(225, 6, 0, 0.15)', borderRadius: '9999px' }} />
      </div>

      {/* Hero Skeleton Section */}
      <div className="flex flex-col gap-4 py-8 items-center text-center max-w-2xl mx-auto w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem 0', margin: '0 auto', maxWidth: '42rem' }}>
        <div className="h-10 w-4/5 bg-[#242424]/15 rounded-xl animate-pulse" style={{ height: '2.5rem', width: '80%', backgroundColor: 'rgba(225, 6, 0, 0.15)', borderRadius: '0.75rem' }} />
        <div className="h-10 w-2/3 bg-[#242424]/15 rounded-xl animate-pulse" style={{ height: '2.5rem', width: '65%', backgroundColor: 'rgba(15, 23, 42, 0.1)', borderRadius: '0.75rem' }} />
        <div className="h-4 w-full bg-[#242424]/10 rounded-md mt-4 animate-pulse" style={{ height: '1rem', width: '100%', backgroundColor: 'rgba(15, 23, 42, 0.08)', borderRadius: '0.375rem', marginTop: '1rem' }} />
        <div className="h-4 w-5/6 bg-[#242424]/10 rounded-md animate-pulse" style={{ height: '1rem', width: '83%', backgroundColor: 'rgba(15, 23, 42, 0.08)', borderRadius: '0.375rem' }} />
      </div>

      {/* Grid Content Skeleton */}
      <div className="flex flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="h-6 w-40 bg-[#242424]/15 rounded-lg animate-pulse mb-2" style={{ height: '1.5rem', width: '10rem', backgroundColor: 'rgba(225, 6, 0, 0.12)', borderRadius: '0.5rem', marginBottom: '0.5rem' }} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white/40 flex flex-col gap-4" style={{ background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(8px)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid rgba(15, 23, 42, 0.1)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="aspect-video w-full bg-[#242424]/10 rounded-xl animate-pulse" style={{ width: '100%', height: '140px', backgroundColor: 'rgba(225, 6, 0, 0.1)', borderRadius: '0.75rem' }} />
              <div className="h-3 w-1/4 bg-[#242424]/10 rounded-md animate-pulse" style={{ height: '0.75rem', width: '25%', backgroundColor: 'rgba(15, 23, 42, 0.08)', borderRadius: '0.375rem' }} />
              <div className="h-5 w-3/4 bg-[#242424]/15 rounded-md animate-pulse" style={{ height: '1.25rem', width: '75%', backgroundColor: 'rgba(225, 6, 0, 0.15)', borderRadius: '0.375rem' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
