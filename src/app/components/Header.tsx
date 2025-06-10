import { Mail, Phone, Zap } from 'lucide-react'
import React from 'react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Clean Energy</h1>
                <p className="text-sm text-gray-600">Energia renovável para o futuro</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4 text-green-500" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4 text-green-500" />
                <span>contato@cleanenergy.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>
  )
}
