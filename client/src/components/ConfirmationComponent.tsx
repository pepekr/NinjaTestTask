import React, { useState, useEffect } from "react";

function ConfirmationComponent({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: (...args: any[]) => Promise<void>;
  onCancel: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoading = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div
      className={`p-4 rounded-xl shadow-md transition ${
        isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <p className="mb-4">{message}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={handleLoading}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-blue-500 text-black disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Confirm"}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-gray-300 text-black disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationComponent;
