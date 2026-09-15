import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Laptop, Clock, Home, LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Portal</h1>
          <p className="text-sm text-slate-400 mt-1">Gestão de Notebooks</p>
        </div>
        
        <nav className="flex-1 mt-6">
          <ul>
            <li>
              <Link 
                to="/admin" 
                className={`flex items-center px-6 py-3 transition-colors ${isActive('/admin') ? 'bg-slate-700 border-l-4 border-blue-500' : 'hover:bg-slate-700'}`}
              >
                <Home className="w-5 h-5 mr-3" />
                Início
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/notebooks" 
                className={`flex items-center px-6 py-3 transition-colors ${isActive('/admin/notebooks') ? 'bg-slate-700 border-l-4 border-blue-500' : 'hover:bg-slate-700'}`}
              >
                <Laptop className="w-5 h-5 mr-3" />
                Notebooks
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/emprestimos" 
                className={`flex items-center px-6 py-3 transition-colors ${isActive('/admin/emprestimos') ? 'bg-slate-700 border-l-4 border-blue-500' : 'hover:bg-slate-700'}`}
              >
                <Clock className="w-5 h-5 mr-3" />
                Empréstimos
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-700">
          <Link to="/" className="flex items-center text-slate-300 hover:text-white transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Sair
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {location.pathname === '/admin' && 'Início'}
            {location.pathname === '/admin/notebooks' && 'Notebooks Cadastrados'}
            {location.pathname === '/admin/emprestimos' && 'Empréstimos'}
          </h2>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
              AD
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
