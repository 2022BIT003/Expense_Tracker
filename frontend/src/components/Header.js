import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const Header = ({ currentUser }) => {
    const navigate = useNavigate();

    const handleShowLogin = () => {
        navigate("/login");
    };

    return (
        <header className="bg-white border-b border-slate-200 shadow-sm">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-20">
                    {/* Logo */}
                    <div className="w-64 flex items-center justify-start">
                        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                            {/* Logo SVG */}
                            <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Wallet/Money icon */}
                                <rect x="4" y="8" width="32" height="24" rx="2" fill="#0F172A" stroke="#0F172A" strokeWidth="1.5"/>
                                <circle cx="28" cy="20" r="5" fill="none" stroke="#10B981" strokeWidth="2"/>
                                <line x1="28" y1="17" x2="28" y2="23" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round"/>
                                <line x1="25" y1="20" x2="31" y2="20" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M8 14H20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M8 20H18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <span className="text-xl font-bold text-slate-900">ExpenseTracker</span>
                        </Link>
                    </div>

                    {/* User Section */}
                    <div className="flex-1 flex justify-end">
                        <SignedIn>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm font-medium text-slate-700">
                                        Hi, {currentUser?.name || "User"}
                                    </span>

                                    {currentUser?.avatarImage && (
                                        <img
                                            src={currentUser.avatarImage}
                                            alt="avatar"
                                            className="h-10 w-10 rounded-full border-2 border-primary-200 object-cover"
                                        />
                                    )}
                                </div>
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <button
                                onClick={handleShowLogin}
                                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                            >
                                Login
                            </button>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;