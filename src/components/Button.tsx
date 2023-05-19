import React from 'react';

export const Button = ({ children, className, ...props }: any) => (
  <button className={`px-5 py-2 text-lg text-white rounded-lg bg-primary ${className}`} type='button' {...props}>
    {children}
  </button>
);
