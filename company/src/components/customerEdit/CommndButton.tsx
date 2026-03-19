import React, { useState } from "react";
import {
  FiPower,
  FiRefreshCw,
  FiWifi,
  FiSmartphone,
  FiLock,
  FiSettings
} from "react-icons/fi";

const CommandButtons: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [simOn, setSimOn] = useState(true);
  const [dataOn, setDataOn] = useState(true);

  const runCommand = (cmd: string) => {
    setLoading(cmd);
    setTimeout(() => setLoading(null), 1500);
  };

  const Button = ({ icon: Icon, label, onClick, color }: any) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white ${color} active:scale-95 transition`}
    >
      <Icon />
      {loading === label ? "Processing..." : label}
    </button>
  );

  const Toggle = ({ label, state, setState }: any) => (
    <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
      <span>{label}</span>
      <button
        onClick={() => setState(!state)}
        className={`w-12 h-6 rounded-full ${
          state ? "bg-green-500" : "bg-gray-400"
        } relative transition`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
            state ? "right-0.5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg space-y-5">

      {/* Power Controls */}
      <section>
        <h3 className="text-sm font-semibold mb-2">⚡ Power</h3>
        <div className="space-y-2">
          <Button
            icon={FiPower}
            label="Power Off"
            color="bg-red-600 hover:bg-red-700"
            onClick={() => runCommand("power")}
          />
          <Button
            icon={FiRefreshCw}
            label="Restart Device"
            color="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => runCommand("restart")}
          />
        </div>
      </section>

      {/* Network Controls */}
      <section>
        <h3 className="text-sm font-semibold mb-2">📡 Network</h3>
        <div className="space-y-3">
          <Toggle label="SIM Card" state={simOn} setState={setSimOn} />
          <Toggle label="Mobile Data" state={dataOn} setState={setDataOn} />
        </div>
      </section>

      {/* Security */}
      <section>
        <h3 className="text-sm font-semibold mb-2">🔒 Security</h3>
        <Button
          icon={FiLock}
          label="Lock Device"
          color="bg-yellow-600 hover:bg-yellow-700"
          onClick={() => runCommand("lock")}
        />
      </section>

      {/* Utilities */}
      <section>
        <h3 className="text-sm font-semibold mb-2">🛠 Utilities</h3>
        <Button
          icon={FiSettings}
          label="Factory Reset"
          color="bg-gray-700 hover:bg-gray-800"
          onClick={() => runCommand("reset")}
        />
      </section>
    </div>
  );
};

export default CommandButtons;