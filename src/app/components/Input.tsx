"use client"
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputProps {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label: string;
  required?: boolean;
  name?:string
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, className, label, required, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex flex-col gap-1 w-full">
      <label className='text-black font-bold text-[14px]'>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={`placeholder:text-black placeholder:text-sm outline-none text-black text-[18px] drop-shadow-md shadow-md py-2 w-full rounded-lg ${className}`}
      />
      {type === 'password' && (
        <span
          onClick={togglePasswordVisibility}
          className="absolute right-4 bottom-3 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash color='#808080' size={24} /> : <FaEye color='#808080' size={24} />}
        </span>
      )}
    </div>
  );
};

export default Input;