"use client"

import { useState, useEffect } from "react"

type PageType = {
  title: string
  slug: string
}

export default function Header({ pages }: { pages: PageType[] }) {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Make header visible when scrolling up, hidden when scrolling down
      if (currentScrollY > lastScrollY) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="bg-black border-b-4 border-white text-white py-1">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-6">
            <h1 className="text-3xl font-bold">~</h1>
            <h1 className="text-3xl font-bold">Tilde</h1>
            <nav className="flex flex-row gap-4">
              <a
                href="https://www.svtplay.se/kanaler" target="_blank"
                className="hover:text-gray-300 transition-colors duration-200 transform hover:scale-150 transition-transform duration-300"
              >
                SVT PLAY
              </a>
              <a
                href="https://embed.ted.com" target="_blank"
                className="hover:text-gray-300 transition-colors duration-200 transform hover:scale-150 transition-transform duration-300"
              >
                TED
              </a>
              <a
                href="https://www.arte.tv" target="_blank"
                className="hover:text-gray-300 transition-colors duration-200 transform hover:scale-150 transition-transform duration-300"
              >
                ARTE
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div className="bg-transparent text-white py-1 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-8 gap-8 text-center">
            {pages &&
              pages.map((page: PageType) => (
                <a
                  href={`#${page.slug}`}
                  key={page.slug}
                  className="text-sm tracking-wider uppercase hover:text-white transform hover:scale-150 transition-transform duration-300"
                >
                  {page.title}
                </a>
              ))}
          </div>
        </div>
      </div>
    </header>
  )
}
