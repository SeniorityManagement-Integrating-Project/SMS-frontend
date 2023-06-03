import React from 'react';

export const Button = ({ children, className, disabled, ...props }: any) => (
  <button
    className={`px-5 py-2 text-lg text-white rounded-lg bg-primary ${className} ${
      disabled && 'opacity-50 cursor-not-allowed'
    }`}
    type='button'
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);
