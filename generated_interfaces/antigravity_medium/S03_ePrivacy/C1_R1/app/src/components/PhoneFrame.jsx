import React, { useState, useEffect } from 'react';
import { WifiIcon, SignalIcon, BatteryIcon } from './Icons';

export const PhoneFrame = ({ children, bezelStyle = 'default', theme = 'light' }) => {
  const [timeStr, setTimeStr] = useState('10:14');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTimeStr(`${hours % 12 || 12}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const bezelClass =
    bezelStyle === 'titanium'
      ? 'bezel-titanium'
      : bezelStyle === 'purple'
      ? 'bezel-purple'
      : '';

  return (
    <div className={`phone-device ${bezelClass}`}>
      {/* Side buttons */}
      <div className="phone-power-btn" />

      {/* Screen Area */}
      <div className={`phone-screen ${theme === 'dark' ? 'theme-dark' : ''}`}>
        {/* Android Top Status Bar */}
        <div className="android-status-bar">
          <span className="status-time">{timeStr}</span>
          <div className="camera-punchhole" />
          <div className="status-icons">
            <SignalIcon size={12} className="status-icon-svg" />
            <WifiIcon size={12} className="status-icon-svg" />
            <BatteryIcon size={14} className="status-icon-svg" />
          </div>
        </div>

        {/* Inner App Content */}
        {children}

        {/* Android Bottom Gesture Bar */}
        <div className="android-gesture-bar">
          <div className="gesture-pill" />
        </div>
      </div>
    </div>
  );
};
