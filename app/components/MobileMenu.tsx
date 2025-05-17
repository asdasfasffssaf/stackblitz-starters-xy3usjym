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
          <a href="/about" className="hover:text-gray-300">About</a>
          <a href="/projects" className="hover:text-gray-300">Projects</a>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
          <a href="https://github.com/tilde-rocks" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            GitHub
          </a>
          <a href="https://twitter.com/tilde_rocks" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            Twitter
          </a>
        </nav>
      </div>
    </>
  );
}