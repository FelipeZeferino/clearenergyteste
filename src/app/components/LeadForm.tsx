"use client"
import React from 'react'
import { BrazilianStates, SupplyType } from '@/features/leads/utils/constants';
import { Calculator, DollarSign, Leaf, Mail, MapPin, Phone, TrendingDown, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { newLeadFormSchema } from '@/features/leads/dtos/leadDto';
import axiosInstance from '@/features/axios/axiosInstance';
import { z } from 'zod'

export default function LeadForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(newLeadFormSchema) });

  const onSubmit = async (data: z.infer<typeof newLeadFormSchema>) => {
    console.log(data)
    try {
      console.log('entrou')
      const response = await axiosInstance.post('/leads', data);
      console.log(response);
    } catch (error: any) {
      console.error('Erro ao enviar os dados do lead:', error?.message || error);
    }
  }

  const [step, setStep] = useState(1);
    
      const [simulation, setSimulation] = useState<leadDiscount>(null);
    
      const handleNextStep = () => {
        setStep(prevStep => prevStep + 1)
      };
    
      const handlePrevStep = () => {
        setStep(step - 1);
      };

  return (
    <>
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <Leaf className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Descubra quanto você pode{" "}
            <span className="text-green-600">economizar</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            Simule agora sua economia com energia renovável e descubra como
            reduzir sua conta de luz em até 25%
          </p>

          {/* Progress Steps */}
          <div className="mb-12 flex justify-center">
            <div className="flex items-center space-x-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                <Calculator className="h-5 w-5" />
              </div>
              <div
                className={`h-1 w-16 ${step >= 2 ? "bg-green-500" : "bg-gray-200"}`}
              ></div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 2 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                <User className="h-5 w-5" />
              </div>
              <div
                className={`h-1 w-16 ${step >= 3 ? "bg-green-500" : "bg-gray-200"}`}
              ></div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 3 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                <TrendingDown className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Step 1: Dados de Consumo */}
              {step === 1 && (
                <div className="p-8">
                  <div className="mb-8 text-center">
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                      Dados de Consumo
                    </h3>
                    <p className="text-gray-600">
                      Informe seus dados de consumo atual de energia
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        <DollarSign className="mr-1 inline h-4 w-4" />
                        Valor mensal da conta de energia (R$) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Ex: 350,00"
                        className={`w-full border px-4 py-3 ${errors.energyConsumptionData?.monthlyBill ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-500`}
                        {...register("energyConsumptionData.monthlyBill", {
                          valueAsNumber: true,
                        })}
                      />
                      {errors.energyConsumptionData?.monthlyBill && (
                        <p className="mt-1 text-sm text-red-500" role="alert">
                          {errors.energyConsumptionData.monthlyBill.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          <MapPin className="mr-1 inline h-4 w-4" />
                          Cidade *
                        </label>
                        <input
                          className={`w-full border px-4 py-3 ${errors.energyConsumptionData?.city ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-500`}
                          type="text"
                          placeholder="Cidade"
                          {...register("energyConsumptionData.city", {
                            required: true,
                            max: 30,
                            min: 0,
                          })}
                        />
                        {errors.energyConsumptionData?.city && (
                          <p className="mt-1 text-sm text-red-500" role="alert">
                            {errors.energyConsumptionData.city.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Estado *
                        </label>
                        <select
                          className={`w-full border px-4 py-3 ${errors.energyConsumptionData?.state ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-500`}
                          {...register("energyConsumptionData.state", {
                            required: true,
                          })}
                        >
                          <option value="">Selecione o estado</option>
                          {BrazilianStates.map((estado) => (
                            <option key={estado} value={estado}>
                              {estado}
                            </option>
                          ))}
                        </select>
                        {errors.energyConsumptionData?.state && (
                          <p className="mt-1 text-sm text-red-500" role="alert">
                            {errors.energyConsumptionData.state.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Tipo de fornecimento *
                      </label>
                      <select
                        className={`w-full border px-4 py-3 ${errors.energyConsumptionData?.supplyType ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-500`}
                        {...register("energyConsumptionData.supplyType", {
                          required: true,
                        })}
                      >
                        <option value="">Selecione o tipo</option>
                        {Object.entries(SupplyType).map(([label, tipo]) => (
                          <option key={tipo} value={tipo}>
                            {label}
                          </option>
                        ))}
                      </select>
                      {errors.energyConsumptionData?.supplyType && (
                        <p className="mt-1 text-sm text-red-500" role="alert">
                          {errors.energyConsumptionData.supplyType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={handleNextStep}
                      className="w-full rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-600"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Dados do Lead */}
              {step === 2 && (
                <div className="p-8">
                  <div className="mb-8 text-center">
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                      Seus Dados
                    </h3>
                    <p className="text-gray-600">
                      Para visualizar sua simulação, precisamos de alguns dados
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        <User className="mr-1 inline h-4 w-4" />
                        Nome completo *
                      </label>
                      <input
                        className={`w-full border px-4 py-3 ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-500`}
                        type="text"
                        placeholder="João Carvalho"
                        {...register("name", {
                          required: true,
                          maxLength: 50,
                          minLength: 0,
                        })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500" role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        <Mail className="mr-1 inline h-4 w-4" />
                        E-mail *
                      </label>
                      <input
                        className={`w-full rounded-lg border px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-green-500 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        type="text"
                        placeholder="joao@email.com"
                        {...register("email")}
                      />

                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500" role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        <Phone className="mr-1 inline h-4 w-4" />
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        maxLength={11}
                        placeholder="(11) 99999-9999"
                        className={`w-full border px-4 py-3 ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-500`}
                        {...register("phone", { required: true })}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500" role="alert">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        CPF *
                      </label>
                      <input
                        className={`w-full border px-4 py-3 ${errors.cpf ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-500`}
                        type="text"
                        placeholder="000.000.000-00"
                        {...register("cpf", {
                          required: true,
                          min: 0,
                          maxLength: 11,
                          pattern: /^\d{11}$/i,
                        })}
                      />
                      {errors.cpf && (
                        <p className="mt-1 text-sm text-red-500" role="alert">
                          {errors.cpf.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex space-x-4">
                    <button
                      onClick={handlePrevStep}
                      className="flex-1 rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-300"
                    >
                      Voltar
                    </button>
                    <input
                      type="submit"
                      onSubmit={() => handleSubmit(onSubmit)}
                      className="flex-1 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-600"
                      placeholder="Ver Simulação"
                    ></input>
                  </div>
                </div>
              )}
            </form>

            {/* Step 3: Simulação */}
            {step === 3 && simulation && (
              <div className="p-8">
                <div className="mb-8 text-center">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    Sua Economia Simulada
                  </h3>
                  <p className="text-gray-600">
                    Veja quanto você pode economizar com a Clean Energy
                  </p>
                </div>

                <div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-6">
                  <div className="text-center">
                    <p className="mb-1 text-sm text-green-700">
                      Economia mensal
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(simulation.economiaMensal)}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      25% de desconto aplicado
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "1 ano", data: simulation.economia1Ano },
                    { label: "3 anos", data: simulation.economia3Anos },
                    { label: "5 anos", data: simulation.economia5Anos },
                  ].map((period, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-6">
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">
                        Economia em {period.label}
                      </h4>
                      <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
                        <div>
                          <p className="text-sm text-gray-600">Valor atual</p>
                          <p className="text-lg font-semibold text-red-600">
                            {formatCurrency(period.data.totalAtual)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Com Clean Energy
                          </p>
                          <p className="text-lg font-semibold text-blue-600">
                            {formatCurrency(period.data.totalComDesconto)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Economia total
                          </p>
                          <p className="text-lg font-semibold text-green-600">
                            {formatCurrency(period.data.economia)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="mb-4 text-sm text-gray-600">
                    Nossa equipe comercial entrará em contato para elaborar sua
                    proposta personalizada!
                  </p>
                  <button
                    onClick={() => {
                      setStep(1);
                      setFormData({
                        monthlyBill: "",
                        city: "",
                        estado: "",
                        tipoFornecimento: "",
                        nome: "",
                        email: "",
                        telefone: "",
                        cpf: "",
                      });
                      setSimulation(null);
                    }}
                    className="rounded-lg bg-green-500 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-600"
                  >
                    Nova Simulação
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
