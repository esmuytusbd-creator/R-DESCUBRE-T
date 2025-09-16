import React from 'react';

const LeafIcon = ({ className }: { className?: string }): React.ReactNode => (
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
    <path d="M11 20A7 7 0 0 1 4 13V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <path d="M15.21 12.43A7 7 0 0 1 22 19.43V20a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-2.17"></path>
    <path d="M11 4h4"></path>
  </svg>
);

export default LeafIcon;
