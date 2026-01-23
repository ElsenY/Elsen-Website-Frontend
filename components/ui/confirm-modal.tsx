import { FC } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  message = "Do you want to be redirected?",
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
      <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg">
        <p className="mb-4 text-gray-800 text-lg">{message}</p>
        <div className="flex justify-around">
          <button
            onClick={(e) => {onCancel(); e.stopPropagation();}}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
