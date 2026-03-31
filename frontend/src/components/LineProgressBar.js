import React from 'react';

const LineProgressBar = ({ label, percentage, lineColor }) => {
    // Helper to generate a nice gradient from the base color
    const gradient = `linear-gradient(90deg, ${lineColor}cc, ${lineColor})`;

    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-end mb-2">
                <span style={{
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: 'rgba(255, 255, 255, 0.8)',
                    letterSpacing: '0.3px'
                }}>
                    {label}
                </span>
                <span style={{
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    color: lineColor
                }}>
                    {percentage}%
                </span>
            </div>
            <div
                className="progress"
                style={{
                    height: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '20px',
                    overflow: 'visible', // Allow glow if needed
                    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)'
                }}
            >
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                        width: `${percentage}%`,
                        background: gradient,
                        transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        borderRadius: '20px',
                        boxShadow: `0 0 10px ${lineColor}44`,
                        border: 'none'
                    }}
                    aria-valuenow={percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </div>
        </div>
    );
};

export default LineProgressBar;
