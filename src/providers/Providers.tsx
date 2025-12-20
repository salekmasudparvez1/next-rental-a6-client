"use client";

import UserProvider from "@/contexts/UseerContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
 

 

  return (
    <UserProvider  >
      {children}
    </UserProvider>
  );
};

export default Providers;
