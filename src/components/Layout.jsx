// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="font-sans text-gray-800 antialiased overflow-x-hidden">
      <Navbar />
      
      {/* <Outlet /> acts as a placeholder for the child routes defined in App.jsx */}
      <main className="min-h-screen"> 
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
};

export default Layout;