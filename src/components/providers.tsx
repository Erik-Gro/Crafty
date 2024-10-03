"use client";

import { QueryProvider } from "./queryProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <QueryProvider>{children}</QueryProvider>;
};
