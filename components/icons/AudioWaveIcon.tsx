import React from 'react';

const AudioWaveIcon = ({ className }: { className?: string }): React.ReactNode => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 10v4" />
    <path d="M6 7v10" />
    <path d="M10 4v16" />
    <path d="M14 7v10" />
    <path d="M18 10v4" />
    <path d="M22 10v4" />
  </svg>
);

export default AudioWaveIcon;
