import React, { useEffect, useState } from 'react';
import { getEmprestimos } from '../../services/api';
import type { Emprestimo } from '../../types';
import { Filter } from 'lucide-react';

const AdminEmprestimos: React.FC = () => {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<'TODOS' | 'ATRASADOS' | 'VENCENDO'>('TODOS');

  useEffect(() => {
    getEmprestimos().then(res => {
      setEmprestimos(res);
      setLoading(false);
    });
  }, []);

  const getFiltered = () => {
    if (filtro === 'TODOS') return emprestimos;
    if (filtro === 'ATRASADOS') return emprestimos.filter(e => e.status === 'ATRASADO');
    return emprestimos.filter(e => e.status === 'ATIVO'); // Simplification for 'vencendo'
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-4">
            <input type="text" placeholder="Nº notebook" className="p-2 bg-slate-100 rounded text-sm w-32" />
            <input type="text" placeholder="Nome aluno" className="p-2 bg-slate-100 rounded text-sm w-48" />
            <input type="text" placeholder="Matrícula" className="p-2 bg-slate-100 rounded text-sm w-32" />
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
            <Filter className="w-5 h-5 text-slate-400" />
            <div className="flex flex-col text-xs space-y-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="filtro" checked={filtro === 'TODOS'} onChange={() => setFiltro('TODOS')} className="accent-blue-500" /> mostrar todos
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-red-500 font-medium">
                <input type="radio" name="filtro" checked={filtro === 'ATRASADOS'} onChange={() => setFiltro('ATRASADOS')} className="accent-red-500" /> Atrasados
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-orange-500 font-medium">
                <input type="radio" name="filtro" checked={filtro === 'VENCENDO'} onChange={() => setFiltro('VENCENDO')} className="accent-orange-500" /> 5 min para vencer
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          getFiltered().map(emp => (
            <div key={emp.id} className="bg-slate-200 rounded-lg p-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-6">
                <div className="text-slate-500 font-bold w-12">Nº {emp.notebook.id}</div>
                <div>
                  <p className="text-slate-700 font-semibold">Aluno: {emp.usuario.nome}</p>
                  <p className="text-sm font-medium">
                    Situação: <span className={emp.status === 'ATRASADO' ? 'text-red-500' : 'text-green-500'}>{emp.status === 'ATRASADO' ? 'atrasado' : 'A tempo'}</span>
                  </p>
                  <p className="text-sm text-slate-600">Matrícula: {emp.usuario.matricula}</p>
                </div>
              </div>
              <div>
                <button className="px-4 py-2 bg-slate-300 text-slate-500 rounded text-sm font-medium cursor-not-allowed opacity-50">
                  Confirmar Devolução
                </button>
              </div>
            </div>
          ))
        )}
        
        {!loading && getFiltered().length === 0 && (
          <div className="text-center p-8 text-slate-500 bg-white rounded-lg">
            Nenhum empréstimo encontrado.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEmprestimos;
