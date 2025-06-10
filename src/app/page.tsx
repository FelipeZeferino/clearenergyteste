"use client"
import React, { useState } from 'react';
import { Zap, Leaf, Calculator, TrendingDown, Phone, Mail, User, MapPin, DollarSign } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import Header from './components/Header';
import Features from './components/Features';
import Footer from './components/Footer';

const CleanEnergySimulator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados de consumo
    valorMensal: '',
    cidade: '',
    estado: '',
    tipoFornecimento: '',
    // Dados do lead
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  });

  const [simulation, setSimulation] = useState(null);

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const tiposForneicmento = [
    'Monofásico',
    'Bifásico', 
    'Trifásico'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const calculateSimulation = () => {
    const valorAtual = parseFloat(formData.valorMensal);
    const desconto = 0.25; // 25% de desconto
    const valorComDesconto = valorAtual * (1 - desconto);
    const economiaMensal = valorAtual - valorComDesconto;

    const simulation = {
      valorAtual,
      valorComDesconto,
      economiaMensal,
      economia1Ano: {
        totalAtual: valorAtual * 12,
        totalComDesconto: valorComDesconto * 12,
        economia: economiaMensal * 12
      },
      economia3Anos: {
        totalAtual: valorAtual * 36,
        totalComDesconto: valorComDesconto * 36,
        economia: economiaMensal * 36
      },
      economia5Anos: {
        totalAtual: valorAtual * 60,
        totalComDesconto: valorComDesconto * 60,
        economia: economiaMensal * 60
      }
    };

    setSimulation(simulation);
    setStep(3);
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validar dados de consumo
      if (!formData.valorMensal || !formData.cidade || !formData.estado || !formData.tipoFornecimento) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Validar dados do lead
      if (!formData.nome || !formData.email || !formData.telefone || !formData.cpf) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      calculateSimulation();
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <Header/>
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <Leaf className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Descubra quanto você pode <span className="text-green-600">economizar</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Simule agora sua economia com energia renovável e descubra como reduzir sua conta de luz em até 25%
          </p>
          
          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                <Calculator className="h-5 w-5" />
              </div>
              <div className={`h-1 w-16 ${step >= 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                <User className="h-5 w-5" />
              </div>
              <div className={`h-1 w-16 ${step >= 3 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                <TrendingDown className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            
            {/* Step 1: Dados de Consumo */}
            {step === 1 && (
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Dados de Consumo</h3>
                  <p className="text-gray-600">Informe seus dados de consumo atual de energia</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="inline h-4 w-4 mr-1" />
                      Valor mensal da conta de energia (R$) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Ex: 350,00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.valorMensal}
                      onChange={(e) => handleInputChange('valorMensal', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="inline h-4 w-4 mr-1" />
                        Cidade *
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: São Paulo"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={formData.cidade}
                        onChange={(e) => handleInputChange('cidade', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado *
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={formData.estado}
                        onChange={(e) => handleInputChange('estado', e.target.value)}
                      >
                        <option value="">Selecione o estado</option>
                        {estados.map(estado => (
                          <option key={estado} value={estado}>{estado}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de fornecimento *
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.tipoFornecimento}
                      onChange={(e) => handleInputChange('tipoFornecimento', e.target.value)}
                    >
                      <option value="">Selecione o tipo</option>
                      {tiposForneicmento.map(tipo => (
                        <option key={tipo} value={tipo}>{tipo}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleNextStep}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Dados do Lead */}
            {step === 2 && (
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Seus Dados</h3>
                  <p className="text-gray-600">Para visualizar sua simulação, precisamos de alguns dados</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline h-4 w-4 mr-1" />
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: João Silva"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      E-mail *
                    </label>
                    <input
                      type="email"
                      placeholder="Ex: joao@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', formatPhone(e.target.value))}
                      maxLength={15}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CPF *
                    </label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.cpf}
                      onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
                      maxLength={14}
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Ver Simulação
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Simulação */}
            {step === 3 && simulation && (
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Sua Economia Simulada</h3>
                  <p className="text-gray-600">Veja quanto você pode economizar com a Clean Energy</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <div className="text-center">
                    <p className="text-sm text-green-700 mb-1">Economia mensal</p>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(simulation.economiaMensal)}</p>
                    <p className="text-sm text-gray-600 mt-1">25% de desconto aplicado</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { label: '1 ano', data: simulation.economia1Ano },
                    { label: '3 anos', data: simulation.economia3Anos },
                    { label: '5 anos', data: simulation.economia5Anos }
                  ].map((period, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Economia em {period.label}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-600">Valor atual</p>
                          <p className="text-lg font-semibold text-red-600">{formatCurrency(period.data.totalAtual)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Com Clean Energy</p>
                          <p className="text-lg font-semibold text-blue-600">{formatCurrency(period.data.totalComDesconto)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Economia total</p>
                          <p className="text-lg font-semibold text-green-600">{formatCurrency(period.data.economia)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Nossa equipe comercial entrará em contato para elaborar sua proposta personalizada!
                  </p>
                  <button
                    onClick={() => {
                      setStep(1);
                      setFormData({
                        valorMensal: '',
                        cidade: '',
                        estado: '',
                        tipoFornecimento: '',
                        nome: '',
                        email: '',
                        telefone: '',
                        cpf: ''
                      });
                      setSimulation(null);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                  >
                    Nova Simulação
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Features/>
      <Footer/>
    </div>
  );
};

export default CleanEnergySimulator;


function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="number" placeholder="Valor mensal da conta de energia (R$)" {...register("Valor mensal da conta de energia (R$)", {required: true, max: 100000, min: 0, maxLength: 6})} />
      <input type="text" placeholder="Cidade" {...register("Cidade", {required: true, max: 30, min: 0})} />
      <select {...register("Estado", { required: true })}>
        <option value="AC">AC</option>
        <option value="AL">AL</option>
        <option value="AP">AP</option>
        <option value="AM">AM</option>
        <option value="BA">BA</option>
        <option value="CE">CE</option>
        <option value="DF">DF</option>
        <option value="ES">ES</option>
        <option value="GO">GO</option>
        <option value="MA">MA</option>
        <option value="MT">MT</option>
        <option value="MS">MS</option>
        <option value="MG">MG</option>
        <option value="PA">PA</option>
        <option value="PB">PB</option>
        <option value="PR">PR</option>
        <option value="PE">PE</option>
        <option value="PI">PI</option>
        <option value="RJ">RJ</option>
        <option value="RN">RN</option>
        <option value="RS">RS</option>
        <option value="RO">RO</option>
        <option value="RR">RR</option>
        <option value="SC">SC</option>
        <option value="SP">SP</option>
        <option value="SE">SE</option>
        <option value="TO">TO</option>
      </select>
      <select {...register("Tipo de fornecimento", { required: true })}>
        <option value="Monofásico">Monofásico</option>
        <option value="Bifásico">Bifásico</option>
        <option value="Trifásico">Trifásico</option>
      </select>
      <input type="text" placeholder="Nome" {...register("Nome", {required: true, max: 50, min: 0})} />
      <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="tel" placeholder="Telefone" {...register("Telefone", {required: true})} />
      <input type="text" placeholder="CPF" {...register("CPF", {required: true, min: 0, maxLength: 11, pattern: /^\d{11}$/i})} />

      <input type="submit" />
    </form>
  );
}