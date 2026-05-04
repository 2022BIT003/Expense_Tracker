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
                        <Link to="/" className="text-2xl font-bold text-slate-900">
                            Expense<span className="text-primary-600">Tracker</span>
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