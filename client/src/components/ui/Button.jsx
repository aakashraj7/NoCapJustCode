// client/src/components/ui/Button.jsx
import React from 'react';
import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  href,
  ...props
}) {
  const combinedClassName = `
    ${styles.button}
    ${styles[variant] || styles.primary}
    ${styles[size] || styles.md}
    ${fullWidth ? styles.fullWidth : ''}
    ${className}
  `.trim();

  if (href) {
    return (
      <a href={href} className={combinedClassName} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
