import React from 'react';

const SparklesIcon = ({ className }: { className?: string }): React.ReactNode => (
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
    <path d="M9.94 14.34 8.5 13l-1.44 1.34" />
    <path d="M14.06 9.66 15.5 11l1.44-1.34" />
    <path d="M12 2v4" />
    <path d="m22 12-4 0" />
    <path d="M12 22v-4" />
    <path d="M2 12h4" />
    <path d="m19.07 4.93-1.41 1.41" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 19.07-1.41-1.41" />
    <path d="m6.34 6.34-1.41-1.41" />
  </svg>
);

export default SparklesIcon;
