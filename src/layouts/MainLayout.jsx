
import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <div className='bg-mesh min-h-screen'>
      <Navbar/>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Outlet/>
      </main>
    </div>
  )
}
