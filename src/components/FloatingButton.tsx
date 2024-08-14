import React, { MouseEventHandler } from "react";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const FloatingButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-5 right-5 px-4 py-2 rounded text-white bg-slate-600 hover:bg-slate-700"
    >
      Open Convert Menu
    </button>
  );
};
