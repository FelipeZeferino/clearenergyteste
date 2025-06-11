import { Lock } from "lucide-react";
import AdminLoginForm from "../components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <div className="mb-6 flex items-center justify-center space-x-2">
          <div className="rounded-full bg-green-500 p-2">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Login Administrativo</h2>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
