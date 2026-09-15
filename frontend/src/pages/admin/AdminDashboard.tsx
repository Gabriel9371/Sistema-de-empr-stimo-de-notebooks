import React, { useEffect, useState } from 'react';
import { getEmprestimos, getNotebooks } from '../../services/api';
import type { Emprestimo, Notebook } from '../../types';

const AdminDashboard: React.FC = () => {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getEmprestimos(), getNotebooks()]).then(([emps, nots]) => {
      setEmprestimos(emps);
      setNotebooks(nots);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-4">Carregando dashboard...</div>;

  const ativos = emprestimos.filter(e => e.status === 'ATIVO' || e.status === 'ATRASADO');
  const disponiveis = notebooks.filter(n => n.status === 'DISPONIVEL');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column: Notebooks proximos do prazo (Active Loans) */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-lg font-medium text-slate-700 bg-white p-4 rounded-t-lg shadow-sm mb-0 pb-2">
          USR/Notebooks próximos do prazo de entrega
        </h3>
        <div className="bg-white rounded-b-lg shadow-sm p-4 space-y-4">
          {ativos.length === 0 ? (
            <p className="text-gray-500">Nenhum empréstimo ativo no momento.</p>
          ) : (
            ativos.map(emp => (
              <div key={emp.id} className="bg-slate-50 p-4 rounded-lg flex items-center justify-between border border-slate-100">
                <div>
                  <p className="font-bold text-gray-800">USR: {emp.usuario.nome}</p>
                  <p className="text-sm text-gray-600">Matrícula: {emp.usuario.matricula}</p>
                  <p className="text-sm text-gray-600">Retirada: {new Date(emp.dataEmprestimo).toLocaleString()}</p>
                  <p className="text-sm text-gray-600 font-semibold text-red-500">Entrega: {new Date(emp.dataDevolucaoPrevista).toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="w-4 h-4 bg-red-400 rounded-full"></span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Column: Dashboard summary */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-slate-700 mb-4">Dashboard</h3>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex justify-between items-center">
            <span className="text-gray-700">Aparelhos disponíveis</span>
            <span className="text-2xl font-bold text-green-600">{disponiveis.length}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex justify-between items-center mt-3">
            <span className="text-gray-700">Aparelhos emprestados</span>
            <span className="text-2xl font-bold text-orange-500">{notebooks.length - disponiveis.length}</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AdminDashboard;
