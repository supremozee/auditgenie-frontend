"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const WelcomePage = () => {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('fullName');
    if (storedName) {
      setFullName(storedName);
    }
  }, []);

  return (
    <div className="flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-3 md:gap-4">
          <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-black">Welcome, {fullName}</h3>
          <Image
            src={'/logo.jpg'}
            alt='Auditgenie Logo'
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
      </div>
  );
};

export default WelcomePage;