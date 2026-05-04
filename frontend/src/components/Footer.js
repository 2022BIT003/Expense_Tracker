import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-white text-lg font-semibold mb-4">Expense Tracker</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Take control of your finances with our comprehensive expense tracking solution.
                            Monitor income, track expenses, and gain insights into your spending habits.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <span className="text-slate-400 text-sm">
                                    Dashboard
                                </span>
                            </li>
                            <li>
                                <span className="text-slate-400 text-sm">
                                    Transactions
                                </span>
                            </li>
                            <li>
                                <span className="text-slate-400 text-sm">
                                    Profile
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#help" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#privacy" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#terms" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-slate-800 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-slate-400 text-sm">
                            © 2026 Expense Tracker. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#facebook" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                                Facebook
                            </a>
                            <a href="#twitter" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                                Twitter
                            </a>
                            <a href="#linkedin" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;