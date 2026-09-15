import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { realizarEmprestimo, realizarDevolucao } from '../../services/api';
import type { Usuario } from '../../types';

interface Props {
  action: 'EMPRESTIMO' | 'DEVOLUCAO';
}

const AlunoScanner: React.FC<Props> = ({ action }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(async (decodedText) => {
      // prevent multiple scans
      if (loading) return;
      
      scanner.clear();
      setLoading(true);
      setError('');

      try {
        const userStr = localStorage.getItem('alunoUser');
        if (!userStr) {
          navigate('/login');
          return;
        }
        const user = JSON.parse(userStr) as Usuario;

        if (action === 'EMPRESTIMO') {
          if (!user.id) throw new Error('Usuário sem ID válido');
          await realizarEmprestimo(user.id, decodedText);
        } else {
          await realizarDevolucao(decodedText);
        }
        
        navigate('/aluno/sucesso');
      } catch (err: any) {
        setError(err.message || 'Erro ao processar QR Code');
        setLoading(false);
      }
    }, (_err) => {
      // Ignore scan errors, they happen continuously until a QR code is found
    });

    return () => {
      scanner.clear().catch(e => console.error(e));
    };
  }, [action, navigate, loading]);

  return (
    <div className="flex flex-col h-full items-center py-10 px-6">
      <h2 className="text-xl font-bold text-slate-700 mb-6 text-center">
        {action === 'EMPRESTIMO' ? 'Escanear Notebook para Empréstimo' : 'Escanear Notebook para Devolução'}
      </h2>
      
      <div className="w-full max-w-sm bg-white rounded-lg p-4 shadow-sm">
        <div id="reader" className="w-full"></div>
      </div>

      {loading && (
        <div className="mt-6 text-slate-600 font-medium animate-pulse">
          Processando...
        </div>
      )}

      {error && (
        <div className="mt-6 text-red-500 font-medium bg-red-50 p-3 rounded-lg text-center w-full">
          {error}
        </div>
      )}
      
      {/* For demonstration purposes without a camera: */}
      <div className="mt-10 flex flex-col gap-3 w-full">
        <p className="text-xs text-center text-slate-400 uppercase font-bold">Simulação (Sem Câmera)</p>
        <button 
          onClick={async () => {
            setLoading(true);
            try {
              const userStr = localStorage.getItem('alunoUser');
              const user = JSON.parse(userStr!) as Usuario;
              if (action === 'EMPRESTIMO') {
                if (!user.id) throw new Error('Usuário sem ID válido');
                // Use a valid UUID from the V3 migration test data
                await realizarEmprestimo(user.id, '11111111-1111-1111-1111-111111111111'); 
              } else {
                await realizarDevolucao('11111111-1111-1111-1111-111111111111');
              }
              navigate('/aluno/sucesso');
            } catch (err: any) {
              setError(err.message);
              setLoading(false);
            }
          }}
          className="bg-slate-300 py-3 rounded text-slate-700 font-medium w-full"
        >
          Simular QR Code Sucesso
        </button>
      </div>
    </div>
  );
};

export default AlunoScanner;
