import React from "react";
import { Clock } from "lucide-react";

// Type definitions
interface HistoryApplication {
  id: string;
  productType: "vehicle" | "solar" | "finishing_touch";
  type: string;
  amount: number;
  status: "approved" | "completed" | "rejected" | "pending" | "under_review";
  appliedDate: string;
  approvedDate?: string;
  disbursedDate?: string;
  rejectedDate?: string;
}

interface ApplicationHistoryProps {
  history?: HistoryApplication[];
}

const ApplicationHistory: React.FC<ApplicationHistoryProps> = ({ history }) => {
  // Default history data
  const defaultHistory: HistoryApplication[] = [
    {
      id: "APP001",
      productType: "vehicle",
      type: "Vehicle Loan",
      amount: 25000,
      status: "approved",
      appliedDate: "2024-01-15",
      approvedDate: "2024-02-01",
      disbursedDate: "2024-02-15",
    },
    {
      id: "APP004",
      productType: "solar",
      type: "Solar Loan",
      amount: 12000,
      status: "completed",
      appliedDate: "2023-11-10",
      approvedDate: "2023-11-25",
      disbursedDate: "2023-12-01",
    },
    {
      id: "APP005",
      productType: "finishing_touch",
      type: "Finishing Touch Loan",
      amount: 6000,
      status: "rejected",
      appliedDate: "2023-09-05",
      rejectedDate: "2023-09-20",
    },
  ];

  const historyData = history || defaultHistory;

  const getStatusStyles = (status: HistoryApplication["status"]): string => {
    switch (status) {
      case "approved":
      case "completed":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "under_review":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatStatus = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ");
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center">
          <Clock className="w-6 h-6 mr-2 text-blue-600" />
          Application History
        </h3>
        <p className="text-sm text-blue-500">
          Your complete loan application timeline
        </p>
      </div>

      <div className="space-y-6">
        {historyData.map((item, index) => (
          <div key={item.id} className="relative">
            {index !== historyData.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-16 bg-blue-200"></div>
            )}

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">
                  {index + 1}
                </span>
              </div>

              <div className="flex-1 p-4 bg-white/50 rounded-xl border border-blue-200/50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-blue-800">{item.type}</h4>
                    <p className="text-blue-600">
                      ₹{item.amount.toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                      item.status
                    )}`}
                  >
                    {formatStatus(item.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-blue-500">Applied:</span>
                    <p className="font-medium text-blue-800">
                      {new Date(item.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                  {item.approvedDate && (
                    <div>
                      <span className="text-green-500">Approved:</span>
                      <p className="font-medium text-green-700">
                        {new Date(item.approvedDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {item.disbursedDate && (
                    <div>
                      <span className="text-purple-500">Disbursed:</span>
                      <p className="font-medium text-purple-700">
                        {new Date(item.disbursedDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {item.rejectedDate && (
                    <div>
                      <span className="text-red-500">Rejected:</span>
                      <p className="font-medium text-red-700">
                        {new Date(item.rejectedDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-blue-100">
                  <span className="text-xs text-blue-500">
                    Application ID: {item.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationHistory;
