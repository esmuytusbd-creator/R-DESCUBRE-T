import React from 'react';

const NutritionIcon = ({ className }: { className?: string }): React.ReactNode => (
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
    <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8Z"></path>
    <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 1.8.7 2.5 0l7.3-7.3a4.2 4.2 0 0 0 0-6L15 15Z"></path>
    <path d="M2.1 21.8a2.8 2.8 0 0 0 4 0l6.3-6.3a4.2 4.2 0 0 0-6-6L1.8 2.1a2.8 2.8 0 0 0 0 4Z"></path>
    <path d="m22 2-1.5 1.5"></path>
  </svg>
);

export default NutritionIcon;
