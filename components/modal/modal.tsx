import React, { useRef } from "react";
import { IconXBig } from "../../public/icons";

interface IModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  id?: string;
}

export const Modal: React.FC<IModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  const overlayRef = useRef(null);

  const handleOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return isOpen ? (
    // Modal
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen z-40">
      {/* Modal overlay */}
      <div
        className="absolute top-0 left-0 w-screen h-screen bg-gray-800/80 cursor-pointer"
        ref={overlayRef}
        onClick={handleOverlay}
      />
      {/* Modal box */}
      <div className="relative max-w-fit p-4 md:p-8 lg:p-12 box-border rounded-lg bg-white cursor-auto">
        {/* Modal close button */}
        <button className="absolute top-3 right-4" onClick={onClose}>
          <IconXBig />
        </button>
        {/* Modal title */}
        <div className="text-xl font-bold">{title}</div>
        {/* Modal content */}
        <div className="mt-3">{children}</div>
      </div>
    </div>
  ) : null;
};
