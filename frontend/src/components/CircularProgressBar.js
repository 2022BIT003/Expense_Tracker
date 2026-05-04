import React, { useEffect, useState } from 'react';

const CircularProgressBar = ({ percentage, color }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress = ((100 - percentage) / 100) * circumference;

    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
    }, []);

    return (
        <div className="inline-block relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                    r={radius}
                    cx="50"
                    cy="50"
                    strokeDasharray={circumference}
                    stroke="rgba(255, 255, 255, 0.05)"
                    fill="transparent"
                    strokeWidth="7"
                    strokeLinecap="round"
                    style={{
                        transformOrigin: '50% 50%',
                        transform: 'rotate(-90deg)',
                    }}
                />
                <circle
                    r={radius}
                    cx="50"
                    cy="50"
                    strokeDasharray={circumference}
                    strokeDashoffset={progress}
                    stroke={color}
                    fill="transparent"
                    strokeWidth="7"
                    strokeLinecap="round"
                    style={{
                        transformOrigin: '50% 50%',
                        transform: 'rotate(-90deg)',
                        transition: 'stroke-dashoffset 2s linear',
                        animation: isAnimating ? `progressAnimation 3s linear forwards` : 'none',
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-slate-100">
                {percentage}%
            </div>

            <style>{`
                @keyframes progressAnimation {
                    from {
                        stroke-dashoffset: var(--circumference);
                    }
                    to {
                        stroke-dashoffset: var(--progress);
                    }
                }
            `}</style>
        </div>
    );
};

export default CircularProgressBar;
