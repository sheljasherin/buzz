// apps/web/components/appLayout/AppLayout.tsx
import React, { PropsWithChildren } from "react";
import { TooltipProvider } from "@repo/frontend/components/ui/tooltip";
import { Header } from "../adminLayout/partials/Header";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </TooltipProvider>
  );
};
