import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

const AlunoLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBack = location.pathname !== '/aluno';

  return (
    <div className="flex flex-col h-screen bg-slate-100 font-sans max-w-md mx-auto shadow-2xl relative">
      <header className="bg-slate-500 text-white p-4 flex items-center justify-between">
        {showBack ? (
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-10"></div>
        )}
        <h1 className="text-lg font-medium">HOME</h1>
        <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
      </header>
      
      <main className="flex-1 overflow-auto bg-slate-50 relative">
        <Outlet />
      </main>
    </div>
  );
};

export default AlunoLayout;
