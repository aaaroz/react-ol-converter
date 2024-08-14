import { useState } from "react";
import { FloatingButton } from "./components/FloatingButton";
import OpenLayersMap from "./components/OpenLayersMap";
import Modal from "./components/Modal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <OpenLayersMap />
      <FloatingButton onClick={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
