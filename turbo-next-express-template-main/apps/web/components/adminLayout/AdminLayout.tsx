import React, { PropsWithChildren } from "react";


export const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      
      {children}
    </div>
  );
};
