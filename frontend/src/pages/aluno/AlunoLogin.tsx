import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AlertTriangle } from 'lucide-react';
import { loginUsuario } from '../../services/api';

const AlunoLogin: React.FC = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await loginUsuario(matricula, senha);
      // Simplesmente guardamos no localStorage para essa demonstração
      localStorage.setItem('alunoUser', JSON.stringify(user));
      navigate('/aluno');
    } catch (err) {
      setError('Usuário não encontrado. Tente 123456');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center max-w-md mx-auto relative p-6">
      <div className="absolute top-0 left-0 w-full h-32 bg-slate-500 rounded-b-3xl"></div>
      
      <div className="relative z-10 w-full flex flex-col items-center mt-10">
        <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center mb-10 border-4 border-slate-100">
          <User className="w-20 h-20 text-slate-500" />
        </div>
        
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Usuário (Matrícula)" 
              value={matricula}
              onChange={e => setMatricula(e.target.value)}
              className="w-full p-4 bg-slate-200 rounded-full text-center text-slate-700 placeholder-slate-500 outline-none focus:ring-2 focus:ring-slate-400"
              required
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Senha" 
              value={senha}
              onChange={e => setSenha(e.target.value)}
              className="w-full p-4 bg-slate-200 rounded-full text-center text-slate-700 placeholder-slate-500 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" /> {error}
            </div>
          )}
          
          <div className="pt-8">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full p-4 bg-slate-500 text-white rounded-full font-bold hover:bg-slate-600 transition-colors flex items-center justify-center"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="absolute bottom-4 left-4 text-yellow-500">
        <AlertTriangle className="w-8 h-8 opacity-50" />
      </div>
    </div>
  );
};

export default AlunoLogin;
