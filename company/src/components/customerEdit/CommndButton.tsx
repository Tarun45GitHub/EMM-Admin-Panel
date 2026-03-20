import React, { useState } from "react";
import {
  FiPower, FiRefreshCw, FiWifi, FiBluetooth, FiSmartphone,
  FiLock, FiUnlock, FiVolume2, FiVolumeX, FiSun, FiMoon,
  FiMapPin, FiCamera, FiSettings, FiShield, FiAlertTriangle,
   FiZap, FiAirplay,  FiActivity, FiCpu
} from "react-icons/fi";

const CommandButtons: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const runCommand = (cmd: string) => {
    setLoading(cmd);
    setTimeout(() => setLoading(null), 1000);
  };

  const Button = ({ icon: Icon, label, color }: any) => (
    <button
      onClick={() => runCommand(label)}
      className={`
        flex flex-col items-center justify-center
        gap-1 w-full min-h-[56px]
        rounded-xl text-white text-xs font-medium
        ${color}
        active:scale-95 transition
      `}
    >
      <Icon className="text-lg" />
      {loading === label ? "..." : label}
    </button>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-full flex flex-col">

      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold dark:text-gray-200">Device Control</h2>
        <p className="text-xs text-gray-500">Quick device commands</p>
      </div>

      {/* Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* POWER */}
        <Section title="⚡ Power">
          <Button icon={FiPower} label="Power Off" color="bg-red-600" />
          <Button icon={FiRefreshCw} label="Restart" color="bg-indigo-600" />
          <Button icon={FiZap} label="Safe Mode" color="bg-yellow-600" />
          <Button icon={FiCpu} label="Force Off" color="bg-red-700" />
        </Section>

        {/* NETWORK */}
        <Section title="📡 Network">
          <Button icon={FiWifi} label="WiFi" color="bg-blue-600" />
          <Button icon={FiSmartphone} label="Data" color="bg-indigo-600" />
          <Button icon={FiBluetooth} label="Bluetooth" color="bg-purple-600" />
          <Button icon={FiAirplay} label="Hotspot" color="bg-pink-600" />
          <Button icon={FiMapPin} label="GPS" color="bg-teal-600" />
          <Button icon={FiActivity} label="Airplane" color="bg-gray-600" />
        </Section>

        {/* SECURITY */}
        <Section title="🔒 Security">
          <Button icon={FiLock} label="Lock" color="bg-yellow-600" />
          <Button icon={FiUnlock} label="Unlock" color="bg-green-600" />
          <Button icon={FiShield} label="Secure" color="bg-indigo-600" />
          <Button icon={FiAlertTriangle} label="Emergency" color="bg-red-600" />
        </Section>

        {/* DEVICE */}
        <Section title="📱 Device">
          <Button icon={FiVolume2} label="Volume +" color="bg-green-600" />
          <Button icon={FiVolumeX} label="Mute" color="bg-gray-600" />
          <Button icon={FiSun} label="Bright +" color="bg-yellow-500" />
          <Button icon={FiMoon} label="Dark" color="bg-gray-500" />
          <Button icon={FiCamera} label="Camera" color="bg-purple-600" />
          <Button icon={FiSettings} label="Settings" color="bg-gray-600" />
        </Section>
      </div>

      {/* Sticky Bottom Actions (IMPORTANT UX) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => runCommand("restart")}
            className="py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Restart
          </button>
          <button
            onClick={() => runCommand("power")}
            className="py-3 rounded-xl bg-red-600 text-white font-semibold"
          >
            Power Off
          </button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: any) => (
  <div>
    <h3 className="text-xs font-semibold mb-3 text-gray-500">{title}</h3>
    <div className="grid grid-cols-2 gap-3 min-w-40">
      {children}
    </div>
  </div>
);

export default CommandButtons;