"use client";

import { FailModal } from "@/features/subscriptions/components/FailModal";
import { SubscriptionModal } from "@/features/subscriptions/components/SubscriptionModal";
import { SuccessModal } from "@/features/subscriptions/components/SuccessModal";
import { useState, useEffect } from "react";
import HintModal from "./HintModal";

export const Modals: React.FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const hasShownModal = localStorage.getItem("hasShownHintModal");

    if (!hasShownModal) {
      setShow(true);
      localStorage.setItem("hasShownHintModal", "true");
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <FailModal />
      <SuccessModal />
      <SubscriptionModal />
      <button
        onClick={() => {
          setShow(true);
        }}
        className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg"
      >
        Open Hint Modal
      </button>
      {show && <HintModal setShow={setShow} />}
    </>
  );
};
