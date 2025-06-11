"use client"
import axiosInstance from "@/features/axios/axiosInstance";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
  try {
    await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
    router.push('/admin');
    toast.success('Logout feito com sucesso!');
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  }
}
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white border-b border-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <div className="rounded-lg bg-green-500 p-2">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            </div>
          </div>
          <div>
          <button
          onClick={() => handleLogout()}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">{children}</main>

      <footer className="bg-white border-t border-green-200 text-center py-4 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Clean Energy. Todos os direitos reservados.
      </footer>
    </div>
  );
}
