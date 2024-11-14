"use client"
import React, { useState, useEffect } from 'react';
import BackIcon from '../components/BackButton';
import Image from 'next/image';
import Input from '../components/Input';
import Button from '../components/Button';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://aiaudit.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.status === 201) {
        Cookies.set('token', data.token);
        alert(data.data)
        localStorage.setItem('fullName', data?.data?.data?.fullName);
        setReLoginTimeout();
        router.push('/dashboard');
      } else {
        setError(data.data);
        alert(data.data)
      }
    } catch (err) {
      if (err instanceof Error) {
            alert(err.message)
        setError(err.message);
      }
    }
  };

  const setReLoginTimeout = () => {
    const tenHours = 10 * 60 * 60 * 1000;
    setTimeout(() => {
      alert("session expired, pls login again")
      Cookies.remove('token');
      window.location.href = '/login';
    }, tenHours);
  };

  useEffect(() => {
    if (Cookies.get('token')) {
      setReLoginTimeout();
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0074d9] bg-opacity-40 p-4 md:p-10">
      <div className="bg-white bg-opacity-90 flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto p-6 rounded-md shadow-md">
        <BackIcon />
        <div className="flex flex-col justify-center items-center gap-3 md:gap-4">
          <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-black">Welcome back</h3>
          <Image
            src={'/logo.jpg'}
            alt='Auditgenie Logo'
            width={100}
            height={100}
            className="rounded-full"
          />
          <form className="flex flex-col gap-2 w-full items-center" onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
              className="w-full p-2 rounded border border-black border-opacity-30"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              className="w-full p-2 border border-black border-opacity-30 rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && <div className="text-red-500">{error}</div>}
            <Button
              className="mt-3 w-[30%] p-2 bg-blue-700 shadow-md drop-shadow-md text-[14px] text-white rounded hover:bg-blue-700"
            >
              Login
            </Button>
          </form>
          <div className="text-center text-sm md:text-base lg:text-lg mt-4">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link href="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-center text-sm md:text-base lg:text-lg mt-2">
            <Link href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;