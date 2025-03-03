"use client";
import React, { useState } from 'react';
import SideBar from '../components/sidebar';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date();
const weekDay = daysOfWeek[today.getDay()];

const now = new Date();
let hours = now.getHours();
const minutes = now.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12 || 12;
const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

export default function Dashboard() {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input.trim() !== '') {
            setMessages([...messages, input]);
            setInput('');
        }
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Top Bar */}
            <div className='grid grid-cols-12 bg-slate-400 p-4'>
                <div className='prose items-center col-span-12'>
                    <h1 className='text-white'>DashBoard</h1>
                    <h5 className='text-white'>{weekDay} | {formattedTime}</h5>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 grid grid-cols-12 overflow-hidden">
                {/* Sidebar */}
                <div className='sm:col-span-2 hidden md:block bg-base-300'>
                    <SideBar />
                </div>

                {/* Chat Area */}
                <div className='sm:col-span-10 col-span-12 flex flex-col mt-8 bg-white w-[1200px] h-[500px] mx-auto border rounded-lg shadow-md'>
                    {/* Chat Messages (Scrollable) */}
                    <div className="flex-1 overflow-y-auto p-4 h-[400px]">
                        {messages.length === 0 ? (
                            <p className="text-gray-500 text-center">No messages yet</p>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className="mb-2 p-2 bg-gray-200 rounded-md">
                                    {msg}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Input Box (Fixed at Bottom) */}
                    <div className="p-2 bg-gray-100 flex">
                        <input
                            type='text'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className='flex-1 p-2 border rounded-md'
                            placeholder='Type a message...'
                        />
                        <button 
                            onClick={sendMessage}
                            className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
