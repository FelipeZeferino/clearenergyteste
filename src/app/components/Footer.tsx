import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-center space-x-3">
          <div className="rounded-lg bg-green-500 p-2">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold">Clean Energy</span>
        </div>
        <p className="text-sm text-gray-400">
          © 2025 Clean Energy. Todos os direitos reservados. | Energia
          renovável para um futuro sustentável.
        </p>
      </div>
    </footer>
  );
}
