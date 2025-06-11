"use client"

import type { LeadData } from "@/features/leads/schemas/leadSchemas";
import { Trash2 } from "lucide-react";


type LeadsTableProps = {
  leads: LeadData[];
  onDelete: (id: string) => void;
};

export default function LeadsTable({ leads, onDelete }: LeadsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cidade</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Valor da Fatura</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          { leads ? leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800">{lead.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{lead.city}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{lead.state}</td>
              <td className="px-6 py-4 text-sm text-gray-800">
                R$ {lead.monthlyBill.toFixed(2).replace(".", ",")}
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onDelete(lead.id)}
                  className="text-red-500 hover:text-red-700 transition cursor-pointer"
                  title="Excluir lead"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          )) : null}
          {leads.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                Nenhum lead encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
