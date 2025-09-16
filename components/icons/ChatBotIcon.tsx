import React from 'react';

const ChatBotIcon = ({ className }: { className?: string }): React.ReactNode => (
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
    <path d="M12 20.94c-4.6 0-8.34-3.58-8.34-8V8a8 8 0 0 1 8-8h0a8 8 0 0 1 8 8v4.94c0 4.42-3.73 8-8.34 8Z" />
    <path d="m15.7 10.8-1.1-1.1a2.18 2.18 0 0 0-3.2 0l-1.1 1.1" />
    <path d="M12 14v-2" />
  </svg>
);

export default ChatBotIcon;
