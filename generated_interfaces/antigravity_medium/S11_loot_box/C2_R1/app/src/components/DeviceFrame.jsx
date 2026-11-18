import React from 'react';

export const DeviceFrame = ({ children }) => {
  return (
    <div className="device-simulation-wrapper">
      <div className="device-chassis">
        {/* Mobile Camera and Speaker cutouts for landscape orientation */}
        <div className="device-camera-notch" title="Simulated Front Camera"></div>
        <div className="device-speaker-notch" title="Simulated Stereo Speaker"></div>

        {/* 16:9 Fixed Game Screen */}
        <div className="device-screen">
          {children}
        </div>
      </div>
    </div>
  );
};
