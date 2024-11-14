"use client";
import React, { useEffect, useState } from 'react';
import { BsArrowUpCircle } from 'react-icons/bs';
import { FaPaperclip } from 'react-icons/fa';

const MainContent = () => {
  const [welcomeText, setWelcomeText] = useState('Azeez, ');
  const fullText = 'Welcome to Audit Genie';
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ text: 'Welcome to Audit Genie!', isUser: false }]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setWelcomeText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handlePrompt = () => {
    if (input.trim() === '') return;

    // Add user message
    setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'This is a simulated response from Audit Genie.', isUser: false },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full justify-between p-4 w-full">
      {messages.length === 1 && (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl w-[50%] font-bold text-black mb-4">{welcomeText}</h1>
        </div>
      )}
      <div className="flex-1 overflow-y-auto mb-4 w-full">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-lg w-full break-words ${message.isUser ? 'bg-blue-100 self-end text-right w-full' : 'bg-gray-100 self-start text-left w-full'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="w-full relative mt-auto border-t border-gray-300 pt-4 flex items-center">
        <FaPaperclip
          className="absolute left-4 bottom-4 text-gray-600 cursor-pointer hover:text-gray-800"
          size={20}
          title="Attach File"
        />
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Audit Genie..."
          className="w-full rounded-full border border-gray-300 outline-none pl-10 resize-none text-black"
        />
        <BsArrowUpCircle
          onClick={handlePrompt}
          className="absolute right-4 bottom-4 text-blue-600 cursor-pointer hover:text-blue-700"
          size={24}
          title="Send"
        />
      </div>
    </div>
  );
};

export default MainContent;