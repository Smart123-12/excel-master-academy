import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  className = '',
  name,
  id,
  required = false,
  disabled = false,
}: InputProps) {
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`
            w-full rounded-xl border bg-white px-4 py-2.5 text-gray-900
            placeholder:text-gray-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
            disabled:opacity-50 disabled:cursor-not-allowed
            dark:bg-dark-light dark:text-white dark:border-dark-lighter dark:placeholder:text-gray-500
            dark:focus:border-primary-400 dark:focus:ring-primary-400/50
            ${icon ? 'pl-10' : ''}
            ${
              error
                ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500 dark:border-red-500'
                : 'border-gray-300 dark:border-dark-lighter'
            }
          `}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
