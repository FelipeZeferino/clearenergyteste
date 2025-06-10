import { Zap } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
        <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-green-500 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">Clean Energy</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Clean Energy. Todos os direitos reservados. | Energia renovável para um futuro sustentável.
          </p>
        </div>
      </footer>
  )
}
