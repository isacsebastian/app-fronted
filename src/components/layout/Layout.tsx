import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
