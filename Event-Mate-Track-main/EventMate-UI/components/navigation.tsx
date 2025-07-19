"use client"
import Link from "next/link"

export function Navigation() {



  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EM</span>
            </div>
            <span className="text-white font-bold text-xl">EventMate</span>
          </Link>
        </div>

      </div>
    </nav>
  )
}
