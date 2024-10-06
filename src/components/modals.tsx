"use client";

import { FailModal } from "@/features/subscriptions/components/FailModal";
import { SubscriptionModal } from "@/features/subscriptions/components/SubscriptionModal";
import { SuccessModal } from "@/features/subscriptions/components/SuccessModal";
import { useState, useEffect } from "react";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

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
    </>
  );
};
