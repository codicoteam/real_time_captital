import { useState } from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Settings,
  Users,
  FileText,
} from "lucide-react";

// Define the workflow type
type WorkflowType = {
  id: number;
  name: string;
  steps: string[];
  approvers: string[];
  status: string;
};

const WorkflowManagement = () => {
  const [workflows, setWorkflows] = useState<WorkflowType[]>([
    {
      id: 1,
      name: "Personal Loan Approval",
      steps: ["Document Review", "Credit Check", "Manager Approval"],
      approvers: ["Credit Officer", "Branch Manager"],
      status: "Active",
    },
    {
      id: 2,
      name: "Home Loan Processing",
      steps: [
        "Property Valuation",
        "Income Verification",
        "Legal Check",
        "Final Approval",
      ],
      approvers: ["Loan Officer", "Senior Manager", "Legal Team"],
      status: "Active",
    },
    {
      id: 3,
      name: "Business Loan Review",
      steps: [
        "Business Plan Review",
        "Financial Analysis",
        "Risk Assessment",
        "Board Approval",
      ],
      approvers: ["Business Analyst", "Risk Manager", "Board"],
      status: "Draft",
    },
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowType | null>(
    null
  );

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  const getStepIcon = (index: number, total: number) => {
    if (index === 0) return CheckCircle;
    if (index === total - 1) return AlertCircle;
    return Clock;
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-orange-800">
          Workflow Management
        </h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200">
          <Settings className="w-4 h-4" />
          <span>New Workflow</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Workflow List */}
        <div className="space-y-4">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedWorkflow?.id === workflow.id
                  ? "border-orange-500 bg-orange-50"
                  : "border-orange-200/50 bg-white/50 hover:border-orange-300"
              }`}
              onClick={() => setSelectedWorkflow(workflow)}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-orange-800">
                  {workflow.name}
                </h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    workflow.status
                  )}`}
                >
                  {workflow.status}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-orange-600">
                <div className="flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>{workflow.steps.length} steps</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{workflow.approvers.length} approvers</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Details */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
          {selectedWorkflow ? (
            <div>
              <h4 className="text-lg font-bold text-orange-800 mb-4">
                {selectedWorkflow.name}
              </h4>

              {/* Workflow Steps */}
              <div className="mb-6">
                <h5 className="font-medium text-orange-700 mb-3">
                  Approval Steps
                </h5>
                <div className="space-y-3">
                  {selectedWorkflow.steps.map((step, index) => {
                    const StepIcon = getStepIcon(
                      index,
                      selectedWorkflow.steps.length
                    );
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-orange-200 rounded-full">
                          <span className="text-sm font-medium text-orange-700">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 flex items-center space-x-2">
                          <StepIcon className="w-4 h-4 text-orange-600" />
                          <span className="text-sm text-orange-700">
                            {step}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Approvers */}
              <div className="mb-6">
                <h5 className="font-medium text-orange-700 mb-3">Approvers</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedWorkflow.approvers.map((approver, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-200 text-orange-700 rounded-full text-sm font-medium"
                    >
                      {approver}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                  Edit Workflow
                </button>
                <button className="px-4 py-2 bg-white border border-orange-300 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors">
                  Duplicate
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Settings className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <p className="text-orange-600">
                Select a workflow to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowManagement;
