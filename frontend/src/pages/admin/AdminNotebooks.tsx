import React, { useEffect, useState } from 'react';
import { getNotebooks, createNotebook } from '../../services/api';
import type { Notebook } from '../../types';
import { QrCode, Plus, X } from 'lucide-react';

const AdminNotebooks: React.FC = () => {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patrimonio, setPatrimonio] = useState('');
  const [modelo, setModelo] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchNotebooks();
  }, []);

  const fetchNotebooks = () => {
    setLoading(true);
    getNotebooks().then(res => {
      setNotebooks(res);
      setLoading(false);
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createNotebook(patrimonio, modelo);
      setIsModalOpen(false);
      setPatrimonio('');
      setModelo('');
      fetchNotebooks(); // refresh list
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 relative">
      
      {/* List */}
      <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-700">LISTA DE NOTEBOOKS CADASTRADOS</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Cadastrar Notebook
          </button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="space-y-3">
            {notebooks.map(nb => (
              <div key={nb.id} className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center text-slate-600 font-bold">
                    Nº {nb.id}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{nb.modelo}</p>
                    <p className="text-sm text-slate-500">Patrimônio: {nb.patrimonio}</p>
                  </div>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    nb.status === 'DISPONIVEL' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {nb.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Generate Section (Disabled for now as requested) */}
      <div className="w-full lg:w-80 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center opacity-50 relative">
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center rounded-lg">
             <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded font-bold">Em breve</span>
          </div>
          <h3 className="text-sm font-bold text-gray-700 mb-4">GERAR NUMERAÇÃO (LOTE)</h3>
          <div className="flex gap-2 mb-6">
            <input disabled type="text" placeholder="Nº INICIAL" className="w-1/2 p-2 bg-slate-100 rounded text-center text-sm" />
            <input disabled type="text" placeholder="Nº FINAL" className="w-1/2 p-2 bg-slate-100 rounded text-center text-sm" />
          </div>
          <button disabled className="w-full bg-slate-400 text-white font-bold py-3 rounded">
            GEN/DEL
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center text-slate-400">
          <QrCode className="w-16 h-16 mb-2" />
          <p className="text-sm">Imprimir QR Codes</p>
        </div>
      </div>

      {/* Modal Cadastro de Notebook */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-lg text-slate-700">Novo Notebook</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Patrimônio</label>
                <input 
                  type="text" 
                  value={patrimonio}
                  onChange={(e) => setPatrimonio(e.target.value)}
                  placeholder="Ex: NTB-004"
                  required
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Modelo</label>
                <input 
                  type="text" 
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  placeholder="Ex: Dell Latitude 3420"
                  required
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-100 text-slate-700 font-medium py-2 rounded hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  {saving ? 'Salvando...' : 'Salvar Notebook'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default AdminNotebooks;
