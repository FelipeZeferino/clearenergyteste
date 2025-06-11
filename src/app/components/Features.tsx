import { Leaf, TrendingDown, Zap } from "lucide-react";

export default function Features() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h3 className="mb-4 text-3xl font-bold text-gray-900">
            Por que escolher a Clean Energy?
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <TrendingDown className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="mb-2 text-xl font-semibold text-gray-900">
              Economia Garantida
            </h4>
            <p className="text-gray-600">
              Até 25% de desconto na sua conta de energia elétrica
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="mb-2 text-xl font-semibold text-gray-900">
              100% Renovável
            </h4>
            <p className="text-gray-600">
              Energia limpa e sustentável para o meio ambiente
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="mb-2 text-xl font-semibold text-gray-900">
              Líder do Mercado
            </h4>
            <p className="text-gray-600">
              Experiência e confiabilidade no mercado livre de energia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
