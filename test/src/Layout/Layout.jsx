import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import "./Layout.css"

function Layout() {
    return (
      <div className="bg-[#f9fafb] min-h-screen flex flex-col ">
      <Navbar />
      <main className="flex-1 flex">
        <Outlet />
      </main>
    </div>
      );
}

export default Layout