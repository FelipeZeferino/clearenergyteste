"use client";

import { adminLoginSchema } from "@/features/admin/schemas/adminSchema";
import axiosInstance from "@/features/axios/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { LoginFailedError } from "../api/_utils/knownErrors";


export default function AdminLoginForm() {
  const router = useRouter();
  const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
  } = useForm({ resolver: zodResolver(adminLoginSchema) });

  const onSubmit = async (loginInfo: z.infer<typeof adminLoginSchema>) => {
    try {
        const loginResponse = await axiosInstance.post('/auth', loginInfo, { withCredentials: true });
        
        if(loginResponse.data?.token) {
          localStorage.setItem('token', String(loginResponse.data.token));
          toast.success('Login realizado com sucesso!');
          router.push('admin/dashboard');
        } else {
          throw new LoginFailedError('Erro ao fazer login. Tente novamente');
        }

    } catch (error) {
        toast.error('Erro ao fazer login. Verifique suas credenciais e tente novamente.')
        console.log('error', error);
    }
    finally {
        reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          E-mail
        </label>
        <input
        type="email"
        placeholder="admin@email.com"
        className={`w-full border px-4 py-3 ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-500`}
        {...register("email")}
        />
        {errors.email && (
        <p className="mt-1 text-sm text-red-500" role="alert">
            {errors.email.message}
        </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <input
        type="password"
        placeholder="••••••••"
        className={`w-full border px-4 py-3 ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-500`}
        {...register("password")}
        />
        {errors.password && (
        <p className="mt-1 text-sm text-red-500" role="alert">
            {errors.password.message}
        </p>
        )}
      </div>

      <button
        type="submit"
        onSubmit={() => handleSubmit(onSubmit)}
        className="w-full rounded-md bg-green-500 px-4 py-2 font-semibold text-white transition hover:bg-green-600"
      >
        Entrar
      </button>
    </form>
  );
}
