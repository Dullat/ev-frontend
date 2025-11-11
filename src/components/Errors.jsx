import React, { useState } from "react";
import {
  AlertCircle,
  XCircle,
  AlertTriangle,
  WifiOff,
  X,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ServerCrash,
} from "lucide-react";

// Error Alert Component
export const ErrorAlert = ({
  type = "error",
  title,
  message,
  onClose,
  onRetry,
  details,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const types = {
    error: {
      bg: "bg-red-50 border-red-200",
      icon: XCircle,
      iconColor: "text-red-600",
      titleColor: "text-red-800",
      messageColor: "text-red-700",
      buttonBg: "bg-red-600 hover:bg-red-700",
    },
    warning: {
      bg: "bg-yellow-50 border-yellow-200",
      icon: AlertTriangle,
      iconColor: "text-yellow-600",
      titleColor: "text-yellow-800",
      messageColor: "text-yellow-700",
      buttonBg: "bg-yellow-600 hover:bg-yellow-700",
    },
    network: {
      bg: "bg-blue-50 border-blue-200",
      icon: WifiOff,
      iconColor: "text-blue-600",
      titleColor: "text-blue-800",
      messageColor: "text-blue-700",
      buttonBg: "bg-blue-600 hover:bg-blue-700",
    },
  };

  const config = types[type] || types.error;
  const Icon = config.icon;

  return (
    <div
      className={`${config.bg} border-2 rounded-2xl p-5 shadow-lg animate-slide-up`}
    >
      <div className="flex items-start gap-4">
        <div className={`${config.iconColor} flex-shrink-0 mt-0.5`}>
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-bold ${config.titleColor} mb-1`}>
            {title}
          </h3>
          <p className={`text-sm ${config.messageColor} mb-3`}>{message}</p>

          {/* Details Section */}
          {details && (
            <div className="mt-3">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className={`flex items-center gap-2 text-sm font-semibold ${config.titleColor} hover:underline`}
              >
                {showDetails ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                {showDetails ? "Hide" : "Show"} Details
              </button>

              {showDetails && (
                <div className="mt-3 p-3 bg-white/50 rounded-lg">
                  <pre className="text-xs text-slate-700 overflow-x-auto whitespace-pre-wrap">
                    {details}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            {onRetry && (
              <button
                onClick={onRetry}
                className={`${config.buttonBg} text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm`}
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-300 transition-all duration-200 text-sm"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className={`${config.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

// InForm Error
export const FormHeaderError = ({ message, onClose }) => {
  return (
    <div
      className={`flex items-center rounded gap-2 px-4 py-3 border border-red-200 bg-gradient-to-r from-red-50 to-red-100`}
    >
      <ServerCrash className="h-6 w-6 text-red-600 animate-pulse" />

      <p className="text-red-800">
        {": "}
        {message}
      </p>
      <X
        className="h-5 w=5 text-red-500 ml-auto cursor-pointer"
        onClick={() => onClose(null)}
      />
    </div>
  );
};

// Inline Field Error
export const FieldError = ({ message }) => {
  return (
    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-fade-in">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};

// Toast Notification
export const ErrorToast = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-up">
      <div className="bg-red-600 text-white rounded-xl shadow-2xl shadow-red-600/30 p-4 flex items-center gap-3 min-w-[320px] max-w-md">
        <XCircle className="w-5 h-5 flex-shrink-0" />
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="hover:bg-red-700 rounded-lg p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Modal Error
export const ErrorModal = ({
  title = "Something went wrong",
  message,
  onClose,
  onRetry,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>

        <h3 className="text-2xl font-bold text-slate-800 text-center mb-2">
          {title}
        </h3>

        <p className="text-slate-600 text-center mb-6">{message}</p>

        <div className="flex gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="flex-1 bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-300 transition-all duration-200"
            >
              Close
            </button>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Banner Error
export const ErrorBanner = ({ message, onClose }) => {
  return (
    <div className="bg-red-600 text-white px-6 py-4 shadow-lg animate-slide-up">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="hover:bg-red-700 rounded-lg p-1.5 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
