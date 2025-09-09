import React from 'react';

export default function Header() {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/New_York'
  };
  
  const formattedDate = currentDate.toLocaleString('es-ES', options);

  return (
    <header className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-800"></div>
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-800/20 rounded-full -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-800/20 rounded-full translate-x-48 translate-y-48"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-8 py-12">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Greeting */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            ¡Hola{' '}
            <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent animate-pulse">
              Johnatan
            </span>
            ! 👋
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-6 font-light">
            Dashboard Integral de Marketing Digital
          </p>
          
          {/* Date and Time */}
          <div className="inline-flex items-center px-6 py-3 bg-blue-800/30 backdrop-blur-sm rounded-full border border-blue-600/30">
            <div className="text-blue-200 text-sm font-medium">
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
      
    </header>
  );
}