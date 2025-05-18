'use client';

import { useState } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="md:hidden p-2" 
        aria-label="Toggle menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="space-y-2">
          <span className="block w-8 h-0.5 bg-white"></span>
          <span className="block w-8 h-0.5 bg-white"></span>
          <span className="block w-8 h-0.5 bg-white"></span>
        </div>
      </button>

      <div className={`${isOpen ? '' : 'hidden'} md:hidden mt-4 pb-4`}>
        <nav className="flex flex-col space-y-4">
          <a href="https://www.svtplay.se/kanaler" className="hover:text-gray-300">SVT PLAY</a>
          <a href="https://embed.ted.com" className="hover:text-gray-300">TED</a>
          <a href="https://www.arte.tv" className="hover:text-gray-300">ARTE</a>
          <a href="https://dyoidart.work" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            Dyoid
          </a>
          <a href="https://dyoidart.work/dev" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            Dev
          </a>
        </nav>
      </div>
    </>
  );
}