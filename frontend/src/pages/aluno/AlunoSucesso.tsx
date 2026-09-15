import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const AlunoSucesso: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/aluno');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col h-full items-center justify-center p-6">
      
      <div className="bg-slate-200 text-slate-700 py-3 px-6 rounded-full mb-12 text-center w-full max-w-xs shadow-inner">
        Operação confirmada!
      </div>
      
      <div className="w-40 h-40 bg-green-400 rounded-full flex items-center justify-center shadow-lg border-8 border-green-200">
        <Check className="w-20 h-20 text-white" strokeWidth={3} />
      </div>
      
    </div>
  );
};

export default AlunoSucesso;
