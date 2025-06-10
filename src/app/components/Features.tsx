import { Leaf, TrendingDown, Zap } from 'lucide-react'
import React from 'react'

export default function Features() {
  return (
        <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher a Clean Energy?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Economia Garantida</h4>
              <p className="text-gray-600">Até 25% de desconto na sua conta de energia elétrica</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">100% Renovável</h4>
              <p className="text-gray-600">Energia limpa e sustentável para o meio ambiente</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Líder do Mercado</h4>
              <p className="text-gray-600">Experiência e confiabilidade no mercado livre de energia</p>
            </div>
          </div>
        </div>
      </section>
  )
}
