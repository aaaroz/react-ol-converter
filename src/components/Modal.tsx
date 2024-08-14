import React from "react";
import Tabs from "./Tabs";
import { FormDMStoDD } from "./FormDMStoDD";
import { FormDDtoDMS } from "./FormDDtoDMS";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tabData = [
  {
    label: "DMS To DD",
    content: <FormDMStoDD />,
  },
  {
    label: "DD to DMS",
    content: <FormDDtoDMS />,
  },
];

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-[50dvw] mx-48">
        <Tabs tabs={tabData} />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
