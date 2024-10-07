"use client";

import { FailModal } from "@/features/subscriptions/components/FailModal";
import { SubscriptionModal } from "@/features/subscriptions/components/SubscriptionModal";
import { SuccessModal } from "@/features/subscriptions/components/SuccessModal";
import { useState, useEffect } from "react";
import HintModal from "./HintModal";

export const Modals: React.FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isParallaxModalOpen, setIsParallaxModalOpen] = useState<boolean>(true); // Start with false

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <FailModal />
      <SuccessModal />
      <SubscriptionModal />

      {/* Button to toggle ParallaxModal */}
      <button
        onClick={() => setIsParallaxModalOpen(true)} // Opens the modal when clicked
        className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg"
      >
        Open Hint Modal
      </button>

      {/* Conditionally render HintModal (or ParallaxModal) */}
      {isParallaxModalOpen && (
        <HintModal onClose={() => setIsParallaxModalOpen(false)} />
      )}
    </>
  );
};
