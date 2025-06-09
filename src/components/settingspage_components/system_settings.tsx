import { useState } from "react";
import { Percent, Calendar, DollarSign, Save } from "lucide-react";

// Define the settings type
type SettingsType = {
  defaultInterestRate: string;
  maxLoanTerm: string;
  minLoanAmount: string;
  maxLoanAmount: string;
  processingFee: string;
  latePenalty: string;
};

const SystemSettings = () => {
  const [settings, setSettings] = useState<SettingsType>({
    defaultInterestRate: "12.5",
    maxLoanTerm: "60",
    minLoanAmount: "1000",
    maxLoanAmount: "500000",
    processingFee: "2.5",
    latePenalty: "5.0",
  });

  const handleChange = (field: keyof SettingsType, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const settingsFields: Array<{
    key: keyof SettingsType;
    label: string;
    icon: typeof Percent;
    suffix?: string;
    prefix?: string;
  }> = [
    {
      key: "defaultInterestRate",
      label: "Default Interest Rate",
      icon: Percent,
      suffix: "%",
    },
    {
      key: "maxLoanTerm",
      label: "Max Loan Term",
      icon: Calendar,
      suffix: "months",
    },
    {
      key: "minLoanAmount",
      label: "Min Loan Amount",
      icon: DollarSign,
      prefix: "₨",
    },
    {
      key: "maxLoanAmount",
      label: "Max Loan Amount",
      icon: DollarSign,
      prefix: "₨",
    },
    {
      key: "processingFee",
      label: "Processing Fee",
      icon: Percent,
      suffix: "%",
    },
    { key: "latePenalty", label: "Late Penalty", icon: Percent, suffix: "%" },
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      <h3 className="text-xl font-bold text-orange-800 mb-6">
        System Settings
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsFields.map((field) => {
          const IconComponent = field.icon;
          return (
            <div key={field.key} className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-orange-600">
                <IconComponent className="w-4 h-4" />
                <span>{field.label}</span>
              </label>
              <div className="relative">
                {field.prefix && (
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500">
                    {field.prefix}
                  </span>
                )}
                <input
                  type="number"
                  value={settings[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className={`w-full ${field.prefix ? "pl-8" : "pl-3"} ${
                    field.suffix ? "pr-12" : "pr-3"
                  } py-3 bg-orange-50 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50`}
                />
                {field.suffix && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500">
                    {field.suffix}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200">
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
