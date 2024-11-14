import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={`rounded-lg text-[20px]  flex justify-center items-center ${className}`}>
      {children}
    </button>
  );
};

export default Button;