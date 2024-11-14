"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import { BsArrowLeft } from 'react-icons/bs';

const BackIcon: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button onClick={handleBack} className="rounded-full bg-white shadow-lg drop-shadow-lg w-10 h-10 text-center">
      <BsArrowLeft size={'20px'} color='black' />
    </Button>
  );
};

export default BackIcon;