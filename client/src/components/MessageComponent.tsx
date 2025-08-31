import React from "react";
import { useNavigate } from "react-router-dom";

export function MessageComponent({
  message,
  onClose,
  navigateTo,
}: {
  message: string;
  onClose: () => void;
  navigateTo?: string; // optional redirect path
}) {
  const navigate = useNavigate();

  const handleClose = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
        <p className="mb-6 text-lg">{message}</p>
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Okay
        </button>
      </div>
    </div>
  );
}
