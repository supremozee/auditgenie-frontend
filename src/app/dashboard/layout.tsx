"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import { FiSidebar, FiUploadCloud, FiMenu, FiClock } from 'react-icons/fi';
import useAuth from '../components/hooks/useAuth';
import MainContent from '.';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userInitial, setUserInitial] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  useAuth();

  useEffect(() => {
    const fullName = localStorage.getItem('fullName');
    if (fullName) {
      setUserInitial(fullName.charAt(0).toUpperCase());
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Left Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-blue-600 shadow-lg drop-shadow-xl bg-opacity-90 p-4 flex flex-col w-64 md:relative md:translate-x-0 z-50`}
      >
        <div className="flex justify-between items-center mb-4">
          <FiSidebar
            className="text-white cursor-pointer"
            size={24}
            onClick={toggleSidebar}
            title="Toggle Sidebar"
          />
          <FiUploadCloud
            className="text-white cursor-pointer"
            size={24}
            title="Upload Document"
          />
        </div>
        <nav className="flex flex-col gap-4">
          <h3 className="text-lg font-bold mt-4 text-white">History</h3>
          <ul className="flex flex-col gap-2">
            <Link href={''} className="rounded text-white">Document1.pdf</Link>
            <Link href={'/'} className="rounded text-white">Document2.pdf</Link>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-2 bg-white shadow-inner rounded-lg overflow-y-auto">
        <div className="md:hidden flex justify-between items-center p-2">
          <FiMenu
            className="text-black cursor-pointer"
            size={24}
            onClick={toggleSidebar}
            title="Open Sidebar"
          />
          {userInitial ? (
            <div className="text-black cursor-pointer bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
              {userInitial}
            </div>
          ) : (
            <FaUserCircle
              className="text-black cursor-pointer"
              size={30}
              onClick={toggleSettings}
              title="Profile"
            />
          )}
        </div>
        <MainContent />
      </div>

      {/* Right Sidebar for Settings */}
      <div className="hidden md:flex w-16 bg-white p-4 flex-col items-center relative">
        <div className="text-black cursor-pointer bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
          {userInitial}
        </div>
        <FaUserCircle
          className="text-black cursor-pointer mt-4"
          size={30}
          onClick={toggleSettings}
          title="Profile"
        />
        {isSettingsOpen && (
          <div className="absolute top-16 right-4 w-64 bg-white shadow-md p-4 rounded-md">
            <h3 className="text-lg font-bold">Settings</h3>
            <nav className="flex flex-col gap-4 mt-4">
              <Link href="/profile" className="text-blue-600 hover:underline">
                Profile
              </Link>
              <Link href="/settings" className="text-blue-600 hover:underline">
                Settings
              </Link>
            </nav>
          </div>
        )}
        <FiClock
          className="text-black cursor-pointer mt-4"
          size={30}
          onClick={toggleHistory}
          title="History"
        />
        {isHistoryOpen && (
          <div className="absolute top-16 right-4 w-64 bg-white shadow-md p-4 rounded-md">
            <h3 className="text-lg font-bold">Upload History</h3>
            <nav className="flex flex-col gap-4 mt-4">
              <Link href="/history" className="text-blue-600 hover:underline">
                View History
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Sidebar Toggle Button for Closed State */}
      {!isSidebarOpen && (
        <FiSidebar
          className="text-black cursor-pointer fixed top-4 left-4 md:hidden"
          size={24}
          onClick={toggleSidebar}
          title="Open Sidebar"
        />
      )}
    </div>
  );
};

export default Layout;