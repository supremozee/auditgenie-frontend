"use client"
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import WelcomePage from '../components/WelcomePage';
import BackIcon from '../components/BackButton';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://aiaudit.onrender.com/api/user/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.status === 200) {
        alert(data.data)
      } else {
        setError(data.data);
        alert(data.data)
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        alert(err.message)
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0074d9] bg-opacity-40 p-4 md:p-10">
      <div className="bg-white bg-opacity-90 flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto p-6 rounded-md shadow-md">
      <BackIcon />

        <div className="flex flex-col justify-center items-center gap-3 md:gap-4">
          <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-black">Forgot Password</h3>
         <WelcomePage/>
          <form className="flex flex-col gap-2 w-full items-center" onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
              className="w-full p-2 rounded border border-black border-opacity-30"
              value={email}
              onChange={handleChange}
              required
            />
            {error && <div className="text-red-500">{error}</div>}
            <Button
              className="mt-3 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Send Reset Link
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;