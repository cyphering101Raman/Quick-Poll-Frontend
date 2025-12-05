import React from 'react';

const Logo = ({ width = "100px", className = "" }) => {
  return (
    <img
      src="/Quick-Poll-Logo.webp"
      alt="Logo"
      width={width}
      height={width}
      className={`rounded-3xl ${className}`}
      style={{ width }}
    />
  );
};

export default Logo;
