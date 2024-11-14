"use client"
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
// import { toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import { z } from 'zod';
import BackIcon from '@/app/components/BackButton';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const  resetToken = usePathname().split('/').pop()
  console.log(resetToken)

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
      const response = await fetch(`https://aiaudit.onrender.com/api/user/resetPassword/${resetToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.status === 201) {
        // toast.success(data.data);
        alert(data.data)
        router.push('/login');
      } else {
        setError(data.data);
        alert(data.data)
        // toast.error(data.data);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        alert(err.message)
        // toast.error(err.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0074d9] bg-opacity-40 p-4 md:p-10">
      <div className="bg-white bg-opacity-90 flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto p-6 rounded-md shadow-md">
      <BackIcon />
        <div className="flex flex-col justify-center items-center gap-3 md:gap-4">
          <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-black">Reset Password</h3>
          <Image
            src={'/logo.jpg'}
            alt='Auditgenie Logo'
            width={100}
            height={100}
            className="rounded-full"
          />
          <form className="flex flex-col gap-2 w-full items-center" onSubmit={handleSubmit}>
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your new password"
              className="w-full p-2 rounded border border-black border-opacity-30"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your new password"
              className="w-full p-2 rounded border border-black border-opacity-30"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {error && <div className="text-red-500">{error}</div>}
            <Button
              className="mt-3 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;