import React from 'react';

interface BackgroundContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const BackgroundContainer = ({ children, className = '' }: BackgroundContainerProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};