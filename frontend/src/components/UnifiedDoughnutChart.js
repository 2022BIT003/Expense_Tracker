import React from 'react';

const UnifiedDoughnutChart = ({ incomePercent, expensePercent }) => {
    const radius = 42;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;

    const safeIncome = incomePercent || 0;
    const safeExpense = expensePercent || 0;

    const incomeDash = (safeIncome / 100) * circumference;
    const expenseDash = (safeExpense / 100) * circumference;

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', padding: '10px 0' }}>
            <div style={{ position: 'relative', width: '130px', height: '130px' }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' }}>
                    {/* Background track */}
                    <circle
                        cx="50" cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="rgba(255, 255, 255, 0.03)"
                        strokeWidth={strokeWidth}
                    />
                    {/* Income arc (Vibrant Green) */}
                    <circle
                        cx="50" cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="#22c55e"
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${incomeDash} ${circumference}`}
                        strokeLinecap="round"
                        style={{
                            transition: 'stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            filter: 'drop-shadow(0 0 3px rgba(34, 197, 94, 0.4))'
                        }}
                    />
                    {/* Expense arc (Vibrant Red) */}
                    <circle
                        cx="50" cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="#ef4444"
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${expenseDash} ${circumference}`}
                        strokeDashoffset={-incomeDash}
                        strokeLinecap="round"
                        style={{
                            transition: 'stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            filter: 'drop-shadow(0 0 3px rgba(239, 68, 68, 0.4))'
                        }}
                    />
                </svg>
                {/* Center label */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: '#f1f5f9', letterSpacing: '1px', opacity: 0.8 }}>SPLIT</span>
                </div>
            </div>
        </div>
    );
};

export default UnifiedDoughnutChart;
