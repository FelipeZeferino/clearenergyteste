import { Phone, User, Zap } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-green-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-green-500 p-2">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Clean Energy</h1>
              <p className="text-sm text-gray-600">
                Energia renovável para o futuro
              </p>
            </div>
          </div>
          <div className="hidden items-center space-x-6 text-sm text-gray-600 md:flex">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4 text-green-500" />
              <span>(11) 9999-9999</span>
            </div>
            <Link
              href="/admin"
              className="flex items-center space-x-2 rounded-md bg-green-500 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-green-600"
            >
              <User className="h-5 w-5 text-white" />
              <span>Painel administrativo</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
