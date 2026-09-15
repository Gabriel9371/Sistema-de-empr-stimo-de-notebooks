import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Smartphone } from 'lucide-react';
import { getEmprestimos } from '../../services/api';
import type { Emprestimo, Usuario } from '../../types';

const AlunoHome: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Usuario | null>(null);
  const [emprestimoAtivo, setEmprestimoAtivo] = useState<Emprestimo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('alunoUser');
    if (!userStr) {
      navigate('/login');
      return;
    }
    const loggedUser = JSON.parse(userStr) as Usuario;
    setUser(loggedUser);

    getEmprestimos().then(res => {
      const active = res.find(e => e.usuario.matricula === loggedUser.matricula && (e.status === 'ATIVO' || e.status === 'ATRASADO'));
      setEmprestimoAtivo(active || null);
      setLoading(false);
    });
  }, [navigate]);

  if (loading || !user) return <div className="p-8 text-center">Carregando...</div>;

  return (
    <div className="flex flex-col h-full items-center py-10 px-6">
      
      <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center mb-8 border-2 border-slate-300">
        <div className="w-16 h-16 bg-slate-400 rounded-full flex flex-col items-center justify-center overflow-hidden">
          <div className="w-6 h-6 bg-white rounded-full mb-1"></div>
          <div className="w-10 h-6 bg-white rounded-t-full"></div>
        </div>
      </div>
      
      {emprestimoAtivo ? (
        <div className="w-full space-y-6">
          <div className="bg-slate-200 rounded-3xl p-6 text-sm text-slate-700 shadow-inner">
            <p className="font-bold mb-2 uppercase">ALUNO: {user.nome}</p>
            <p>Data/Horário: {new Date(emprestimoAtivo.dataEmprestimo).toLocaleString()}</p>
            <p>Prazo entrega: {new Date(emprestimoAtivo.dataDevolucaoPrevista).toLocaleString()}</p>
            <p className="mt-2 font-medium">Nº notebook: {emprestimoAtivo.notebook.patrimonio}</p>
          </div>
          
          <button 
            onClick={() => navigate('/aluno/devolucao')}
            className="w-full bg-slate-400 hover:bg-slate-500 text-white font-bold py-4 rounded-full mt-8 transition-colors text-lg shadow-lg"
          >
            DEVOLUÇÃO
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center mt-10">
          <div className="mb-10 text-slate-600 flex flex-col items-center">
            <Smartphone className="w-20 h-20 mb-2" />
            <QrCode className="w-8 h-8 absolute mt-4 bg-white p-1" />
          </div>
          
          <button 
            onClick={() => navigate('/aluno/emprestimo')}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-full transition-colors text-lg shadow-lg"
          >
            Empréstimo notebook
          </button>
        </div>
      )}
      
    </div>
  );
};

export default AlunoHome;
