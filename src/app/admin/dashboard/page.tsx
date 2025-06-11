"use client"
import LeadsTable from '@/app/components/LeadsTable';
import axiosInstance from '@/features/axios/axiosInstance';
import type { ApiLeadResponse, LeadData } from '@/features/leads/schemas/leadSchemas';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';


export default function AdminDashboard() {
  const [leadsData, setLeadsData] = useState<LeadData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeadsData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axiosInstance.get<ApiLeadResponse>('/admin/leads', { withCredentials: true });
      const treatedLeadsData: LeadData[] = data?.data.map(lead => {
        return {
          id: lead.id,
          name: lead.name,
          city: lead.energyConsumptionData.city,
          state: lead.energyConsumptionData.state,
          monthlyBill: lead.energyConsumptionData.monthlyBill
          }
      })
      setLeadsData(treatedLeadsData);
    } catch (error) {
      setError('Erro ao carregar leads');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const url = `/admin/leads/${id}`;
      await axiosInstance.delete(url, { withCredentials: true });
      setLeadsData(prev => prev.filter(lead => lead.id !== id));
      toast.success('Lead Excluido com sucesso!')
    } catch (error) {
      toast.error('Houve um erro ao excluir esse lead, por favor tente novamente');
    }
  };

  useEffect(() => {
    void fetchLeadsData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Carregando leads...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Leads cadastrados</h2>
        <div className="text-red-600 bg-red-50 p-4 rounded-md">
          {error}
          <button 
            onClick={() => fetchLeadsData()} 
            className="ml-4 text-red-800 underline hover:no-underline"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Leads cadastrados ({leadsData.length})
        </h2>
        <button 
          onClick={() => fetchLeadsData()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Atualizar
        </button>
      </div>
      
      <LeadsTable 
        leads={leadsData} 
        onDelete={handleDelete} 
      />
    </div>
  );
}