import React from 'react';
import {
    HomeIcon,
    CurrencyDollarIcon,
    UserIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ activeSection, onSectionChange, onLogout }) => {
    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: HomeIcon,
        },
        {
            id: 'transactions',
            label: 'Transactions',
            icon: CurrencyDollarIcon,
        },
        {
            id: 'profile',
            label: 'Profile',
            icon: UserIcon,
        },
    ];

    return (
        <div className="bg-white border-r border-slate-200 w-64 flex flex-col">
            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-6">
                <div className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onSectionChange(item.id)}
                                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                    activeSection === item.id
                                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-slate-200">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;