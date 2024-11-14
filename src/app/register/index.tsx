"use client"
import React, { useState } from 'react';
import BackIcon from '../components/BackButton';
import Input from '../components/Input';
import Button from '../components/Button';
import Link from 'next/link';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const schema = z.object({
      fullName: z.string().min(1, "Full Name is required"),
      email: z.string().email("Invalid email address"),
      password: z.string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
      confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters")
    }).refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"]
    });

    const result = schema.safeParse(formData);

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    try {
      const response = await fetch('https://aiaudit.onrender.com/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.status === 201 && data.success) {
        toast.success('Account created successfully!');
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        setError(data.data);
        toast.error(data.data);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError('An unknown error occurred');
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0074d9] bg-opacity-40 p-4 md:p-10">
      <div className="bg-white bg-opacity-90 flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto p-3 rounded-md shadow-md">
        <BackIcon />
        <div className="flex flex-col justify-center items-center gap-3 md:gap-3">
          <h3 className="text-xl text-center md:text-2xl lg:text-2xl font-bold text-black">Create an account with <br/> Auditgenie</h3>
          <form className="flex flex-col gap-2 w-full items-center" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              className="w-full p-2 rounded border border-black border-opacity-30"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
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
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              className="w-full p-2 border border-black border-opacity-30 rounded"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {error && <div className="text-red-500">{error}</div>}
            <Button
              className="mt-3 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Sign Up
            </Button>
          </form>
          <div className="text-center text-sm md:text-base lg:text-lg mt-2">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;